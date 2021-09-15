import React, { FC, ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Image from 'next/image'
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ScoreData } from '../types/scores'

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
type GamePlaysProps = {
    plays: any
    loader: any
  }
  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 350,
      width: 300,
      [theme.breakpoints.down('xs')]: {
        width: 300,
      },
      [theme.breakpoints.down('sm')]: {
        width: 300,
      },
      [theme.breakpoints.down('md')]: {
        width: 300,
      },
      [theme.breakpoints.up('lg')]: {
        width: 400,
      },
      [theme.breakpoints.up('xl')]: {
        width: 400,
      },
      margin: 10,
      cursor: 'pointer',
      color: theme.palette.text.secondary,
    },
    number: {
        minWidth: 35
    },
    name: {
        minWidth:160,
    },
    text: {
        minWidth:400,
    },
    bold: {
      fontWeight: 600
    },
  }));
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
function PlayRow(play, loader, classes, canCollapse, collapsePrefix, expandingRowCallback, opn, stOpen) {
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
    var collapsibleText = (canCollapse) ? `data-bs-toggle="collapse" href="#play-${collapsePrefix}-${play.game_play_number}"` : ''
    let fourthDownLink = `https://kazink.shinyapps.io/cfb_fourth_down/?team=${play.start.pos_team.name}&pos_score=${play.start.pos_team_score}&def_pos_score=${play.start.def_pos_team_score}&pos_timeouts=${play.start.posTeamTimeouts}&def_timeouts=${play.start.defTeamTimeouts}&distance=${play.start.distance}&yards_to_goal=${play.start.yardsToEndzone}&qtr=${play.period}&minutes=${play.clock.minutes}&seconds=${play.clock.seconds}&posteam_spread=${-1 * parseFloat(play.start.posTeamSpread)}&vegas_ou=${play.overUnder}&season=${play.season}&pos_team_receives_2H_kickoff=${play.modelInputs.start.pos_team_receives_2H_kickoff}&is_home=${play.modelInputs.start.is_home}`;

    return (
        <React.Fragment>
            <TableRow key={play.game_play_number}>
                <TableCell component="th" scope="row"  className={classes.number}>
                    <Typography>{[1,2,3,4].includes(play.period)?('Q'+play.period)+' '+play.clock.displayValue:play.period + ' '+play.clock.displayValue}</Typography>
                </TableCell>
                <TableCell align="center"  className={classes.number}>
                    <Image loader={loader}
                        src={`${play.pos_team}`}
                        width={30} height={30}
                        alt={`${play.pos_team}`}/>
                </TableCell>
                <TableCell align="left"  className={classes.text}>
                    <Typography>
                        {`(${formatDistance(play.start.down, play.type.text, play.start.distance, play.start.yardsToEndzone)}`+
                        ' at '+`${formatYardline(play.start.yardsToEndzone, offenseAbbrev, defenseAbbrev)}`+') '+
                         play.text}{
                         ((play.scoringPlay == true) ? <b>{` - ${play.awayTeamAbbrev} ${play.awayScore}, ${play.homeTeamAbbrev} ${play.homeScore}`}</b> : ` - ${play.awayTeamAbbrev} ${play.awayScore}, ${play.homeTeamAbbrev} ${play.homeScore}`)
                         }
                    </Typography>
                </TableCell>
                <TableCell align="right"  className={classes.number}><Typography>{roundNumber(parseFloat(play.expectedPoints.added), 2, 2)}</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography>{roundNumber(parseFloat(play.winProbability.before), 2, 2)}</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography>{roundNumber(parseFloat(play.winProbability.added), 2, 2)}</Typography></TableCell>

                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => stOpen(!opn)}>
                        {opn ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow key={play.game_play_number}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={opn} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                            <TableRow>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            <TableRow key={play.game_play_number}>
                                <TableCell component="th" scope="row">
                                    <Typography><b>Play Type:</b> {' '+play.type.text}</Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Typography><b>Score:</b>
                                        {` ${play.awayTeamAbbrev} ${play.awayScore}, ${play.homeTeamAbbrev} ${play.homeScore}`}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography><b>{`Started Drive at:`}</b>
                                        {` ${formatYardline(play.drive_start, offenseAbbrev, defenseAbbrev)}`}
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.text}>
                                    <Typography><b>{`Drive Summary:`}</b>
                                        {` ${play.drive_play_index} plays, ${play.drive_total_yards} yards`}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.text}>
                                    <Typography><b>{`ExpPts (After - Before = Added):`}</b>
                                        {` ${roundNumber(parseFloat(play.expectedPoints.after), 2, 2)} - ${roundNumber(parseFloat(play.expectedPoints.before), 2, 2)} = ${roundNumber(parseFloat(play.expectedPoints.added), 2, 2)}`}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography><b>{`Win Probability (Before):`}</b>
                                        {` ${roundNumber(parseFloat(play.winProbability.before) * 100, 3, 1)}`}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography><b>{`Yards to End Zone (Before -> After):`}</b>
                                        {` ${play.start.yardsToEndzone} -> ${play.end.yardsToEndzone}`}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography><b>{`Win Probability (After):`}</b>
                                        {` ${roundNumber(parseFloat(play.winProbability.after) * 100, 3, 1)}`}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography><b>{`Score Difference (Before):`}</b>
                                        {` ${play.start.pos_score_diff} (${roundNumber(parseFloat(play.start.ExpScoreDiff), 2, 2)})`}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        <b>Away Score:</b> {` ${play.start.awayScore} (${play.awayScore})`}   <b>Home Score:</b> {` ${play.start.homeScore} (${play.homeScore})`}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography>
                                        <b>{`Score Difference (End):`}</b>{` ${play.end.pos_score_diff} (${roundNumber(parseFloat(play.end.ExpScoreDiff), 2, 2)})`}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        <b>{`Pos Team Timeouts:`}</b>{` ${play.end.posTeamTimeouts}`} <b>{`Def Pos Team Timeouts:`}</b>{` ${play.end.defPosTeamTimeouts}`}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography>
                                        <b>{`Change of Possession:`}</b>{` ${play.change_of_poss}`}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                  {play.start.down === 4 ? (<><Typography><b>{`Fouth Down Decision Evaluation: `}</b> <a href={`${fourthDownLink}`} target="__blank">Link</a></Typography></>):``}
                                </TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>

    )
};
//     if (canCollapse) {
//         baseRow += `<tr>
//             <td colspan="6" class="hiddenRow">
//                 <div class="accordian-body collapse" id="play-${collapsePrefix}-${play.game_play_number}"> 
//                     <div class="row p-1">`;
//         if (expandingRowCallback != null) {
//             baseRow += expandingRowCallback(play);
//         } else {
//             baseRow += `
//             <div class="ms-sm-auto col-lg-6">
//                 <p style="text-align: center;"><strong>Play Type:</strong> ${play.type.text}</p>
//                 <p style="text-align: center;"><strong>Yards to End Zone (Before -> After):</strong> ${play.start.yardsToEndzone} -> ${play.end.yardsToEndzone}</p>                
//                 <p style="text-align: center;"><strong>Started Drive at:</strong> ${formatYardline(play.drive_start, offenseAbbrev, defenseAbbrev)}</p>                
//                 <p style="text-align: center;"><strong>ExpPts (After - Before = Added):</strong> ${roundNumber(parseFloat(play.expectedPoints.after), 2, 2)} - ${roundNumber(parseFloat(play.expectedPoints.before), 2, 2)} = ${roundNumber(parseFloat(play.expectedPoints.added), 2, 2)}</p>
//                 <p style="text-align: center;"><strong>Score Difference (Before):</strong> ${play.start.pos_score_diff} (${roundNumber(parseFloat(play.start.ExpScoreDiff), 2, 2)})</p>
//                 <p style="text-align: center;"><strong>Score Difference (End):</strong> ${play.end.pos_score_diff} (${roundNumber(parseFloat(play.end.ExpScoreDiff), 2, 2)})</p>
//                 <p style="text-align: center;"><strong>Change of Possession:</strong> ${play.change_of_poss}</p>                            
//             </div>
//             <div class="ms-sm-auto col-lg-6">
//                 <p style="text-align: center;"><strong>Score:</strong> ${play.awayTeamAbbrev} ${play.awayScore}, ${play.homeTeamAbbrev} ${play.homeScore}</p>
//                 <p style="text-align: center;"><strong>Drive Summary:</strong> ${play.drive_play_index} plays, ${play.drive_total_yards} yards</p>
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
//   }
export const CFBGamePlays: FC<GamePlaysProps> = ({ plays, loader }): ReactElement => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  if(plays.length == 0 ){
      return (
      <Grid container
        spacing={1}
        style={{alignContent:'left'}}>
        <Grid item
          xs={12}>
          <Box p={5}>
            <Typography variant={'h6'}
              color="textPrimary"
              style={{ justifyContent: 'left',
                       fontSize: '1.8rem' }} >
              <div></div>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    )
  }
  
  return (
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell className={classes.number}>
                    <Typography className={classes.bold}>Time</Typography>
                </TableCell>
                <TableCell align="left" className={classes.number}><Typography className={classes.bold}>Offense</Typography></TableCell>
                <TableCell align="left"  className={classes.text}><Typography className={classes.bold}>Play Description</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>EPA</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>WP%</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>WPA</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}></Typography></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {plays.map((row) => (
                    PlayRow(row, loader, classes, true, "No plays in this game.", true, open, setOpen)
                ))}
            </TableBody>
        </Table>
    );
}