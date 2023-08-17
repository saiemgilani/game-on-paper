import asyncio
import logging
import os
import warnings
from typing import Any, Optional

import orjson
import polars as pl
import redis.asyncio as aioredis
import uvicorn
from asyncer import asyncify
from cfb.helpers_cfb import cfb_percentiles_team, get_cfb_game
from ddtrace import patch
from fastapi import FastAPI, Query, Request
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
from fastapi_cache import Coder, FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache

# from prometheus_client import make_asgi_app
from redis.asyncio.connection import ConnectionPool
from sportsdataverse.cfb import espn_cfb_schedule
from utils.logging_dd import logger

# from fastapi_redis_cache import FastApiRedisCache, cache
# from redis import asyncio as aioredis
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

patch(fastapi=True)
FORMAT = (
    "%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] "
    "[dd.service=%(dd.service)s dd.env=%(dd.env)s "
    "dd.version=%(dd.version)s "
    "dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] "
    "- %(message)s"
)
logging.basicConfig(format=FORMAT)
log = logging.getLogger()
log.level = logging.INFO
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
    "http://127.0.0.1*",
    "127.0.0.1*",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:7000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    pool = ConnectionPool.from_url(url=os.environ.get("REDIS_URL", "redis://redis:6379"))
    r = aioredis.Redis(connection_pool=pool)
    FastAPICache.init(RedisBackend(r), prefix="gp-cache")


@app.get("/py", response_class=ORJSONResponse)
async def healthcheck():
    logger.info("Handling /py request")
    return ORJSONResponse(
        {"status": "good", "message": "Python API is running"}, status_code=200, media_type="application/json"
    )


@app.get("/py/cfb/scoreboard", tags=["College Football"], response_class=ORJSONResponse)
@cache(expire=60, namespace="cfb_scoreboard", coder=ORJsonCoder)
async def get_cfb_scoreboard(
    request: Request,
    groups: Optional[str] = Query(None),
    dates: Optional[str] = Query(None),
    week: Optional[str] = Query(None),
    seasontype: Optional[str] = Query(None),
) -> Optional[None]:
    logger.info("Handling /py/cfb/scoreboard request")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    }
    schedule = await asyncify(espn_cfb_schedule)(
        groups=groups, dates=dates, week=week, season_type=seasontype, headers=headers
    )
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
async def cfb_game(request: Request, gameId: str) -> Optional[None]:
    logger.info("Handling /py/cfb/game/:gameId request")
    return await asyncify(get_cfb_game)(request, gameId)


@app.get("/py/cfb/percentiles/{year}", tags=["College Football"], response_class=ORJSONResponse)
@cache(expire=86400, namespace="cfb_percentiles_year", coder=ORJsonCoder)
def get_cfb_percentiles_year(request: Request, year: str) -> Optional[None]:
    logger.info("Handling /py/cfb/percentiles/:year request")
    result = pl.read_csv(f"data/{year}/percentiles.csv").to_dicts()
    return ORJSONResponse(result, status_code=200, media_type="application/json")


@app.get("/py/cfb/percentiles/{year}/{teamId}", tags=["College Football"], response_class=ORJSONResponse)
@cache(expire=86400, namespace="cfb_percentiles_team", coder=ORJsonCoder)
async def get_cfb_percentiles_team(request: Request, year: str, teamId: str) -> Optional[None]:
    logger.info("Handling /py/cfb/percentiles/:year/:teamId request")
    result = await asyncify(cfb_percentiles_team)(year, teamId)

    return ORJSONResponse(result, status_code=200, media_type="application/json")


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    server = uvicorn.Server(
        uvicorn.Config(
            app=app,
            host="0.0.0.0",
            port=7000,
            loop=loop,
            log_config=None,
            log_level=logging.DEBUG,
            use_colors=True,
            reload=True,
        )
    )
    asyncio.run(server.serve())
