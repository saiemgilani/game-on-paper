import {useEffect, useState} from 'react';
import axios from 'axios';

import {pyApiOrigin} from '../utils/config';
const stat_key_title_mapping = {
    "EPA_plays" : "Total Plays",
    "scrimmage_plays" : "Scrimmage Plays",
    "EPA_overall_total" : "Total EPA",
    "EPA_overall_off" : "   Offensive EPA",
    "EPA_overall_offense" : "\xa0 \xa0 Offensive EPA",
    "EPA_passing_overall" : "\xa0 \xa0 EPA",
    "EPA_rushing_overall" : "\xa0 \xa0 EPA",
    "EPA_per_play" : "\xa0 \xa0 EPA/Play",
    "EPA_passing_per_play" : "\xa0 \xa0 EPA/Play",
    "EPA_rushing_per_play" : "\xa0 \xa0 EPA/Play",
    "rushes" : "Rushes",
    "rushing_power" : "\xa0 \xa0 Power Run Attempts (Down \u2265 3, Distance \u2264 2)",
    "rushing_power_success" : "\xa0 \xa0 Successful Power Runs (Rate)",
    "rushing_stuff" : "\xa0 \xa0 Stuffed Runs (Yds Gained \u2264 0)",
    "rushing_stopped" : "\xa0 \xa0 Stopped Runs (Yds Gained \u2264 2)",
    "rushing_opportunity" : "\xa0 \xa0 Opportunity Runs (Yds Gained \u2265 4)",
    "rushing_highlight" : "\xa0 \xa0 Highlight Runs (Yds Gained \u2265 8)",
    "havoc_total" : "Havoc Plays Created",
    "havoc_total_pass" : "\xa0 \xa0 Passing",
    "havoc_total_rush" : "\xa0 \xa0 Rushing",
    "EPA_penalty": "\xa0 \xa0 Penalty EPA",
    "special_teams_plays" : "Total Plays",
    "EPA_sp" : "Total EPA",
    "EPA_special_teams" : "\xa0 \xa0 Special Teams EPA",
    "EPA_fg" : "\xa0 \xa0 Field Goal EPA",
    "EPA_punt" : "\xa0 \xa0 Punting EPA",
    "EPA_kickoff" : "\xa0 \xa0 Kickoff Return EPA",
    "TFL" : "TFLs Generated",
    "TFL_pass" : "\xa0 \xa0 Passing",
    "TFL_rush" : "\xa0 \xa0 Rushing",
    "EPA_success" : "Successful Plays (EPA > 0)",
    "EPA_success_pass" : "\xa0 \xa0 When Passing",
    "EPA_success_rush" : "\xa0 \xa0 When Rushing",
    "EPA_success_standard_down" : "\xa0 \xa0 On Standard Downs",
    "EPA_success_passing_down": "\xa0 \xa0 On Passing Downs",
    "EPA_success_early_down": "\xa0 \xa0 On Early Downs",
    "EPA_success_early_down_pass": "\xa0 \xa0 Successful Passes (Rate)",
    "EPA_success_early_down_rush": "\xa0 \xa0 Successful Rushes (Rate)",
    "early_downs": "Early Downs",
    "early_down_pass": "\xa0 \xa0 Passes",
    "early_down_rush": "\xa0 \xa0 Rushes",
    "EPA_success_late_down": "\xa0 \xa0 On Late Downs",
    "EPA_success_late_down_pass": "\xa0 \xa0 Successful Passes (Rate)",
    "EPA_success_late_down_rush": "\xa0 \xa0 Successful Rushes (Rate)",
    "late_downs": "Late Downs",
    "late_down_pass": "\xa0 \xa0 Passes",
    "late_down_rush": "\xa0 \xa0 Rushes",
    "EPA_explosive" : "Explosive Plays",
    "EPA_explosive_passing" : "\xa0 \xa0 When Passing (EPA > 2.4)",
    "EPA_explosive_rushing" : "\xa0 \xa0 When Rushing (EPA > 1.8)",
    "scoring_opps_opportunities" : "Scoring Opps",
    "scoring_opps_points" : "\xa0 \xa0 Total Points",
    "scoring_opps_pts_per_opp" : "\xa0 \xa0 Points per Opp",
    "field_pos_avg_start" : "Avg Starting FP",
    "field_pos_avg_starting_predicted_pts" : "\xa0 \xa0 Predicted Points",
    "sacks" : "Sacks Generated",
    "turnovers" : "Turnovers",
    "expected_turnovers" : "Expected Turnovers",
    "turnover_margin" : "Turnover Margin",
    "expected_turnover_margin" : "Expected Turnover Margin",
    "turnover_luck" : "Turnover Luck (pts)",
    "PD" : "Passes Defensed",
    "INT" : "\xa0 \xa0 Interceptions",
    "Int" : "\xa0 \xa0 Interceptions",
    "def_int" : "Interceptions",
    "fumbles" : "Fumbles Forced",
    "total_fumbles" : "\xa0 \xa0 Fumbles",
    "fumbles_lost" : "\xa0 \xa0 Fumbles Lost",
    "fumbles_recovered" : "Fumbles Recovered",
    "middle_8": "\"Middle 8\" Plays",
    "middle_8_pass": "\xa0 \xa0 Passes",
    "middle_8_rush": "\xa0 \xa0 Rushes",
    "EPA_middle_8": "\xa0 \xa0 EPA",
    "EPA_middle_8_success": "\xa0 \xa0 During \"Middle 8\"",
    "EPA_middle_8_success_pass": "\xa0 \xa0 Successful Passes (Rate)",
    "EPA_middle_8_success_rush": "\xa0 \xa0 Successful Rushes (Rate)",
    "EPA_middle_8_per_play" : "\xa0 \xa0 EPA/play",
    "EPA_early_down" : "\xa0 \xa0 EPA",
    "EPA_early_down_per_play" : "\xa0 \xa0 EPA/Play",
    "first_downs_created" : "First Downs Created",
    "early_down_first_down" : "\xa0 \xa0 First Downs Created",
    "passes" : "Passes",
    "rushes" : "Rushes",
    "drives" : "Total",
    "drive_total_gained_yards_rate" : "Available Yards %",
    "yards_per_drive" : "Yards/Drive",
    "plays_per_drive" : "Plays/Drive",
    "avg_field_position": "Avg Starting Field Position"
}
function espnCfbTeamBox(res) {
  const columns = [{Header: 'Stat', accessor: 'Stat'}];

  res.data.boxScore.teams.forEach(d =>
    columns.push({Header: d.team.location, accessor: d.team.location })
  );
  const boxData = [];
  res.data.boxScore.teams.forEach(d =>
    d.statistics.forEach(e => boxData.push({Location: e.displayValue, Stat: e.label}))
  )
  const away = columns.map(d=>d.Header)[1]
  const home = columns.map(d=>d.Header)[2]
  const boxDA = boxData.slice(0,15)
  const boxDH = boxData.slice(15,30)
  boxDA.map(d=>d[away] = d.Location)
  boxDH.map(d=>d[home] = d.Location)
  boxDA.forEach((value,key)=> boxDA[key][home]=boxDH[key][home])
  boxDA.map(d=>delete d.Location)
  // console.log(boxDA)
  return [columns,boxDA]
}

function espnCfbPlayerBox(res) {
  const plyrColumns = [{Header: 'Athlete', accessor: 'Athlete'}];

  res.data.boxScore.players.forEach(d =>
    plyrColumns.push({Header: d.team.location, accessor: d.team.location })
    );
  // console.log(plyrColumns)
  const boxPlyrData = [];
  res.data.boxScore.players.forEach(d =>
    d.statistics.forEach(e => boxPlyrData.push(e))
  )
  console.log(boxPlyrData)

  return res.data.boxScore.players
}
// function cfbTeamOverall(res){
//   const columns = ["EPA_plays", "EPA_overall_total", "EPA_overall_offense", "EPA_special_teams", "EPA_penalty"]
//   columns.forEach(item => 
//     (Object.keys(stat_key_title_mapping).includes(item)) ? stat_key_title_mapping[item] : item;
//     res.data.box_score.team.forEach(teamData =>
//       teamData[item]
//     )
//   )

// }
function espnCfbGameHeader(res) {
  return res.data.header.competitions[0].competitors
}
function useCFBGameApi(gameId) {
  const [cfbGameData, setCFBGameData] = useState([]);
  const [cfbTeamOverall, setCFBTeamOverall] = useState([]);
  const [cfbTeamScrimmage, setCFBTeamScrimmage] = useState([]);
  const [cfbTeamRushing, setCFBTeamRushing] = useState([]);
  const [cfbTeamExplosiveness, setCFBTeamExplosiveness] = useState([]);
  const [cfbTeamSituational, setCFBTeamSituational] = useState([]);
  const [cfbTeamDrives, setCFBTeamDrives] = useState([]);
  const [cfbTeamHavoc, setCFBTeamHavoc] = useState([]);
  const [cfbTeamTurnovers, setCFBTeamTurnovers] = useState([]);
  const [cfbTeamSpecialTeams, setCFBTeamSpecialTeams] = useState([]);
  const [cfbHomePassBox, setCFBHomePassBox] = useState([]);
  const [cfbAwayPassBox, setCFBAwayPassBox] = useState([]);
  const [cfbHomeRushBox, setCFBHomeRushBox] = useState([]);
  const [cfbAwayRushBox, setCFBAwayRushBox] = useState([]);
  const [cfbHomeRecBox, setCFBHomeRecBox] = useState([]);
  const [cfbAwayRecBox, setCFBAwayRecBox] = useState([]);
  // const [cfbGameCols, setCFBGameCols] = useState([]);
  const [cfbTeamBoxData, setCFBTeamBoxData] = useState([]);
  const [cfbTeamBoxCols, setCFBTeamBoxCols] = useState([]);
  const [cfbPlayerData, setCFBPlayerData] = useState([]);
  const [cfbPlayerCols, setCFBPlayerCols] = useState([]);
  const [cfbGameHeader, setCFBGameHeader] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${pyApiOrigin}/${gameId}`;
      const res = await axios.get(baseUrl);
      setCFBGameData(res.data);
      const homeTeamId = res.data.homeTeamId
      const awayTeamId = res.data.awayTeamId
      const homePassBox = res.data.box_score.pass.filter(function(itm){
        return homeTeamId.indexOf(itm.pos_team) > -1
      })
      const awayPassBox = res.data.box_score.pass.filter(function(itm){
        return awayTeamId.indexOf(itm.pos_team) > -1
      })
      
      const homeRushBox = res.data.box_score.rush.filter(function(itm){
        return homeTeamId.indexOf(itm.pos_team) > -1
      })
      const awayRushBox = res.data.box_score.rush.filter(function(itm){
        return awayTeamId.indexOf(itm.pos_team) > -1
      })
      const homeRecBox = res.data.box_score.receiver.filter(function(itm){
        return homeTeamId.indexOf(itm.pos_team) > -1
      })
      const awayRecBox = res.data.box_score.receiver.filter(function(itm){
        return awayTeamId.indexOf(itm.pos_team) > -1
      })
      const teamBoxOverall = []
      let columns = ["EPA_plays", "EPA_overall_total", "EPA_overall_offense", "EPA_special_teams", "EPA_penalty"]
      const teambox = columns.forEach(col => 
          teamBoxOverall.push({
            Stat: stat_key_title_mapping[col], 
            home_stat_value: res.data.box_score.team[0][col], 
            home_pos_team: res.data.box_score.team[0]['pos_team'],
            away_stat_value: res.data.box_score.team[1][col], 
            away_pos_team: res.data.box_score.team[1]['pos_team'],})
      )
      const teamBoxScrimmage = []
      columns = ["scrimmage_plays", "EPA_overall_off", "EPA_per_play", "passes", "EPA_passing_overall",
        "EPA_passing_per_play", "rushes", "EPA_rushing_overall", "EPA_rushing_per_play"]
      const teamboxscrimmage = columns.forEach(col =>
        teamBoxScrimmage.push({
          Stat: stat_key_title_mapping[col], 
          home_stat_value: res.data.box_score.team[0][col], 
          home_pos_team: res.data.box_score.team[0]['pos_team'],
          away_stat_value: res.data.box_score.team[1][col], 
          away_pos_team: res.data.box_score.team[1]['pos_team']
        })
      )
      const teamBoxRushing = []
      columns = ["scrimmage_plays", "rushes", "rushing_power", "rushing_power_success",
        "rushing_stuff", "rushing_stopped", "rushing_opportunity", "rushing_highlight"]
      const teamboxrushing = columns.forEach(col =>
        teamBoxRushing.push({
          Stat: stat_key_title_mapping[col], 
          home_stat_value: res.data.box_score.team[0][col], 
          home_pos_team: res.data.box_score.team[0]['pos_team'],
          away_stat_value: res.data.box_score.team[1][col], 
          away_pos_team: res.data.box_score.team[1]['pos_team']
        })
      )  
      const teamBoxExplosiveness = []
      columns = ["EPA_plays","scrimmage_plays","EPA_explosive","EPA_explosive_passing","EPA_explosive_rushing"]
      const teamboxexplosiveness = columns.forEach(col =>
        teamBoxExplosiveness.push({
          Stat: stat_key_title_mapping[col], 
          home_stat_value: res.data.box_score.team[0][col], 
          home_pos_team: res.data.box_score.team[0]['pos_team'],
          away_stat_value: res.data.box_score.team[1][col], 
          away_pos_team: res.data.box_score.team[1]['pos_team']
        })
      )  
      columns = ["EPA_success", "EPA_success_pass", "EPA_success_rush",  "EPA_success_standard_down",
        "EPA_success_passing_down", "EPA_success_early_down", "EPA_success_late_down", "EPA_middle_8_success",
        "early_downs", "early_down_first_down", "EPA_early_down", "EPA_early_down_per_play",
        "early_down_pass", "early_down_rush", "EPA_success_early_down_pass", "EPA_success_early_down_rush",
        "middle_8", "EPA_middle_8", "EPA_middle_8_per_play", "middle_8_pass", "middle_8_rush",
        "EPA_middle_8_success_pass", "EPA_middle_8_success_rush"]
      const teamBoxSituational = []
      const teamboxsituational = columns.forEach(col =>
        teamBoxSituational.push({
          Stat: stat_key_title_mapping[col], 
          home_stat_value: res.data.box_score.situational[0][col], 
          home_pos_team: res.data.box_score.situational[0]['pos_team'],
          away_stat_value: res.data.box_score.situational[1][col], 
          away_pos_team: res.data.box_score.situational[1]['pos_team']
        })
      )  
      columns = ["drives","avg_field_position","plays_per_drive","yards_per_drive","drive_total_gained_yards_rate"]
      const teamBoxDrives = []
      const teamboxDrives = columns.forEach(col =>
        teamBoxDrives.push({
          Stat: stat_key_title_mapping[col], 
          home_stat_value: res.data.box_score.drives[0][col], 
          home_pos_team: res.data.box_score.drives[0]['pos_team'],
          away_stat_value: res.data.box_score.drives[1][col], 
          away_pos_team: res.data.box_score.drives[1]['pos_team']
        })
      )
      columns = ["scrimmage_plays","havoc_total","havoc_total_pass","havoc_total_rush","TFL","TFL_pass","TFL_rush", "sacks","PD","def_int","fumbles"]
      const teamBoxHavoc = []
      const teamboxHavoc = columns.forEach(col =>
        teamBoxHavoc.push({
          Stat: stat_key_title_mapping[col],
          home_stat_value: res.data.box_score.defensive[0][col],
          home_pos_team: res.data.box_score.defensive[0]['def_pos_team'],
          away_stat_value: res.data.box_score.defensive[1][col],
          away_pos_team: res.data.box_score.defensive[1]['def_pos_team']
        })
      )
      columns = ["turnovers","total_fumbles","fumbles_lost","fumbles_recovered","Int","turnover_margin","expected_turnovers","expected_turnover_margin","turnover_luck"]
      const teamBoxTurnovers = []
      const teamboxTurnovers = columns.forEach(col =>
        teamBoxTurnovers.push({
          Stat: stat_key_title_mapping[col],
          home_stat_value: res.data.box_score.turnover[0][col],
          home_pos_team: res.data.box_score.turnover[0]['pos_team'],
          away_stat_value: res.data.box_score.turnover[1][col],
          away_pos_team: res.data.box_score.turnover[1]['pos_team']
        })
      )
      columns = ["special_teams_plays","EPA_sp","EPA_fg","EPA_punt","EPA_kickoff"]
      const teamBoxSpecialTeams = []
      const teamboxSpecialTeams = columns.forEach(col =>
        teamBoxSpecialTeams.push({
          Stat: stat_key_title_mapping[col],
          home_stat_value: res.data.box_score.team[0][col],
          home_pos_team: res.data.box_score.team[0]['pos_team'],
          away_stat_value: res.data.box_score.team[1][col],
          away_pos_team: res.data.box_score.team[1]['pos_team']
        })
      )
      console.log(teamBoxTurnovers)
      setCFBTeamOverall(teamBoxOverall)
      setCFBTeamScrimmage(teamBoxScrimmage)
      setCFBTeamRushing(teamBoxRushing)
      setCFBTeamExplosiveness(teamBoxExplosiveness)
      setCFBTeamSituational(teamBoxSituational)
      setCFBTeamDrives(teamBoxDrives)
      setCFBTeamHavoc(teamBoxHavoc)
      setCFBTeamTurnovers(teamBoxTurnovers)
      setCFBTeamSpecialTeams(teamBoxSpecialTeams)
      setCFBHomePassBox(homePassBox)
      setCFBAwayPassBox(awayPassBox)
      setCFBHomeRushBox(homeRushBox)
      setCFBAwayRushBox(awayRushBox)
      setCFBHomeRecBox(homeRecBox)
      setCFBAwayRecBox(awayRecBox)
      const espnTBox = espnCfbTeamBox(res)
      setCFBTeamBoxCols(espnTBox[0])
      setCFBTeamBoxData(espnTBox[1]);
      const espnPBox = espnCfbPlayerBox(res)
      setCFBPlayerCols(espnPBox[0])
      setCFBPlayerData(espnPBox[1]);
      const espnGameHeader = espnCfbGameHeader(res)
      console.log(res.data['header']['competitions'][0]['competitors'])
      setCFBGameHeader(espnGameHeader)
    };
    fetchData();
  }, [gameId]);

  return [cfbGameData, 
          cfbTeamOverall,
          cfbTeamScrimmage,
          cfbTeamRushing,
          cfbTeamExplosiveness,
          cfbTeamSituational,
          cfbTeamDrives,
          cfbTeamHavoc,
          cfbTeamTurnovers,
          cfbTeamSpecialTeams,
          cfbHomePassBox, cfbAwayPassBox,
          cfbHomeRushBox, cfbAwayRushBox,
          cfbHomeRecBox, cfbAwayRecBox,
          cfbTeamBoxData, cfbTeamBoxCols,
          cfbPlayerData, cfbPlayerCols, 
          cfbGameHeader];
}

export default useCFBGameApi;
