from datetime import datetime
from typing import Optional
import httpx
import json
import uvicorn
import numpy as np
from fastapi import FastAPI, HTTPException, Request, Query
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from play_handler import PlayProcess
from hoops_handler import HoopsProcess
from schedule_handler import ScheduleProcess
from dotenv import load_dotenv, dotenv_values
config = dotenv_values('.env.development.local')

app = FastAPI(
    title="Vercel FastAPI template",
    description="A starter template for FastAPI backends in Vercel deployments",
    version="0.1.0",
    docs_url='/py/api',
    openapi_url='/py/api/openapi.json',
    redoc_url=None
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
    "https://localhost:3000",
    "http://localhost:7000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/py/cfb/game/{gameId}")
def get_cfb_game(request: Request, gameId: str) -> Optional[None]:

    headers = {"accept": "application/json"}
    # gameId = request.get_json(force=True)['gameId']
    processed_data = PlayProcess(gameId = gameId)
    pbp = processed_data.cfb_pbp()
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
            "displayValue" : record["clock.displayValue"]
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
                "pos_score_diff" : record["start.pos_score_diff"],
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
                "pos_score_diff" : record["end.pos_score_diff"],
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
            "pos_score_diff" : record["start.pos_score_diff"],
            "posTeamTimeouts" : record["start.posTeamTimeouts"],
            "defTeamTimeouts" : record["start.defPosTeamTimeouts"],
            "ExpScoreDiff" : record["start.ExpScoreDiff"],
            "ExpScoreDiff_Time_Ratio" : record["start.ExpScoreDiff_Time_Ratio"],
            "shortDownDistanceText" : record["start.shortDownDistanceText"],
            "possessionText" : record["start.possessionText"],
            "downDistanceText" : record["start.downDistanceText"]
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
            "pos_score_diff" : record["end.pos_score_diff"],
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

    # logging.getLogger("root").info(result)
    return {
        "id": gameId,
        "count" : len(jsonified_df),
        "plays" : jsonified_df,
        "box_score" : box,
        "homeTeamId": pbp['header']['competitions'][0]['competitors'][0]['team']['id'],
        "awayTeamId": pbp['header']['competitions'][0]['competitors'][1]['team']['id'],
        "drives" : pbp['drives'],
        "scoringPlays" : np.array(pbp['scoringPlays']).tolist(),
        "winprobability" : np.array(pbp['winprobability']).tolist(),
        "boxScore" : pbp['boxscore'],
        "homeTeamSpread" : np.array(pbp['homeTeamSpread']).tolist(),
        "header" : pbp['header'],
        "broadcasts" : np.array(pbp['broadcasts']).tolist(),
        "videos" : np.array(pbp['videos']).tolist(),
        "standings" : pbp['standings'],
        "pickcenter" : np.array(pbp['pickcenter']).tolist(),
        "espnWinProbability" : np.array(pbp['espnWP']).tolist(),
        "gameInfo" : np.array(pbp['gameInfo']).tolist(),
        "season" : np.array(pbp['season']).tolist()
    }


@app.get("/py/cfb/scoreboard")
def get_cfb_scoreboard(request: Request,
                        dates:Optional[str] = Query(None),
                        week:Optional[str] = Query(None),
                        seasontype:Optional[str] = Query(None)) -> Optional[None]:

    headers = {"accept": "application/json"}
    processed_data = ScheduleProcess(dates = dates, week = week, season_type = seasontype)
    schedule = processed_data.cfb_schedule()
    tmp_json = schedule
    return tmp_json

@app.get("/py/nfl/scoreboard")
def get_nfl_scoreboard(request: Request,
                        dates:Optional[str] = Query(None),
                        week:Optional[str] = Query(None),
                        seasontype:Optional[str] = Query(None)) -> Optional[None]:

    headers = {"accept": "application/json"}
    processed_data = ScheduleProcess(dates = dates, week = week, season_type = seasontype)
    schedule = processed_data.nfl_schedule()
    tmp_json = schedule
    return tmp_json



@app.get("/py/nfl/game/{gameId}")
def get_nfl_game(request: Request, gameId: str) -> Optional[None]:
    headers = {"accept": "application/json"}
    # gameId = request.get_json(force=True)['gameId']
    processed_data = PlayProcess(gameId = gameId)
    pbp = processed_data.nfl_pbp()
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
            "displayValue" : record["clock.displayValue"]
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
                "pos_score_diff" : record["start.pos_score_diff"],
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
                "pos_score_diff" : record["end.pos_score_diff"],
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
            "pos_score_diff" : record["start.pos_score_diff"],
            "posTeamTimeouts" : record["start.posTeamTimeouts"],
            "defTeamTimeouts" : record["start.defPosTeamTimeouts"],
            "ExpScoreDiff" : record["start.ExpScoreDiff"],
            "ExpScoreDiff_Time_Ratio" : record["start.ExpScoreDiff_Time_Ratio"],
            "shortDownDistanceText" : record["start.shortDownDistanceText"],
            "possessionText" : record["start.possessionText"],
            "downDistanceText" : record["start.downDistanceText"]
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
            "pos_score_diff" : record["end.pos_score_diff"],
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

    # logging.getLogger("root").info(result)
    return {
        "id": gameId,
        "count" : len(jsonified_df),
        "plays" : jsonified_df,
        "box_score" : box,
        "homeTeamId": pbp['header']['competitions'][0]['competitors'][0]['team']['id'],
        "awayTeamId": pbp['header']['competitions'][0]['competitors'][1]['team']['id'],
        "drives" : pbp['drives'],
        "scoringPlays" : np.array(pbp['scoringPlays']).tolist(),
        "winprobability" : np.array(pbp['winprobability']).tolist(),
        "boxScore" : pbp['boxscore'],
        "homeTeamSpread" : np.array(pbp['homeTeamSpread']).tolist(),
        "header" : pbp['header'],
        "broadcasts" : np.array(pbp['broadcasts']).tolist(),
        "videos" : np.array(pbp['videos']).tolist(),
        "standings" : pbp['standings'],
        "pickcenter" : np.array(pbp['pickcenter']).tolist(),
        "espnWinProbability" : np.array(pbp['espnWP']).tolist(),
        "gameInfo" : np.array(pbp['gameInfo']).tolist(),
        "season" : np.array(pbp['season']).tolist()
    }

@app.get("/py/mbb/game/{gameId}")
def get_mbb_game(request: Request, gameId: str) -> Optional[None]:

    headers = {"accept": "application/json"}
    # gameId = request.get_json(force=True)['gameId']
    processed_data = HoopsProcess(gameId = gameId)
    pbp = processed_data.mbb_pbp()
    tmp_json = pbp
    return tmp_json

@app.get("/py/mbb/scoreboard")
def get_mbb_scoreboard(request: Request,
                        dates:Optional[str] = Query(None),
                        seasontype:Optional[str] = Query(None)) -> Optional[None]:

    headers = {"accept": "application/json"}
    processed_data = ScheduleProcess(dates = dates)
    schedule = processed_data.mbb_schedule()
    tmp_json = schedule
    return tmp_json

@app.get("/py/nba/scoreboard")
def get_nba_scoreboard(request: Request,
                        dates:Optional[str] = Query(None),
                        seasontype:Optional[str] = Query(None)) -> Optional[None]:

    headers = {"accept": "application/json"}
    processed_data = ScheduleProcess(dates = dates, season_type = seasontype)
    schedule = processed_data.nba_schedule()
    tmp_json = schedule
    return tmp_json

@app.get("/py/nba/game/{gameId}")
def get_nba_game(request: Request, gameId: str) -> Optional[None]:

    headers = {"accept": "application/json"}
    # gameId = request.get_json(force=True)['gameId']
    processed_data = HoopsProcess(gameId = gameId)
    pbp = processed_data.nba_pbp()
    tmp_json = pbp
    return tmp_json

@app.get("/py/wbb/game/{gameId}")
def get_wbb_game(request: Request, gameId: str) -> Optional[None]:

    headers = {"accept": "application/json"}
    # gameId = request.get_json(force=True)['gameId']
    processed_data = HoopsProcess(gameId = gameId)
    pbp = processed_data.wbb_pbp()
    tmp_json = pbp
    return tmp_json

@app.get("/py/wbb/scoreboard")
def get_wbb_scoreboard(request: Request,
                        dates:Optional[str] = Query(None),
                        seasontype:Optional[str] = Query(None)) -> Optional[None]:

    headers = {"accept": "application/json"}
    processed_data = ScheduleProcess(dates = dates)
    schedule = processed_data.wbb_schedule()
    tmp_json = schedule
    return tmp_json

@app.get("/py/wnba/scoreboard")
def get_wnba_scoreboard(request: Request,
                        dates:Optional[str] = Query(None),
                        seasontype:Optional[str] = Query(None)) -> Optional[None]:

    headers = {"accept": "application/json"}
    processed_data = ScheduleProcess(dates = dates, season_type = seasontype)
    schedule = processed_data.wnba_schedule()
    tmp_json = schedule
    return tmp_json

@app.get("/py/wnba/game/{gameId}")
def get_wnba_game(request: Request, gameId: str) -> Optional[None]:

    headers = {"accept": "application/json"}
    # gameId = request.get_json(force=True)['gameId']
    processed_data = HoopsProcess(gameId = gameId)
    pbp = processed_data.wnba_pbp()
    tmp_json = pbp
    return tmp_json


if __name__ == "__main__":
  uvicorn.run("app:app", host='0.0.0.0', port=7000, reload=True)