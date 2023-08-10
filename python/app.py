import asyncio
import logging
import os
import warnings
from typing import Any, Optional

import orjson
import polars as pl
import redis.asyncio as redis
import uvicorn
from asyncer import asyncify
from cfb.helpers_cfb import (
    add_biggest_plays,
    add_most_important_plays,
    add_scoring_plays,
    build_play_record,
    calculateGEI,
    cfb_percentiles_team,
    get_cfb_game,
    no_plays_or_broken,
)
from fastapi import FastAPI, Query, Request
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
from fastapi_cache import Coder, FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache

# from fastapi_redis_cache import FastApiRedisCache, cache
from prometheus_client import make_asgi_app
from redis.asyncio.connection import ConnectionPool
from sportsdataverse.cfb import espn_cfb_schedule

# from sqlalchemy.orm import Session
# from starlette.middleware.base import BaseHTTPMiddleware


class ORJsonCoder(Coder):
    @classmethod
    def encode(cls, value: Any) -> bytes:
        return orjson.dumps(
            value,
            default=jsonable_encoder,
            option=orjson.OPT_NON_STR_KEYS | orjson.OPT_SERIALIZE_NUMPY,
        )

    @classmethod
    def decode(cls, value: bytes) -> Any:
        return orjson.loads(value)


warnings.filterwarnings("ignore")


logging.basicConfig(level=logging.INFO, filename="gp_site_logfile.txt")
logger = logging.getLogger(__name__)


tags_metadata = [
    {
        "name": "Women's College Basketball",
        "description": "Women's College Basketball API",
    },
    {
        "name": "Men's College Basketball",
        "description": "Men's College Basketball API",
    },
    {
        "name": "WNBA",
        "description": "WNBA API",
    },
    {
        "name": "NBA",
        "description": "NBA API",
    },
    {
        "name": "College Football",
        "description": "College Football API",
    },
    {
        "name": "NFL",
        "description": "National Football League API",
    },
]

app = FastAPI(
    title="Game on Paper FastAPI Python",
    description="The python API backend for Game on Paper, currently serving CFB, NFL, MBB, NBA, WBB, WNBA ",
    version="0.1.0",
    docs_url="/py/api",
    openapi_url="/py/api/openapi.json",
    redoc_url=None,
    openapi_tags=tags_metadata,
)

origins = [
    "http://localhost.gameonpaper.com",
    "https://localhost.gameonpaper.com",
    "http://localhost.thegameonpaper.com",
    "https://localhost.thegameonpaper.com",
    "https://thegameonpaper.com",
    "https://www.thegameonpaper.com",
    "https://gameonpaper.vercel.app",
    "https://game-on-paper.vercel.app",
    "https://*.vercel.app",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "https://localhost:3000",
    "https://localhost:8000",
    "http://localhost:7000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:7000",
    "http://127.0.0.1",
    "http://127.0.0.1:*",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


favicon_path = "favicon.ico"


@app.on_event("startup")
async def startup():
    LOCAL_REDIS_URL = os.environ.get("REDIS_URL", "redis://127.0.0.1:6379")
    pool = ConnectionPool.from_url(url=os.environ.get("REDIS_URL", LOCAL_REDIS_URL))
    r = redis.Redis(connection_pool=pool)
    FastAPICache.init(RedisBackend(r), prefix="gp-cache")


@app.get("/py", response_class=ORJSONResponse)
async def healthcheck():
    return ORJSONResponse(
        {"status": "good", "message": "Python API is running"}, status_code=200, media_type="application/json"
    )


@app.get("/py/cfb/scoreboard", tags=["College Football"], response_class=ORJSONResponse)
@cache(expire=15, namespace="cfb_scoreboard", coder=ORJsonCoder)
async def get_cfb_scoreboard(
    request: Request,
    groups: Optional[str] = Query(None),
    dates: Optional[str] = Query(None),
    week: Optional[str] = Query(None),
    seasontype: Optional[str] = Query(None),
) -> Optional[None]:
    schedule = await asyncify(espn_cfb_schedule)(groups=groups, dates=dates, week=week, season_type=seasontype)
    if "home_logo" in schedule.columns:
        schedule = schedule.with_columns(
            home_dark_logo=pl.col("home_logo").str.replace(
                "https://a.espncdn.com/i/teamlogos/ncaa/500/", "https://a.espncdn.com/i/teamlogos/ncaa/500-dark/"
            ),
            away_dark_logo=pl.col("away_logo").str.replace(
                "https://a.espncdn.com/i/teamlogos/ncaa/500/", "https://a.espncdn.com/i/teamlogos/ncaa/500-dark/"
            ),
        )

    return ORJSONResponse(content=schedule.to_dicts(), status_code=200, media_type="application/json")


@app.get("/py/cfb/game/{gameId}", tags=["College Football"], response_class=ORJSONResponse)
@cache(expire=15, namespace="cfb_game", coder=ORJsonCoder)
async def cfb_game(request: Request, gameId: str) -> Optional[None]:
    return await asyncify(get_cfb_game)(request, gameId)


@app.get("/py/cfb/percentiles/{year}", tags=["College Football"], response_class=ORJSONResponse)
@cache(expire=86400, namespace="cfb_percentiles_year", coder=ORJsonCoder)
def get_cfb_percentiles_year(request: Request, year: str) -> Optional[None]:
    result = pl.read_csv(f"data/{year}/percentiles.csv").to_dicts()
    return ORJSONResponse(result, status_code=200, media_type="application/json")


@app.get("/py/cfb/percentiles/{year}/{teamId}", tags=["College Football"], response_class=ORJSONResponse)
@cache(expire=86400, namespace="cfb_percentiles_team", coder=ORJsonCoder)
async def get_cfb_percentiles_team(request: Request, year: str, teamId: str) -> Optional[None]:
    result = await asyncify(cfb_percentiles_team)(year, teamId)

    return ORJSONResponse(result, status_code=200, media_type="application/json")


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    config = uvicorn.Config(app=app, host="0.0.0.0", port=7000, loop=loop, reload=True)
    server = uvicorn.Server(config)
    asyncio.run(server.serve())
