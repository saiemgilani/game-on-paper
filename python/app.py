import json
import requests
import uvicorn
import numpy as np
import pandas as pd
import logging
import warnings
from datetime import datetime
from typing import Optional
from fastapi import FastAPI, HTTPException, Request, Query, Response
from fastapi.middleware.cors import CORSMiddleware
from sportsdataverse.cfb.cfb_pbp import CFBPlayProcess
from sportsdataverse.cfb import espn_cfb_schedule
warnings.filterwarnings("ignore")

logging.basicConfig(level=logging.INFO, filename = 'gp_site_logfile.txt')
logger = logging.getLogger(__name__)

# from dotenv import load_dotenv, dotenv_values
# config = dotenv_values('.env.development.local')


tags_metadata = [
    {
        "name": "Women's College Basketball",
        "description":  "Women's College Basketball API",
    },
    {
        "name": "Men's College Basketball",
        "description":  "Men's College Basketball API",
    },
    {
        "name": "WNBA",
        "description":  "WNBA API",
    },
    {
        "name": "NBA",
        "description":  "NBA API",
    },
    {
        "name": "College Football",
        "description": "College Football API",
    },
    {
        "name": "NFL",
        "description": "National Football League API",
    }
]

app = FastAPI(
    title="Game on Paper FastAPI Python",
    description="The python API backend for Game on Paper, currently serving CFB, NFL, MBB, NBA, WBB, WNBA ",
    version="0.1.0",
    docs_url='/py/api',
    openapi_url='/py/api/openapi.json',
    redoc_url=None,
    openapi_tags = tags_metadata
)
origins = [
    "http://localhost.gameonpaper.com",
    "https://localhost.gameonpaper.com",
    "http://localhost.thegameonpaper.com",
    "https://localhost.thegameonpaper.com",
    "https://thegameonpaper.com",
    "https://www.thegameonpaper.com",
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

@app.get("/py")
def healthcheck():
    return Response(json.dumps({
        "status" : "good",
        "message" : "Python API is running"
    }), media_type="application/json")


@app.get("/py/cfb/scoreboard", tags=["College Football"])
def get_cfb_scoreboard(request: Request,
                        groups:Optional[str] = Query(None),
                        dates:Optional[str] = Query(None),
                        week:Optional[str] = Query(None),
                        seasontype:Optional[str] = Query(None)) -> Optional[None]:

    headers = {"accept": "application/json"}
    schedule = espn_cfb_schedule(groups = groups, dates = dates, week = week, season_type = seasontype)
    return Response(schedule.to_json(orient="records"), media_type="application/json")



@app.get("/py/cfb/game/{gameId}", tags=["College Football"])
def get_cfb_game(request: Request, gameId: str) -> Optional[None]:
    try:
        headers = {"accept": "application/json"}
        # gameId = request.get_json(force=True)['gameId']
        processed_data = CFBPlayProcess(gameId = gameId)
        pbp = processed_data.espn_cfb_pbp()
        processed_data.run_processing_pipeline()
        tmp_json = processed_data.plays_json.to_json(orient="records")
        jsonified_df = json.loads(tmp_json)

        box = processed_data.create_box_score()
        bad_cols = [
            'start.distance', 'start.yardLine', 'start.team.id', 'start.down', 'start.yardsToEndzone', 'start.posTeamTimeouts', 'start.defTeamTimeouts',
            'start.shortDownDistanceText', 'start.possessionText', 'start.downDistanceText', 'start.pos_team_timeouts', 'start.def_pos_team_timeouts',
            'clock.displayValue',
            'type.id', 'type.text', 'type.abbreviation',
            'end.distance', 'end.yardLine', 'end.team.id','end.down', 'end.yardsToEndzone', 'end.posTeamTimeouts','end.defTeamTimeouts',
            'end.shortDownDistanceText', 'end.possessionText', 'end.downDistanceText', 'end.pos_team_timeouts', 'end.def_pos_team_timeouts',
            'expectedPoints.before', 'expectedPoints.after', 'expectedPoints.added',
            'winProbability.before', 'winProbability.after', 'winProbability.added',
            'scoringType.displayName', 'scoringType.name', 'scoringType.abbreviation'
        ]
        # clean records back into ESPN format
        for record in jsonified_df:
            record["clock"] = {
                "displayValue" : record["clock.displayValue"],
                "minutes" : record["clock.minutes"],
                "seconds" : record["clock.seconds"]
            }

            record["type"] = {
                "id" : record["type.id"],
                "text" : record["type.text"],
                "abbreviation" : record["type.abbreviation"],
            }
            record["modelInputs"] = {
                "start" : {
                    "down" : record["start.down"],
                    "distance" : record["start.distance"],
                    "yardsToEndzone" : record["start.yardsToEndzone"],
                    "TimeSecsRem": record["start.TimeSecsRem"],
                    "adj_TimeSecsRem" : record["start.adj_TimeSecsRem"],
                    "pos_score_diff" : record["pos_score_diff_start"],
                    "posTeamTimeouts" : record["start.posTeamTimeouts"],
                    "defTeamTimeouts" : record["start.defPosTeamTimeouts"],
                    "ExpScoreDiff" : record["start.ExpScoreDiff"],
                    "ExpScoreDiff_Time_Ratio" : record["start.ExpScoreDiff_Time_Ratio"],
                    "spread_time" : record['start.spread_time'],
                    "pos_team_receives_2H_kickoff": record["start.pos_team_receives_2H_kickoff"],
                    "is_home": record["start.is_home"],
                    "period": record["period"]
                },
                "end" : {
                    "down" : record["end.down"],
                    "distance" : record["end.distance"],
                    "yardsToEndzone" : record["end.yardsToEndzone"],
                    "TimeSecsRem": record["end.TimeSecsRem"],
                    "adj_TimeSecsRem" : record["end.adj_TimeSecsRem"],
                    "posTeamTimeouts" : record["end.posTeamTimeouts"],
                    "defTeamTimeouts" : record["end.defPosTeamTimeouts"],
                    "pos_score_diff" : record["pos_score_diff_end"],
                    "ExpScoreDiff" : record["end.ExpScoreDiff"],
                    "ExpScoreDiff_Time_Ratio" : record["end.ExpScoreDiff_Time_Ratio"],
                    "spread_time" : record['end.spread_time'],
                    "pos_team_receives_2H_kickoff": record["end.pos_team_receives_2H_kickoff"],
                    "is_home": record["end.is_home"],
                    "period": record["period"]
                }
            }

            record["expectedPoints"] = {
                "before" : record["EP_start"],
                "after" : record["EP_end"],
                "added" : record["EPA"]
            }

            record["winProbability"] = {
                "before" : record["wp_before"],
                "after" : record["wp_after"],
                "added" : record["wpa"]
            }

            record["start"] = {
                "team" : {
                    "id" : record["start.team.id"],
                },
                "pos_team": {
                    "id" : record["start.pos_team.id"],
                    "name" : record["start.pos_team.name"]
                },
                "def_pos_team": {
                    "id" : record["start.def_pos_team.id"],
                    "name" : record["start.def_pos_team.name"],
                },
                "distance" : record["start.distance"],
                "yardLine" : record["start.yardLine"],
                "down" : record["start.down"],
                "yardsToEndzone" : record["start.yardsToEndzone"],
                "homeScore" : record["start.homeScore"],
                "awayScore" : record["start.awayScore"],
                "pos_team_score" : record["start.pos_team_score"],
                "def_pos_team_score" : record["start.def_pos_team_score"],
                "pos_score_diff" : record["pos_score_diff_start"],
                "posTeamTimeouts" : record["start.posTeamTimeouts"],
                "defTeamTimeouts" : record["start.defPosTeamTimeouts"],
                "ExpScoreDiff" : record["start.ExpScoreDiff"],
                "ExpScoreDiff_Time_Ratio" : record["start.ExpScoreDiff_Time_Ratio"],
                "shortDownDistanceText" : record["start.shortDownDistanceText"],
                "possessionText" : record["start.possessionText"],
                "downDistanceText" : record["start.downDistanceText"],
                "posTeamSpread" : record["start.pos_team_spread"]
            }

            record["end"] = {
                "team" : {
                    "id" : record["end.team.id"],
                },
                "pos_team": {
                    "id" : record["end.pos_team.id"],
                    "name" : record["end.pos_team.name"],
                },
                "def_pos_team": {
                    "id" : record["end.def_pos_team.id"],
                    "name" : record["end.def_pos_team.name"],
                },
                "distance" : record["end.distance"],
                "yardLine" : record["end.yardLine"],
                "down" : record["end.down"],
                "yardsToEndzone" : record["end.yardsToEndzone"],
                "homeScore" : record["end.homeScore"],
                "awayScore" : record["end.awayScore"],
                "pos_team_score" : record["end.pos_team_score"],
                "def_pos_team_score" : record["end.def_pos_team_score"],
                "pos_score_diff" : record["pos_score_diff_end"],
                "posTeamTimeouts" : record["end.posTeamTimeouts"],
                "defPosTeamTimeouts" : record["end.defPosTeamTimeouts"],
                "ExpScoreDiff" : record["end.ExpScoreDiff"],
                "ExpScoreDiff_Time_Ratio" : record["end.ExpScoreDiff_Time_Ratio"],
                "shortDownDistanceText" : record["end.shortDownDistanceText"],
                "possessionText" : record["end.possessionText"],
                "downDistanceText" : record["end.downDistanceText"]
            }

            record["players"] = {
                'passer_player_name' : record["passer_player_name"],
                'rusher_player_name' : record["rusher_player_name"],
                'receiver_player_name' : record["receiver_player_name"],
                'sack_player_name' : record["sack_player_name"],
                'sack_player_name2' : record["sack_player_name2"],
                'pass_breakup_player_name' : record["pass_breakup_player_name"],
                'interception_player_name' : record["interception_player_name"],
                'fg_kicker_player_name' : record["fg_kicker_player_name"],
                'fg_block_player_name' : record["fg_block_player_name"],
                'fg_return_player_name' : record["fg_return_player_name"],
                'kickoff_player_name' : record["kickoff_player_name"],
                'kickoff_return_player_name' : record["kickoff_return_player_name"],
                'punter_player_name' : record["punter_player_name"],
                'punt_block_player_name' : record["punt_block_player_name"],
                'punt_return_player_name' : record["punt_return_player_name"],
                'punt_block_return_player_name' : record["punt_block_return_player_name"],
                'fumble_player_name' : record["fumble_player_name"],
                'fumble_forced_player_name' : record["fumble_forced_player_name"],
                'fumble_recovered_player_name' : record["fumble_recovered_player_name"],
            }
            # remove added columns
            for col in bad_cols:
                record.pop(col, None)

        if pbp['header']['competitions'][0]['competitors'][0]['homeAway'] == 'home':
            homeTeamId = pbp['header']['competitions'][0]['competitors'][0]['team']['id']
            awayTeamId = pbp['header']['competitions'][0]['competitors'][1]['team']['id']
        else:
            homeTeamId = pbp['header']['competitions'][0]['competitors'][1]['team']['id']
            awayTeamId = pbp['header']['competitions'][0]['competitors'][0]['team']['id']

        pbp['scoringPlays'] = [play for play in jsonified_df if play['scoringPlay'] == True]

        result = {
            "id": gameId,
            "count" : len(jsonified_df),
            "plays" : jsonified_df,
            "advBoxScore" : box,
            "homeTeamId": homeTeamId,
            "awayTeamId": awayTeamId,
            "drives" : pbp['drives'],
            "scoringPlays" : pbp['scoringPlays'],
            "winprobability" : np.array(pbp['winprobability']).tolist(),
            "boxScore" : pbp['boxscore'],
            "homeTeamSpread" : np.array(pbp['homeTeamSpread']).tolist(),
            "overUnder" : np.array(pbp['overUnder']).tolist(),
            "header" : pbp['header'],
            "broadcasts" : np.array(pbp['broadcasts']).tolist(),
            "pickcenter" : np.array(pbp['pickcenter']).tolist(),
            "gameInfo" : np.array(pbp['gameInfo']).tolist(),
            "season" : np.array(pbp['season']).tolist()
        }
        # logging.getLogger("root").info(result)
        logging.getLogger("root").info("Successfully processed game: " + gameId)
        return Response(json.dumps(result), media_type="application/json")
    except KeyError:
        return Response({
            "status" : "bad",
            "message" : "ESPN payload is malformed. Data not available."
        }, media_type = "application/json"), 404
    except:
        return Response({
            "status" : "bad",
            "message" : "Unknown error occurred, check logs."
        }, media_type = "application/json"), 500

@app.get("/py/cfb/percentiles/{year}", tags=["College Football"])
def get_cfb_percentiles_year(request: Request,
                                   year: str) -> Optional[None]:
    headers = {"accept": "application/json"}
    percentiles = requests.get(url = f"http://summary:3000/percentiles/{year}")
    return Response(json.dumps(percentiles.json()), media_type="application/json")



if __name__ == "__main__":
  uvicorn.run("app:app", host='0.0.0.0', port=7000, reload=True )