import {useEffect, useState} from 'react';
import axios from 'axios';

import {pyApiOrigin} from '../utils/config';

function getNumberWithOrdinal(n) {
    var s = ["th", "st", "nd", "rd"];
    let v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
function formatDown(down, playType) {
    if (playType.includes("Kickoff")) {
        return "Kickoff"
    } else if (playType.includes("Extra Point") || playType.includes("Conversion")) {
        return "PAT"
    } else if (down > -1) {
        return getNumberWithOrdinal(down)
    } else {
        return down
    }
}
function formatYardline(yardsToEndzone, offenseAbbrev, defenseAbbrev) {
    if (yardsToEndzone == 50) {
        return "50";
    } else if (yardsToEndzone < 50) {
        return `${defenseAbbrev} ${yardsToEndzone}`
    } else {
        return `${offenseAbbrev} ${100 - yardsToEndzone}`
    }
}
function formatDistance(down, type, distance, yardline) {
    var dist = (distance == 0 || yardline <= distance) ? "Goal" : distance
    var downForm = formatDown(down, type)
    if (downForm.includes("Kickoff") || downForm.includes("PAT")) {
        return downForm
    } else {
        return downForm + " & " + dist
    }
}
function roundNumber(value, power10, fixed) {
  return (Math.round(parseFloat(value || 0) * (Math.pow(10, power10))) / (Math.pow(10, power10))).toFixed(fixed)
}
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
const turnover_vec = [
  "Blocked Field Goal",
  "Blocked Field Goal Touchdown",
  "Blocked Punt",
  "Blocked Punt Touchdown",
  "Field Goal Missed",
  "Missed Field Goal Return",
  "Missed Field Goal Return Touchdown",
  "Fumble Recovery (Opponent)",
  "Fumble Recovery (Opponent) Touchdown",
  "Fumble Return Touchdown",
  "Defensive 2pt Conversion",
  "Interception",
  "Interception Return",
  "Interception Return Touchdown",
  "Pass Interception Return",
  "Pass Interception Return Touchdown",
  "Kickoff Team Fumble Recovery",
  "Kickoff Team Fumble Recovery Touchdown",
  "Punt Touchdown",
  "Punt Return Touchdown",
  "Sack Touchdown",
  "Uncategorized Touchdown"
]
function createPlayRow(play, canCollapse, collapsePrefix, expandingRowCallback) {
  var classText = "";
  if (turnover_vec.includes(play.type.text) || play.text.includes("fumble")) {
      classText = " table-danger"
  } else if (play.scoringPlay == true) {
      classText = " table-success"
  } else if (play.text.toLocaleLowerCase().includes("penalty")) {
      classText = " table-warning"
  }
  var period = `Q${play.period}`;
  if (play.period > 5) {
      period = `${play.period - 4}OT`
  } else if (play.period == 5) {
      period = "OT"
  } else {
      period = `Q${play.period} ${play.clock.displayValue}`;
  }
  var offense = (play.start.pos_team.id == play.homeTeamId) ? play.homeTeamId : play.awayTeamId;
  var defense = (play.start.pos_team.id == play.homeTeamId) ? play.awayTeamId : play.homeTeamId;
  var offenseAbbrev = (play.start.pos_team.id == play.homeTeamId) ? play.homeTeamAbbrev : play.awayTeamAbbrev;
  var defenseAbbrev = (play.start.pos_team.id == play.homeTeamId) ? play.awayTeamAbbrev : play.homeTeamAbbrev;
  var scoreText = (play.scoringPlay == true) ? ` - <strong>${play.awayTeamAbbrev} ${play.awayScore}, ${play.homeTeamAbbrev} ${play.homeScore}</strong>` : ` - ${play.awayTeamAbbrev} ${play.awayScore}, ${play.homeTeamAbbrev} ${play.homeScore}`
  var collapsibleText = (canCollapse) ? `data-bs-toggle="collapse" href="#play-${collapsePrefix}-${play.game_play_number}"` : ''
  let fourthDownLink = `https://kazink.shinyapps.io/cfb_fourth_down/?team=${play.start.pos_team.name}&pos_score=${play.start.pos_team_score}&def_pos_score=${play.start.def_pos_team_score}&pos_timeouts=${play.start.posTeamTimeouts}&def_timeouts=${play.start.defTeamTimeouts}&distance=${play.start.distance}&yards_to_goal=${play.start.yardsToEndzone}&qtr=${play.period}&minutes=${play.clock.minutes}&seconds=${play.clock.seconds}&posteam_spread=${-1 * parseFloat(play.start.posTeamSpread)}&vegas_ou=${play.overUnder}&season=${play.season}&pos_team_receives_2H_kickoff=${play.modelInputs.start.pos_team_receives_2H_kickoff}&is_home=${play.modelInputs.start.is_home}`;
  var fourthDownEval = ""
  if (play.start.down == 4) {
      fourthDownEval = `<p style="text-align: center;"><strong>Fouth Down Decision Evaluation:</strong> <a href="${fourthDownLink}" target="__blank">link</a></p>`;
  }
  var baseRow = `
  <tr ${collapsibleText} class="accordion-toggle${classText}">
      <td style="text-align: left;">${period}</td>
      <td style="text-align: center;"><img class="img-fluid" width="35px" src="https://a.espncdn.com/i/teamlogos/ncaa/500/${play.pos_team}.png" alt="ESPN team id ${play.pos_team}"/></td>
      <td style="text-align: left;">(${formatDistance(play.start.down, play.type.text, play.start.distance, play.start.yardsToEndzone)} at ${ formatYardline(play.start.yardsToEndzone, offense.abbreviation, defense.abbreviation) }) ${play.text}${scoreText}</td>
      <td class="numeral" style="text-align: center;">${roundNumber(parseFloat(play.expectedPoints.added), 2, 2)}</td>
      <td class="numeral" style="text-align: center;">${roundNumber(parseFloat(play.winProbability.before) * 100, 3, 1)}%</td>
      <td class="numeral" style="text-align: right;">${roundNumber(parseFloat(play.winProbability.added) * 100, 3, 1)}%</td>
  </tr>`;
  if (canCollapse) {
      baseRow += `<tr>
          <td colspan="6" class="hiddenRow">
              <div class="accordian-body collapse" id="play-${collapsePrefix}-${play.game_play_number}"> 
                  <div class="row p-1">`;
      if (expandingRowCallback != null) {
          baseRow += expandingRowCallback(play);
      } else {
          baseRow += `
          <div class="ms-sm-auto col-lg-6">
              <p style="text-align: center;"><strong>Play Type:</strong> ${play.type.text}</p>
              <p style="text-align: center;"><strong>Yards to End Zone (Before -> After):</strong> ${play.start.yardsToEndzone} -> ${play.end.yardsToEndzone}</p>                
              <p style="text-align: center;"><strong>Started Drive at:</strong> ${formatYardline(play.drive_start, offenseAbbrev, defenseAbbrev)}</p>                
              <p style="text-align: center;"><strong>ExpPts (After - Before = Added):</strong> ${roundNumber(parseFloat(play.expectedPoints.after), 2, 2)} - ${roundNumber(parseFloat(play.expectedPoints.before), 2, 2)} = ${roundNumber(parseFloat(play.expectedPoints.added), 2, 2)}</p>
              <p style="text-align: center;"><strong>Score Difference (Before):</strong> ${play.start.pos_score_diff} (${roundNumber(parseFloat(play.start.ExpScoreDiff), 2, 2)})</p>
              <p style="text-align: center;"><strong>Score Difference (End):</strong> ${play.end.pos_score_diff} (${roundNumber(parseFloat(play.end.ExpScoreDiff), 2, 2)})</p>
              <p style="text-align: center;"><strong>Change of Possession:</strong> ${play.change_of_poss}</p>                            
          </div>
          <div class="ms-sm-auto col-lg-6">
              <p style="text-align: center;"><strong>Score:</strong> ${play.awayTeamAbbrev} ${play.awayScore}, ${play.homeTeamAbbrev} ${play.homeScore}</p>
              <p style="text-align: center;"><strong>Drive Summary:</strong> ${play.drive_play_index} plays, ${play.drive_total_yards} yards</p>
              <p style="text-align: center;"><strong>Win Probability (Before):</strong> ${roundNumber(parseFloat(play.winProbability.before) * 100, 3, 1)}%</p>
              <p style="text-align: center;"><strong>Win Probability (After):</strong> ${roundNumber(parseFloat(play.winProbability.after) * 100, 3, 1)}%</p>
              <p style="text-align: center;"><strong>Away Score:</strong> ${play.start.awayScore} (${play.awayScore}) <strong>Home Score:</strong> ${play.start.homeScore} (${play.homeScore})</p>    
              <p style="text-align: center;"><strong>Pos Team Timeouts:</strong> ${play.end.posTeamTimeouts} <strong>Defense Timeouts:</strong> ${play.end.defPosTeamTimeouts}</p>
              ${fourthDownEval}
          </div>
          `;
      } 
      baseRow += `</div>
              </div>
          </td>
      </tr>`
  }
  return baseRow;
}
function buildPlayTable(plays, prefix, expandable, errorMsg, showGuide, expandingRowCallback) {
  if (plays == null || plays.length == 0) {
      return `<p class="text-center text-muted">${errorMsg}</p>`;
  }
  let guideText = (showGuide) ? `<caption>Play shading guide: 
      <ul>
          <li><strong>Yellow</strong> - penalty</li>
          <li><strong>Red</strong> - turnover</li>
          <li><strong>Green</strong> - scoring play</li>
      </ul>
  </caption>` : ""
  
  var baseTable = `
  <table class="table table-sm table-responsive" style="border-collapse:collapse;">
      ${guideText}
      <thead>
          <tr>
              <th style="text-align: left;">Time</th>
              <th style="text-align: center;">Offense</th>
              <th style="text-align: left;">Play Description</th>
              <th style="text-align: center;">EPA</th>
              <th style="text-align: center;">WP%</th>
              <th style="text-align: right;">WPA</th>
          </tr>
      </thead>
      <tbody>`;
  plays.forEach(play => {
      baseTable += createPlayRow(play, expandable, prefix, expandingRowCallback);
  });
  baseTable += `</tbody>
  </table>`;
  return baseTable;
}
function buildBigPlayTable(plays){
  let bigPlays = [...plays]
  bigPlays.sort((a, b) => {
      var diff = Math.abs(a.expectedPoints.added) - Math.abs(b.expectedPoints.added)
      if (diff < 0) {
          return 1
      } else if (diff > 0) {
          return -1
      } else {
          return 0
      }
  })
  bigPlays = bigPlays.slice(0, 10)
  return bigPlays
}
function buildImportantPlayTable(plays){
  let mostImpPlays = [...plays]
  mostImpPlays.sort((a, b) => {
      var diff = Math.abs(a.winProbability.added) - Math.abs(b.winProbability.added)
      if (diff < 0) {
          return 1
      } else if (diff > 0) {
          return -1
      } else {
          return 0
      }
  })
  mostImpPlays = mostImpPlays.slice(0, 10)
  return mostImpPlays
}
function buildScoringPlayTable(plays){
  let scoringPlays = [...plays]

  return scoringPlays.filter(play => {if(play.scoringPlay) return play})
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
function teamboxoverall(res){
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
  return teamBoxOverall
}
function teamboxscrimmage(res){
  const teamBoxScrimmage = []
  let columns = ["scrimmage_plays", "EPA_overall_off", "EPA_per_play", "passes", "EPA_passing_overall",
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
  return teamBoxScrimmage
}
function teamboxrushing(res){
  const teamBoxRushing = []
  let columns = ["scrimmage_plays", "rushes", "rushing_power", "rushing_power_success",
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
  return teamBoxRushing
}

function teamboxexplosiveness(res){
  const teamBoxExplosiveness = []
  let columns = ["EPA_plays","scrimmage_plays","EPA_explosive","EPA_explosive_passing","EPA_explosive_rushing"]
  const teamboxexplosiveness = columns.forEach(col =>
    teamBoxExplosiveness.push({
      Stat: stat_key_title_mapping[col], 
      home_stat_value: res.data.box_score.team[0][col], 
      home_pos_team: res.data.box_score.team[0]['pos_team'],
      away_stat_value: res.data.box_score.team[1][col], 
      away_pos_team: res.data.box_score.team[1]['pos_team']
    })
  )
  return teamBoxExplosiveness
}
function teamboxsituational(res){
  let columns = ["EPA_success", "EPA_success_pass", "EPA_success_rush",  "EPA_success_standard_down",
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
  return teamBoxSituational
}
function teamboxdrives(res){
  let columns = ["drives","avg_field_position","plays_per_drive","yards_per_drive","drive_total_gained_yards_rate"]
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
  return teamBoxDrives
}
function teamboxhavoc(res){
  let columns = ["scrimmage_plays","havoc_total","havoc_total_pass","havoc_total_rush","TFL","TFL_pass","TFL_rush", "sacks","PD","def_int","fumbles"]
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
  return teamBoxHavoc
}
function teamboxturnovers(res){
  let columns = ["turnovers","total_fumbles","fumbles_lost","fumbles_recovered","Int","turnover_margin","expected_turnovers","expected_turnover_margin","turnover_luck"]
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
  return teamBoxTurnovers
}
function teamboxspecialteams(res){
  let columns = ["special_teams_plays","EPA_sp","EPA_fg","EPA_punt","EPA_kickoff"]
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
  return teamBoxSpecialTeams
}
function espnCfbGameHeader(res) {
  return res.data.header.competitions[0].competitors
}
function useCFBGameApi(gameId) {
  const [cfbGameData, setCFBGameData] = useState([]);
  const [cfbGamePlays, setCFBGamePlays] = useState([]);
  const [cfbGameBigPlays, setCFBGameBigPlays] = useState([]);
  const [cfbGameImportantPlays, setCFBGameImportantPlays] = useState([]);
  const [cfbGameScoringPlays, setCFBGameScoringPlays] = useState([]);
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
      const teamBoxOverall = teamboxoverall(res)
      const teamBoxScrimmage = teamboxscrimmage(res)
      const cfbGamePlays = res.data.plays
      const cfbGameBigPlays = buildBigPlayTable(res.data.plays)
      const cfbGameImportantPlays = buildImportantPlayTable(res.data.plays)
      const cfbGameScoringPlays = buildScoringPlayTable(res.data.plays)
      const teamBoxRushing = teamboxrushing(res)
      const teamBoxExplosiveness = teamboxexplosiveness(res)
      const teamBoxSituational = teamboxsituational(res)
      const teamBoxHavoc = teamboxhavoc(res)
      const teamBoxDrives = teamboxdrives(res)
      const teamBoxTurnovers = teamboxturnovers(res)
      const teamBoxSpecialTeams = teamboxspecialteams(res)

      console.log(teamBoxTurnovers)
      setCFBTeamOverall(teamBoxOverall)
      setCFBGamePlays(cfbGamePlays)
      setCFBGameBigPlays(cfbGameBigPlays)
      setCFBGameImportantPlays(cfbGameImportantPlays)
      setCFBGameScoringPlays(cfbGameScoringPlays)
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
          cfbGamePlays, cfbGameBigPlays, cfbGameImportantPlays, cfbGameScoringPlays,
          cfbTeamOverall, cfbTeamScrimmage, cfbTeamRushing, cfbTeamExplosiveness,
          cfbTeamSituational, cfbTeamDrives,
          cfbTeamHavoc, cfbTeamTurnovers, cfbTeamSpecialTeams,
          cfbHomePassBox, cfbAwayPassBox,
          cfbHomeRushBox, cfbAwayRushBox,
          cfbHomeRecBox, cfbAwayRecBox,
          cfbTeamBoxData, cfbTeamBoxCols,
          cfbPlayerData, cfbPlayerCols,
          cfbGameHeader];
}

export default useCFBGameApi;
