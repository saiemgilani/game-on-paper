
// import { Competitor, Competition } from "@/lib/cfb/types"
// const CLEAN_LIST = [61]
// function cleanField(team, field) {
//     if (CLEAN_LIST.includes(parseInt(team.id))) {
//         return team[field].toLocaleLowerCase()
//     }
//     return team[field]
// }
// function cleanAbbreviation(team: string) {
//     return cleanField(team, 'abbreviation')
// }

// function cleanName(team: string) {
//     return cleanField(team, 'nickname')
// }

// function cleanLocation(team) {
//     return cleanField(team, 'location')
// }

// function getNumberWithOrdinal(n) {
//     let s = ["th", "st", "nd", "rd"];
//     let v = n % 100;
//     return n + (s[(v - 20) % 10] || s[v] || s[0]);
// }
// function formatDown(down, playType) {
//     if (playType.includes("Kickoff")) {
//         return "Kickoff"
//     } else if (playType.includes("Extra Point") || playType.includes("Conversion")) {
//         return "PAT"
//     } else if (down > -1) {
//         return getNumberWithOrdinal(down)
//     } else {
//         return down
//     }
// }
// function formatYardline(yardsToEndzone, offenseAbbrev, defenseAbbrev) {
//     if (yardsToEndzone == 50) {
//         return "50";
//     } else if (yardsToEndzone < 50) {
//         return `${defenseAbbrev} ${yardsToEndzone}`
//     } else {
//         return `${offenseAbbrev} ${100 - yardsToEndzone}`
//     }
// }
// function formatDistance(down, type, distance, yardline) {
//     let dist = (distance == 0 || yardline <= distance) ? "Goal" : distance
//     let downForm = formatDown(down, type)
//     if (downForm.includes("Kickoff") || downForm.includes("PAT")) {
//         return downForm
//     } else {
//         return downForm + " & " + dist
//     }
// }
// const stat_key_title_mapping = {
//     "EPA_plays" : "Total Plays",
//     "scrimmage_plays" : "Scrimmage Plays",
//     "EPA_overall_total" : "Total EPA",
//     "EPA_overall_off" : "&emsp;&emsp;EPA",
//     "EPA_overall_offense" : "&emsp;&emsp;Offensive EPA",
//     "EPA_passing_overall" : "&emsp;&emsp;EPA",
//     "EPA_rushing_overall" : "&emsp;&emsp;EPA",
//     "EPA_per_play" : "&emsp;&emsp;EPA/Play",
//     "EPA_passing_per_play" : "&emsp;&emsp;EPA/Play",
//     "EPA_rushing_per_play" : "&emsp;&emsp;EPA/Play",
//     "rushes" : "Rushes",
//     "rushing_power" : "&emsp;&emsp;Power Run Attempts (Down &#8805; 3, Distance &#8804; 2)",
//     "rushing_power_success" : "&emsp;&emsp;Successful Power Runs (Rate)",
//     "rushing_stuff" : "&emsp;&emsp;Stuffed Runs (Yds Gained &#8804; 0)",
//     "rushing_stopped" : "&emsp;&emsp;Stopped Runs (Yds Gained &#8804; 2)",
//     "rushing_opportunity" : "&emsp;&emsp;Opportunity Runs (Yds Gained &#8805; 4)",
//     "rushing_highlight" : "&emsp;&emsp;Highlight Runs (Yds Gained &#8805; 8)",
//     "havoc_total" : "Havoc Plays Created",
//     "havoc_total_pass" : "&emsp;&emsp;Passing",
//     "havoc_total_rush" : "&emsp;&emsp;Rushing",
//     "EPA_penalty": "&emsp;&emsp;Penalty EPA",
//     "special_teams_plays" : "Total Plays",
//     "EPA_sp" : "Total EPA",
//     "EPA_special_teams" : "&emsp;&emsp;Special Teams EPA",
//     "EPA_fg" : "&emsp;&emsp;Field Goal EPA",
//     "EPA_punt" : "&emsp;&emsp;Punting EPA",
//     "EPA_kickoff" : "&emsp;&emsp;Kickoff Return EPA",
//     "TFL" : "TFLs Generated",
//     "TFL_pass" : "&emsp;&emsp;Passing",
//     "TFL_rush" : "&emsp;&emsp;Rushing",
//     "EPA_success" : "Successful Plays (EPA > 0)",
//     "EPA_success_pass" : "&emsp;&emsp;When Passing",
//     "EPA_success_rush" : "&emsp;&emsp;When Rushing",
//     "EPA_success_standard_down" : "&emsp;&emsp;On Standard Downs",
//     "EPA_success_passing_down": "&emsp;&emsp;On Passing Downs",
//     "EPA_success_early_down": "&emsp;&emsp;On Early Downs",
//     "EPA_success_early_down_pass": "&emsp;&emsp;Successful Passes (Rate)",
//     "EPA_success_early_down_rush": "&emsp;&emsp;Successful Rushes (Rate)",
//     "early_downs": "Early Downs",
//     "early_down_pass": "&emsp;&emsp;Passes",
//     "early_down_rush": "&emsp;&emsp;Rushes",
//     "EPA_success_late_down": "&emsp;&emsp;On Late Downs",
//     "EPA_success_late_down_pass": "&emsp;&emsp;Successful Passes (Rate)",
//     "EPA_success_late_down_rush": "&emsp;&emsp;Successful Rushes (Rate)",
//     "late_downs": "Late Downs",
//     "late_down_pass": "&emsp;&emsp;Passes",
//     "late_down_rush": "&emsp;&emsp;Rushes",
//     "EPA_explosive" : "Explosive Plays",
//     "EPA_explosive_passing" : "&emsp;&emsp;When Passing (EPA > 2.4)",
//     "EPA_explosive_rushing" : "&emsp;&emsp;When Rushing (EPA > 1.8)",
//     "scoring_opps_opportunities" : "Scoring Opps",
//     "scoring_opps_points" : "&emsp;&emsp;Total Points",
//     "scoring_opps_pts_per_opp" : "&emsp;&emsp;Points per Opp",
//     "field_pos_avg_start" : "Avg Starting FP",
//     "field_pos_avg_starting_predicted_pts" : "&emsp;&emsp;Predicted Points",
//     "sacks" : "Sacks Generated",
//     "turnovers" : "Turnovers",
//     "expected_turnovers" : "Expected Turnovers",
//     "turnover_margin" : "Turnover Margin",
//     "expected_turnover_margin" : "Expected Turnover Margin",
//     "turnover_luck" : "Turnover Luck (pts)",
//     "PD" : "Passes Defensed",
//     "INT" : "&emsp;&emsp;Interceptions",
//     "Int" : "&emsp;&emsp;Interceptions",
//     "def_int" : "Interceptions",
//     "fumbles" : "Fumbles Forced",
//     "total_fumbles" : "&emsp;&emsp;Fumbles",
//     "fumbles_lost" : "&emsp;&emsp;Fumbles Lost",
//     "fumbles_recovered" : "&emsp;&emsp;Fumbles Recovered",
//     "middle_8": "\"Middle 8\" Plays",
//     "middle_8_pass": "&emsp;&emsp;Passes",
//     "middle_8_rush": "&emsp;&emsp;Rushes",
//     "EPA_middle_8": "&emsp;&emsp;EPA",
//     "EPA_middle_8_success": "&emsp;&emsp;During \"Middle 8\"",
//     "EPA_middle_8_success_pass": "&emsp;&emsp;Successful Passes (Rate)",
//     "EPA_middle_8_success_rush": "&emsp;&emsp;Successful Rushes (Rate)",
//     "EPA_middle_8_per_play" : "&emsp;&emsp;EPA/play",
//     "EPA_early_down" : "&emsp;&emsp;EPA",
//     "EPA_early_down_per_play" : "&emsp;&emsp;EPA/Play",
//     "first_downs_created" : "First Downs Created",
//     "early_down_first_down" : "&emsp;&emsp;First Downs Created",
//     "passes" : "Passes",
//     // @ts-ignore
//     "rushes" : "Rushes",
//     "drives" : "Total",
//     "drive_total_gained_yards_rate" : "Available Yards %",
//     "yards_per_drive" : "Yards/Drive",
//     "plays_per_drive" : "Plays/Drive",
//     "avg_field_position": "Avg Starting Field Position",
//     "rushing_highlight_yards": "<a href=\"https://www.footballstudyhall.com/2018/2/2/16963820/college-football-advanced-stats-glossary\">Highlight Yards</a>",
//     "rushing_highlight_yards_per_opp": "&emsp;&emsp;Per Rush Opportunity",
//     "line_yards": "<a href=\"https://www.footballstudyhall.com/2018/2/2/16963820/college-football-advanced-stats-glossary\">OL Line Yards</a>",
//     "line_yards_per_carry": "&emsp;&emsp;Per Carry",
//     "yards_per_rush": "&emsp;&emsp;Yards/Play",
//     "yards_per_pass": "&emsp;&emsp;Yards/Play",
//     "yards_per_play": "&emsp;&emsp;Yards/Play",
//     "off_yards" : "&emsp;&emsp;Yards",
//     "rush_yards" : "&emsp;&emsp;Yards",
//     "pass_yards" : "&emsp;&emsp;Yards",
//     "total_yards":  "Total Yards",
//     "total_off_yards" : "&emsp;&emsp;Offensive Yards",
//     "total_sp_yards":"&emsp;&emsp;Special Teams Yards",
//     "total_pen_yards":"&emsp;&emsp;Penalty Yards",
//     "EPA_misc" : "&emsp;&emsp;Non-Scrimmage/Misc EPA",
//     "open_field_yards" : "Open-Field Yards",
//     "second_level_yards" : "Second-Level Yards",
//     "drive_stopped_rate" : "<a href=\"https://theathletic.com/2419632/2021/03/02/college-football-defense-rankings-stop-rate/\">Stop Rate</a>",
//     "EPA_non_explosive" : "EPA w/o Explosive Plays",
//     "EPA_non_explosive_per_play" : "&emsp;&emsp;EPA/Play",
//     "EPA_non_explosive_passing" : "&emsp;&emsp;When Passing",
//     "EPA_non_explosive_passing_per_play" : "&emsp;&emsp;&emsp;&emsp;EPA/Play",
//     "EPA_non_explosive_rushing" : "&emsp;&emsp;When Rushing",
//     "EPA_non_explosive_rushing_per_play" : "&emsp;&emsp;&emsp;&emsp;EPA/Play"
// }
// const turnover_vec = [
//     "Blocked Field Goal",
//     "Blocked Field Goal Touchdown",
//     "Blocked Punt",
//     "Blocked Punt Touchdown",
//     "Field Goal Missed",
//     "Missed Field Goal Return",
//     "Missed Field Goal Return Touchdown",
//     "Fumble Recovery (Opponent)",
//     "Fumble Recovery (Opponent) Touchdown",
//     "Fumble Return Touchdown",
//     "Defensive 2pt Conversion",
//     "Interception",
//     "Interception Return",
//     "Interception Return Touchdown",
//     "Pass Interception Return",
//     "Pass Interception Return Touchdown",
//     "Kickoff Team Fumble Recovery",
//     "Kickoff Team Fumble Recovery Touchdown",
//     "Punt Touchdown",
//     "Punt Return Touchdown",
//     "Sack Touchdown",
//     "Uncategorized Touchdown"
// ]

// function roundNumber(value, power10, fixed) {
//     return (Math.round(parseFloat(value || 0) * (Math.pow(10, power10))) / (Math.pow(10, power10))).toFixed(fixed)
// }

// function createPlayRow(play, canCollapse, collapsePrefix, expandingRowCallback, homeTeam, awayTeam) {
//     let classText = "";
//     if (turnover_vec.includes(play.type.text) || (play.text.includes("fumble") && play.change_of_poss == 1) || (play.start.down == 4 && parseFloat(play.statYardage) < parseFloat(play.start.distance) && !play.type.text.includes('Punt') && !play.type.text.includes('Timeout'))) {
//         classText = " table-danger"
//     } else if (play.scoringPlay == true) {
//         classText = " table-success"
//     } else if (play.text.toLocaleLowerCase().includes("penalty")) {
//         classText = " table-warning"
//     }
//     let period = `Q${play.period}`;
//     if (play.period > 5) {
//         period = `${play.period - 4}OT`
//     } else if (play.period == 5) {
//         period = "OT"
//     } else {
//         period = `Q${play.period} ${play.clock.displayValue}`;
//     }
//     let offense = (play.start.pos_team.id == homeTeam.id) ? homeTeam : awayTeam;
//     let defense = (play.start.pos_team.id == homeTeam.id) ? awayTeam : homeTeam;

//     let scoreText = (play.scoringPlay == true) ? ` - <strong>${cleanAbbreviation(awayTeam)} ${play.awayScore}, ${cleanAbbreviation(homeTeam)} ${play.homeScore}</strong>` : ` - ${cleanAbbreviation(awayTeam)} ${play.awayScore}, ${cleanAbbreviation(homeTeam)} ${play.homeScore}`
//     let collapsibleText = (canCollapse) ? `data-bs-toggle="collapse" href="#play-${collapsePrefix}-${play.game_play_number}"` : ''

//     let fourthDownLink = `https://kazink.shinyapps.io/cfb_fourth_down/?team=${offense.location}&pos_score=${play.start.pos_team_score}&def_pos_score=${play.start.def_pos_team_score}&pos_timeouts=${play.start.posTeamTimeouts}&def_timeouts=${play.start.defTeamTimeouts}&distance=${play.start.distance}&yards_to_goal=${play.start.yardsToEndzone}&qtr=${play.period}&minutes=${play.clock.minutes}&seconds=${play.clock.seconds}&posteam_spread=${-1 * parseFloat(play.start.posTeamSpread)}&vegas_ou=${play.overUnder}&season=${play.season}&pos_team_receives_2H_kickoff=${play.modelInputs.start.pos_team_receives_2H_kickoff}&is_home=${play.modelInputs.start.is_home}`;
//     let fourthDownEval = ""
//     if (play.start.down == 4) {
//         fourthDownEval = `<p style="text-align: center;"><strong>Fouth Down Decision Evaluation:</strong> <a href="${fourthDownLink}" target="__blank">link</a></p>`;
//     }
//     let baseRow = `
//     <tr ${collapsibleText} class="accordion-toggle${classText}">
//         <td style="text-align: left;">${period}</td>
//         <td style="text-align: center;"><a href="/cfb/year/${play.season}/team/${play.pos_team}"><img class="img-fluid team-logo-${play.pos_team}" width="35px" src="https://a.espncdn.com/i/teamlogos/ncaa/500/${play.pos_team}.png" alt="ESPN team id ${play.pos_team}"/></a></td>
//         <td style="text-align: left;">(${formatDistance(play.start.down, play.type.text, play.start.distance, play.start.yardsToEndzone)} at ${ formatYardline(play.start.yardsToEndzone, cleanAbbreviation(offense), cleanAbbreviation(defense)) }) ${play.text}${scoreText}</td>
//         <td class="numeral" style="text-align: center;">${roundNumber(parseFloat(play.expectedPoints.added.toString()), 2, 2)}</td>
//         <td class="numeral" style="text-align: center;">${roundNumber(parseFloat(play.winProbability.before) * 100, 3, 1)}%</td>
//         <td class="numeral" style="text-align: right;">${roundNumber(parseFloat(play.winProbability.added) * 100, 3, 1)}%</td>
//     </tr>`;
//     if (canCollapse) {
//         baseRow += `<tr>
//             <td colspan="6" class="hiddenRow">
//                 <div class="accordian-body collapse" id="play-${collapsePrefix}-${play.game_play_number}">
//                     <div class="row p-1">`;
//         if (![null, true, false].includes(expandingRowCallback)) {
//             baseRow += expandingRowCallback(play);
//         } else {
//             baseRow += `
//             <div class="ms-sm-auto col-lg-6">
//                 <p style="text-align: center;"><strong>Play Type:</strong> ${play.type.text}</p>
//                 <p style="text-align: center;"><strong>Yards to End Zone (Before -> After):</strong> ${play.start.yardsToEndzone} -> ${play.end.yardsToEndzone}</p>
//                 <p style="text-align: center;"><strong>Started Drive at:</strong> ${formatYardline(play.drive_start, cleanAbbreviation(offense),cleanAbbreviation(defense))}</p>
//                 <p style="text-align: center;"><strong>ExpPts (After - Before = Added):</strong> ${roundNumber(parseFloat(play.expectedPoints.after), 2, 2)} - ${roundNumber(parseFloat(play.expectedPoints.before), 2, 2)} = ${roundNumber(parseFloat(play.expectedPoints.added), 2, 2)}</p>
//                 <p style="text-align: center;"><strong>Score Difference (Before):</strong> ${play.start.pos_score_diff} (${roundNumber(parseFloat(play.start.ExpScoreDiff), 2, 2)})</p>
//                 <p style="text-align: center;"><strong>Score Difference (End):</strong> ${play.end.pos_score_diff} (${roundNumber(parseFloat(play.end.ExpScoreDiff), 2, 2)})</p>
//                 <p style="text-align: center;"><strong>Change of Possession:</strong> ${play.change_of_poss}</p>
//             </div>
//             <div class="ms-sm-auto col-lg-6">
//                 <p style="text-align: center;"><strong>Score:</strong> ${cleanAbbreviation(awayTeam)} ${play.awayScore}, ${cleanAbbreviation(homeTeam)} ${play.homeScore}</p>
//                 <p style="text-align: center;"><strong>Drive Summary:</strong> ${play.drive_play_index} play${(parseInt(play.drive_play_index) == 1) ? "" : "s"}, ${play.drive_total_yards} yards</p>
//                 <p style="text-align: center;"><strong>Win Probability (Before):</strong> ${roundNumber(parseFloat(play.winProbability.before) * 100, 3, 1)}%</p>
//                 <p style="text-align: center;"><strong>Win Probability (After):</strong> ${roundNumber(parseFloat(play.winProbability.after) * 100, 3, 1)}%</p>
//                 <p style="text-align: center;"><strong>Away Score:</strong> ${play.start.awayScore} (${play.awayScore}) <strong>Home Score:</strong> ${play.start.homeScore} (${play.homeScore})</p>
//                 <p style="text-align: center;"><strong>Pos Team Timeouts:</strong> ${play.end.posTeamTimeouts} <strong>Defense Timeouts:</strong> ${play.end.defPosTeamTimeouts}</p>
//                 ${fourthDownEval}
//             </div>
//             `;
//         }
//         baseRow += `</div>
//                 </div>
//             </td>
//         </tr>`
//     }
//     return baseRow;
// }

// function buildPlayTable(plays, prefix, expandable, errorMsg, showGuide, expandingRowCallback, homeTeam, awayTeam) {
//     if (plays == null || plays.length == 0) {
//         return `<p class="text-center text-muted">${errorMsg}</p>`;
//     }
//     let guideText = (showGuide) ? `<caption>Play shading guide:
//         <ul>
//             <li><strong>Yellow</strong> - penalty</li>
//             <li><strong>Red</strong> - turnover</li>
//             <li><strong>Green</strong> - scoring play</li>
//         </ul>
//     </caption>` : ""

//     let baseTable = `
//     <table class="table table-sm table-responsive" style="border-collapse:collapse;">
//         ${guideText}
//         <thead>
//             <tr>
//                 <th style="text-align: left;">Time</th>
//                 <th style="text-align: center;">Offense</th>
//                 <th style="text-align: left;">Play Description</th>
//                 <th style="text-align: center;">EPA</th>
//                 <th style="text-align: center;">WP%</th>
//                 <th style="text-align: right;">WPA</th>
//             </tr>
//         </thead>
//         <tbody>`;
//             plays.forEach((play: any) => {
//                 baseTable += createPlayRow(play, expandable, prefix, expandingRowCallback, homeTeam, awayTeam);
//             });
//     baseTable += `</tbody>
//     </table>`;
//     return baseTable;
// }

// export default function CFBPlayTable(
//     {   plays,
//         prefix,
//         expandable,
//         errorMsg,
//         showGuide,
//         expandingRowCallback,
//         homeTeam,
//         awayTeam
//     }:
//     {   plays: any,
//         prefix: string,
//         expandable: boolean,
//         errorMsg: string,
//         showGuide: boolean,
//         expandingRowCallback: any,
//         homeTeam: Competitor,
//         awayTeam: Competitor
//     }){
//     if (plays == null || plays.length == 0) {
//         return (<p className="text-center text-muted">{errorMsg}</p>);
//     }
//     let guideText = showGuide ? `<caption>Play shading guide:
//         <ul>
//             <li><strong>Yellow</strong> - penalty</li>
//             <li><strong>Red</strong> - turnover</li>
//             <li><strong>Green</strong> - scoring play</li>
//         </ul>
//     </caption>` : ""
//     return (
//         <>
//         <table class="table table-sm table-responsive" style="border-collapse:collapse;">
//             {guideText}
//             <thead>
//                 <tr>
//                     <th style="text-align: left;">Time</th>
//                     <th style="text-align: center;">Offense</th>
//                     <th style="text-align: left;">Play Description</th>
//                     <th style="text-align: center;">EPA</th>
//                     <th style="text-align: center;">WP%</th>
//                     <th style="text-align: right;">WPA</th>
//                 </tr>
//             </thead>
//             <tbody>

//             </tbody>
//             <div dangerouslySetInnerHTML={{__html: buildPlayTable(plays, prefix, expandable, errorMsg, showGuide, expandingRowCallback, homeTeam, awayTeam)}}></div>
//         </>
//     );
// }

export default function CFBPlayTable(){
    return (
        <div></div>
    )
}