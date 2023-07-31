import asyncio
import json
import logging
import os
import re
import time
import traceback
import warnings
from datetime import datetime
from functools import partial, reduce, wraps
from typing import Optional

import anyio
import asyncer
import numpy as np
import pandas as pd
import polars as pl
import requests
import uvicorn
from asyncer import asyncify
from fastapi import FastAPI, HTTPException, Query, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
from fastapi_redis_cache import FastApiRedisCache, cache
from prometheus_client import make_asgi_app
from sportsdataverse.cfb import espn_cfb_schedule
from sportsdataverse.cfb.cfb_pbp import CFBPlayProcess
from sportsdataverse.dl_utils import underscore
from starlette.middleware.base import BaseHTTPMiddleware

import redis

# from aioify import aioify


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
def startup():
    LOCAL_REDIS_URL = os.environ.get("REDIS_URL", "redis://redis:6379")
    redis_client = redis.Redis.from_url(LOCAL_REDIS_URL)
    redis_cache = FastApiRedisCache()
    redis_cache.init(
        host_url=os.environ.get("REDIS_URL", LOCAL_REDIS_URL),
        prefix="gp-cache",
        response_header="X-GP-Cache",
        ignore_arg_types=[Request, Response],
    )


@app.get("/py", response_class=ORJSONResponse)
async def healthcheck():
    return ORJSONResponse(
        {"status": "good", "message": "Python API is running"}, status_code=200, media_type="application/json"
    )


@app.get("/py/cfb/scoreboard", tags=["College Football"], response_class=ORJSONResponse)
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
async def cfb_game(request: Request, gameId: str) -> Optional[None]:
    return await asyncify(get_cfb_game)(request, gameId)


@app.get("/py/cfb/percentiles/{year}", tags=["College Football"], response_class=ORJSONResponse)
def get_cfb_percentiles_year(request: Request, year: str) -> Optional[None]:
    result = pl.read_csv(f"data/{year}/percentiles.csv").to_dicts()
    return ORJSONResponse(result, status_code=200, media_type="application/json")


@app.get("/py/cfb/percentiles/{year}/{teamId}", tags=["College Football"], response_class=ORJSONResponse)
async def get_cfb_percentiles_team(request: Request, year: str, teamId: str) -> Optional[None]:
    result = await asyncify(cfb_percentiles_team)(year, teamId)

    return ORJSONResponse(result, status_code=200, media_type="application/json")


def get_cfb_game(request: Request, gameId: str) -> Optional[None]:
    try:
        cacheBuster = str(int(time.time() * 1000))
        # check if the game is active or in the future
        pbp_url = f"http://cdn.espn.com/core/college-football/playbyplay?gameId={gameId}&xhr=1&render=false&userab=18&{cacheBuster}"
        response = requests.get(pbp_url)
        game = response.json()["gamepackageJSON"]["header"]["competitions"][0]
        season = response.json()["gamepackageJSON"]["header"]["season"]["year"]
        week = response.json()["gamepackageJSON"]["header"]["week"]
        if game["competitors"][0]["homeAway"] == "home":
            homeComp = game["competitors"][0]
            awayComp = game["competitors"][1]
        else:
            homeComp = game["competitors"][1]
            awayComp = game["competitors"][0]
        homeTeam = homeComp["team"]
        awayTeam = awayComp["team"]
        if game["status"]["type"]["name"] == "STATUS_SCHEDULED":
            homePercentiles = cfb_percentiles_team(year=season - 1, teamId=homeTeam["id"])
            awayPercentiles = cfb_percentiles_team(year=season - 1, teamId=awayTeam["id"])
            result = {
                "season": season,
                "week": week,
                "gameInfo": game,
                "header": response.json()["gamepackageJSON"]["header"],
                "awayTeamMatchup": awayPercentiles,
                "homeTeamMatchup": homePercentiles,
            }
            logging.info(f"Successfully processed cfb_game_pre-game: {gameId}")
            return ORJSONResponse(content=result, status_code=200, media_type="application/json")

        def cfb_game_in_play(gameId):
            # gameId = request.get_json(force=True)['gameId']

            processed_data = CFBPlayProcess(
                gameId=gameId,
                return_keys=[
                    "plays",
                    "advBoxScore",
                    "winprobability",
                    "homeTeamSpread",
                    "overUnder",
                    "boxscore",
                    "header",
                    "broadcasts",
                    "pickcenter",
                    "gameInfo",
                    "season",
                ],
            )
            pbp = processed_data.espn_cfb_pbp()
            processed_data.run_processing_pipeline()
            pbp = processed_data.json
            jsonified_df = pl.DataFrame(pbp.get("plays"), infer_schema_length=400).to_dicts()

            bad_cols = [
                "start.distance",
                "start.yardLine",
                "start.team.id",
                "start.down",
                "start.yardsToEndzone",
                "start.posTeamTimeouts",
                "start.defTeamTimeouts",
                "start.shortDownDistanceText",
                "start.possessionText",
                "start.downDistanceText",
                "start.pos_team_timeouts",
                "start.def_pos_team_timeouts",
                "clock.displayValue",
                "type.id",
                "type.text",
                "type.abbreviation",
                "end.distance",
                "end.yardLine",
                "end.team.id",
                "end.down",
                "end.yardsToEndzone",
                "end.posTeamTimeouts",
                "end.defTeamTimeouts",
                "end.shortDownDistanceText",
                "end.possessionText",
                "end.downDistanceText",
                "end.pos_team_timeouts",
                "end.def_pos_team_timeouts",
                "expectedPoints.before",
                "expectedPoints.after",
                "expectedPoints.added",
                "winProbability.before",
                "winProbability.after",
                "winProbability.added",
                "scoringType.displayName",
                "scoringType.name",
                "scoringType.abbreviation",
            ]
            # clean records back into ESPN format
            for record in jsonified_df:
                record["clock"] = {
                    "displayValue": record["clock.displayValue"],
                    "minutes": record["clock.minutes"],
                    "seconds": record["clock.seconds"],
                }

                record["type"] = {
                    "id": record["type.id"],
                    "text": record["type.text"],
                    "abbreviation": record["type.abbreviation"],
                }
                record["modelInputs"] = {
                    "start": {
                        "down": record["start.down"],
                        "distance": record["start.distance"],
                        "yardsToEndzone": record["start.yardsToEndzone"],
                        "TimeSecsRem": record["start.TimeSecsRem"],
                        "adj_TimeSecsRem": record["start.adj_TimeSecsRem"],
                        "pos_score_diff": record["pos_score_diff_start"],
                        "posTeamTimeouts": record["start.posTeamTimeouts"],
                        "defTeamTimeouts": record["start.defPosTeamTimeouts"],
                        "ExpScoreDiff": record["start.ExpScoreDiff"],
                        "ExpScoreDiff_Time_Ratio": record["start.ExpScoreDiff_Time_Ratio"],
                        "spread_time": record["start.spread_time"],
                        "pos_team_receives_2H_kickoff": record["start.pos_team_receives_2H_kickoff"],
                        "is_home": record["start.is_home"],
                        "period": record["period"],
                    },
                    "end": {
                        "down": record["end.down"],
                        "distance": record["end.distance"],
                        "yardsToEndzone": record["end.yardsToEndzone"],
                        "TimeSecsRem": record["end.TimeSecsRem"],
                        "adj_TimeSecsRem": record["end.adj_TimeSecsRem"],
                        "posTeamTimeouts": record["end.posTeamTimeouts"],
                        "defTeamTimeouts": record["end.defPosTeamTimeouts"],
                        "pos_score_diff": record["pos_score_diff_end"],
                        "ExpScoreDiff": record["end.ExpScoreDiff"],
                        "ExpScoreDiff_Time_Ratio": record["end.ExpScoreDiff_Time_Ratio"],
                        "spread_time": record["end.spread_time"],
                        "pos_team_receives_2H_kickoff": record["end.pos_team_receives_2H_kickoff"],
                        "is_home": record["end.is_home"],
                        "period": record["period"],
                    },
                }

                record["expectedPoints"] = {
                    "before": record["EP_start"],
                    "after": record["EP_end"],
                    "added": record["EPA"],
                }

                record["winProbability"] = {
                    "before": record["wp_before"],
                    "after": record["wp_after"],
                    "added": record["wpa"],
                }

                record["start"] = {
                    "team": {
                        "id": record["start.team.id"],
                    },
                    "pos_team": {"id": record["start.pos_team.id"], "name": record["start.pos_team.name"]},
                    "def_pos_team": {
                        "id": record["start.def_pos_team.id"],
                        "name": record["start.def_pos_team.name"],
                    },
                    "distance": record["start.distance"],
                    "yardLine": record["start.yardLine"],
                    "down": record["start.down"],
                    "yardsToEndzone": record["start.yardsToEndzone"],
                    "homeScore": record["start.homeScore"],
                    "awayScore": record["start.awayScore"],
                    "pos_team_score": record["start.pos_team_score"],
                    "def_pos_team_score": record["start.def_pos_team_score"],
                    "pos_score_diff": record["pos_score_diff_start"],
                    "posTeamTimeouts": record["start.posTeamTimeouts"],
                    "defTeamTimeouts": record["start.defPosTeamTimeouts"],
                    "ExpScoreDiff": record["start.ExpScoreDiff"],
                    "ExpScoreDiff_Time_Ratio": record["start.ExpScoreDiff_Time_Ratio"],
                    "shortDownDistanceText": record["start.shortDownDistanceText"],
                    "possessionText": record["start.possessionText"],
                    "downDistanceText": record["start.downDistanceText"],
                    "posTeamSpread": record["start.pos_team_spread"],
                }

                record["end"] = {
                    "team": {
                        "id": record["end.team.id"],
                    },
                    "pos_team": {
                        "id": record["end.pos_team.id"],
                        "name": record["end.pos_team.name"],
                    },
                    "def_pos_team": {
                        "id": record["end.def_pos_team.id"],
                        "name": record["end.def_pos_team.name"],
                    },
                    "distance": record["end.distance"],
                    "yardLine": record["end.yardLine"],
                    "down": record["end.down"],
                    "yardsToEndzone": record["end.yardsToEndzone"],
                    "homeScore": record["end.homeScore"],
                    "awayScore": record["end.awayScore"],
                    "pos_team_score": record["end.pos_team_score"],
                    "def_pos_team_score": record["end.def_pos_team_score"],
                    "pos_score_diff": record["pos_score_diff_end"],
                    "posTeamTimeouts": record["end.posTeamTimeouts"],
                    "defPosTeamTimeouts": record["end.defPosTeamTimeouts"],
                    "ExpScoreDiff": record["end.ExpScoreDiff"],
                    "ExpScoreDiff_Time_Ratio": record["end.ExpScoreDiff_Time_Ratio"],
                    "shortDownDistanceText": record["end.shortDownDistanceText"],
                    "possessionText": record["end.possessionText"],
                    "downDistanceText": record["end.downDistanceText"],
                }

                record["players"] = {
                    "passer_player_name": record["passer_player_name"],
                    "rusher_player_name": record["rusher_player_name"],
                    "receiver_player_name": record["receiver_player_name"],
                    "sack_player_name": record["sack_player_name"],
                    "sack_player_name2": record["sack_player_name2"],
                    "pass_breakup_player_name": record["pass_breakup_player_name"],
                    "interception_player_name": record["interception_player_name"],
                    "fg_kicker_player_name": record["fg_kicker_player_name"],
                    "fg_block_player_name": record["fg_block_player_name"],
                    "fg_return_player_name": record["fg_return_player_name"],
                    "kickoff_player_name": record["kickoff_player_name"],
                    "kickoff_return_player_name": record["kickoff_return_player_name"],
                    "punter_player_name": record["punter_player_name"],
                    "punt_block_player_name": record["punt_block_player_name"],
                    "punt_return_player_name": record["punt_return_player_name"],
                    "punt_block_return_player_name": record["punt_block_return_player_name"],
                    "fumble_player_name": record["fumble_player_name"],
                    "fumble_forced_player_name": record["fumble_forced_player_name"],
                    "fumble_recovered_player_name": record["fumble_recovered_player_name"],
                }
                # remove added columns
                for col in bad_cols:
                    record.pop(col, None)

            if pbp["header"]["competitions"][0]["competitors"][0]["homeAway"] == "home":
                homeTeamId = pbp["header"]["competitions"][0]["competitors"][0]["team"]["id"]
                awayTeamId = pbp["header"]["competitions"][0]["competitors"][1]["team"]["id"]
            else:
                homeTeamId = pbp["header"]["competitions"][0]["competitors"][1]["team"]["id"]
                awayTeamId = pbp["header"]["competitions"][0]["competitors"][0]["team"]["id"]

            pbp["scoringPlays"] = [play for play in jsonified_df if play["scoringPlay"] is True]
            pbp["mostImportantPlays"] = [
                play
                for play in jsonified_df
                if sorted(jsonified_df, key=lambda x: abs(x["wpa"]), reverse=True).index(play) < 10
            ]
            pbp["bigPlays"] = [
                play
                for play in jsonified_df
                if sorted(jsonified_df, key=lambda x: abs(x["EPA"]), reverse=True).index(play) < 10
            ]
            year = pbp["header"]["season"]["year"]
            gei = calculateGEI(jsonified_df, homeTeamId)
            percentiles = pd.read_csv(f"data/{year}/percentiles.csv").to_dict(orient="records")
            result = {
                "id": gameId,
                "count": len(jsonified_df),
                "gei": gei,
                "mostImportantPlays": pbp["mostImportantPlays"],
                "bigPlays": pbp["bigPlays"],
                "plays": jsonified_df,
                "percentiles": percentiles,
                "advBoxScore": pbp["advBoxScore"],
                "homeTeamId": homeTeamId,
                "awayTeamId": awayTeamId,
                # "drives" : pbp['drives'],
                "scoringPlays": pbp["scoringPlays"],
                "winprobability": np.array(pbp["winprobability"]).tolist(),
                "boxScore": pbp["boxscore"],
                "homeTeamSpread": np.array(pbp["homeTeamSpread"]).tolist(),
                "overUnder": np.array(pbp["overUnder"]).tolist(),
                "header": pbp["header"],
                "broadcasts": np.array(pbp["broadcasts"]).tolist(),
                "pickcenter": np.array(pbp["pickcenter"]).tolist(),
                "gameInfo": np.array(pbp["gameInfo"]).tolist(),
                "season": np.array(pbp["season"]).tolist(),
            }
            return result

        result = cfb_game_in_play(gameId)

        # logging.getLogger("root").info(result)
        logging.info(f"Successfully processed cfb_game_in_play: {gameId}")
        return ORJSONResponse(result, status_code=200, media_type="application/json")
    except KeyError:
        logging.exception(f"KeyError: game_id =  game_id = {game}\n {traceback.format_exc()}")
        return ORJSONResponse(
            content={"status": "bad", "message": "ESPN payload is malformed. Data not available."},
            status_code=404,
            media_type="application/json",
        )
    except Exception:
        logging.exception(f"Error: game_id =  game_id = {game}\n {traceback.format_exc()}")
        return ORJSONResponse(
            content={"status": "bad", "message": "Unknown error occurred, check logs."},
            status_code=500,
            media_type="application/json",
        )


def cfb_percentiles_team(year, teamId):
    def populate(endpoint, season, teamId, type=None):
        seasonType = f"/types/{type}" if type is not None else ""
        url = f"https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/seasons/{season}{seasonType}/teams/{teamId}/{endpoint}?lang=en&region=us&limit=300"
        res = requests.get(url)

        espnContent = res.json()
        if espnContent is None:
            raise ValueError(f"Data not available for ESPN endpoint {endpoint} with year {season} and team {teamId}.")
        return espnContent

    team_data = populate("", year, teamId)
    populatable_keys = ["record", "athletes", "ranks", "leaders"]
    type_keys = ["record", "leaders"]
    val_promises = []
    for item in populatable_keys:
        val_promises.append(populate(item, year, teamId, "2" if item in type_keys else None))

    populating_values = val_promises
    for idx, item in enumerate(populatable_keys):
        team_data[item] = populating_values[idx].get("items", None)
    types = [2, 3]
    data = requests.get(
        url=f"https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/{teamId}/schedule?season={year}&seasontype=2"
    )
    data_bowl = requests.get(
        url=f"https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/{teamId}/schedule?season={year}&seasontype=3"
    )
    data_json = data.json()
    data_bowl_json = data_bowl.json()
    data_json["events"] = data_json["events"] + data_bowl_json["events"]
    ev = pd.DataFrame()
    for event in data_json["events"]:
        event.get("competitions")[0].get("competitors")[0].get("team").pop("links", None)
        event.get("competitions")[0].get("competitors")[1].get("team").pop("links", None)
        if event.get("competitions")[0].get("competitors")[0].get("homeAway") == "home":
            event["competitions"][0]["home"] = event.get("competitions")[0].get("competitors")[0].get("team")
            event["competitions"][0]["home"]["score"] = event.get("competitions")[0].get("competitors")[0].get("score")
            event["competitions"][0]["home"]["winner"] = (
                event.get("competitions")[0].get("competitors")[0].get("winner")
            )
            event["competitions"][0]["home"]["currentRank"] = (
                event.get("competitions")[0].get("competitors")[0].get("curatedRank", {}).get("current", "99")
            )
            event["competitions"][0]["home"]["linescores"] = (
                event.get("competitions")[0].get("competitors")[0].get("linescores", [])
            )
            event["competitions"][0]["home"]["records"] = (
                event.get("competitions")[0].get("competitors")[0].get("record", [])
            )
            event["competitions"][0]["home"]["logo"] = (
                event.get("competitions")[0].get("competitors")[0].get("team").get("logos")[0].get("href")
            )
            event["competitions"][0]["away"] = event.get("competitions")[0].get("competitors")[1].get("team")
            event["competitions"][0]["away"]["score"] = event.get("competitions")[0].get("competitors")[1].get("score")
            event["competitions"][0]["away"]["winner"] = (
                event.get("competitions")[0].get("competitors")[1].get("winner")
            )
            event["competitions"][0]["away"]["currentRank"] = (
                event.get("competitions")[0].get("competitors")[1].get("curatedRank", {}).get("current", "99")
            )
            event["competitions"][0]["away"]["linescores"] = (
                event.get("competitions")[0].get("competitors")[1].get("linescores", [])
            )
            event["competitions"][0]["away"]["records"] = (
                event.get("competitions")[0].get("competitors")[1].get("record", [])
            )
            event["competitions"][0]["away"]["logo"] = (
                event.get("competitions")[0].get("competitors")[1].get("team").get("logos")[0].get("href")
            )
        else:
            event["competitions"][0]["away"] = event.get("competitions")[0].get("competitors")[0].get("team")
            event["competitions"][0]["away"]["score"] = event.get("competitions")[0].get("competitors")[0].get("score")
            event["competitions"][0]["away"]["winner"] = (
                event.get("competitions")[0].get("competitors")[0].get("winner")
            )
            event["competitions"][0]["away"]["currentRank"] = (
                event.get("competitions")[0].get("competitors")[0].get("curatedRank", {}).get("current", "99")
            )
            event["competitions"][0]["away"]["linescores"] = (
                event.get("competitions")[0].get("competitors")[0].get("linescores", [])
            )
            event["competitions"][0]["away"]["records"] = (
                event.get("competitions")[0].get("competitors")[0].get("record", [])
            )
            event["competitions"][0]["away"]["logo"] = (
                event.get("competitions")[0].get("competitors")[0].get("team").get("logos")[0].get("href")
            )
            event["competitions"][0]["home"] = event.get("competitions")[0].get("competitors")[1].get("team")
            event["competitions"][0]["home"]["score"] = event.get("competitions")[0].get("competitors")[1].get("score")
            event["competitions"][0]["home"]["winner"] = (
                event.get("competitions")[0].get("competitors")[1].get("winner")
            )
            event["competitions"][0]["home"]["currentRank"] = (
                event.get("competitions")[0].get("competitors")[1].get("curatedRank", {}).get("current", "99")
            )
            event["competitions"][0]["home"]["linescores"] = (
                event.get("competitions")[0].get("competitors")[1].get("linescores", [])
            )
            event["competitions"][0]["home"]["records"] = (
                event.get("competitions")[0].get("competitors")[1].get("record", [])
            )
            event["competitions"][0]["home"]["logo"] = (
                event.get("competitions")[0].get("competitors")[1].get("team").get("logos")[0].get("href")
            )

        del_keys = ["geoBroadcasts", "headlines", "series", "situation", "tickets", "odds"]
        for k in del_keys:
            event.get("competitions")[0].pop(k, None)
        if len(event.get("competitions")[0]["notes"]) > 0:
            event.get("competitions")[0]["notes_type"] = event.get("competitions")[0]["notes"][0].get("type")
            event.get("competitions")[0]["notes_headline"] = (
                event.get("competitions")[0]["notes"][0].get("headline").replace('"', "")
            )
        else:
            event.get("competitions")[0]["notes_type"] = ""
            event.get("competitions")[0]["notes_headline"] = ""
        event.get("competitions")[0].pop("broadcasts", None)
        event.get("competitions")[0].pop("notes", None)
        x = pd.json_normalize(event.get("competitions")[0], sep="_")
        x["game_id"] = int(x["id"])
        x["season"] = event.get("season").get("year")
        x["season_type"] = event.get("season").get("type")
        x["week"] = event.get("week", {}).get("number")
        event = x
        ev = pd.concat([ev, event], axis=0, ignore_index=True)
    ev = pd.DataFrame(ev).replace({np.nan: None})
    ev.columns = [underscore(col) for col in ev.columns]
    if "home_logo" in ev.columns:
        ev["home_dark_logo"] = ev["home_logo"].apply(
            lambda x: x.replace(
                "https://a.espncdn.com/i/teamlogos/ncaa/500/", "https://a.espncdn.com/i/teamlogos/ncaa/500-dark/"
            )
        )
        ev["away_dark_logo"] = ev["away_logo"].apply(
            lambda x: x.replace(
                "https://a.espncdn.com/i/teamlogos/ncaa/500/", "https://a.espncdn.com/i/teamlogos/ncaa/500-dark/"
            )
        )
    team_data["events"] = ev.to_dict(orient="records")

    # print(data_json['events']+ data_bowl_json['events'])
    breakdown = pd.read_csv(f"data/{year}/overall.csv")
    breakdown_team = breakdown[breakdown["team_id"] == int(teamId)].replace({np.nan: None}).to_dict(orient="records")
    passing = pd.read_csv(f"data/{year}/passing.csv")
    passing_team = passing[passing["team_id"] == int(teamId)].replace({np.nan: None}).to_dict(orient="records")
    rushing = pd.read_csv(f"data/{year}/rushing.csv")
    rushing_team = rushing[rushing["team_id"] == int(teamId)].replace({np.nan: None}).to_dict(orient="records")
    receiving = pd.read_csv(f"data/{year}/receiving.csv")
    receiving_team = receiving[receiving["team_id"] == int(teamId)].replace({np.nan: None}).to_dict(orient="records")
    result = {
        "teamData": team_data,
        "breakdown": breakdown_team,
        "players": {"passing": passing_team, "rushing": rushing_team, "receiving": receiving_team},
        "season": year,
    }

    return result


def calculateGEI(plays, homeTeamId):
    plays = pd.DataFrame(plays)
    length = len(plays)
    avg_length = 179.01777401608126
    # Adjusting for game length
    normalize = avg_length / length

    def calculateHomeWinProb(row):
        if row["pos_team"] == homeTeamId:
            homeWP = row["winProbability"]["before"]
        else:
            homeWP = 1 - row["winProbability"]["before"]

    # Get win probability differences for each play
    win_prob_change = abs(plays["home_wp_before"].diff())
    # Normalization
    gei = normalize * win_prob_change.sum()
    return gei


# async def main():
#     loop = asyncio.get_event_loop()
#     config = uvicorn.Config(app=app, port=7000, loop = loop)
#     server = uvicorn.Server(config)
#     await server.serve()

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    config = uvicorn.Config(app=app, host="0.0.0.0", port=7000, loop=loop, reload=True)
    server = uvicorn.Server(config)
    asyncio.run(server.serve())

    # uvicorn.run("app:app", host='0.0.0.0', port=7000, reload=True )
