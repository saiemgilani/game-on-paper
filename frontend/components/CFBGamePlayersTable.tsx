import React, { FC, ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ScoreData } from '../types/scores'
type MaterialTableProps = {
    pass: any[]
    rush: any[]
    rec: any[]
  }
  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: '95%',
      width: '100%',
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
      margin: 0,
      color: theme.palette.text.secondary,
    },
    number: {
        minWidth: '5%',
    },
    name: {
        minWidth:'10%',
    },
    statline: {
        minWidth:'40%',
    },
    bold: {
      fontWeight: 600
    },
  }));
  export const CFBGamePlayersTable: FC<MaterialTableProps> = ({ pass, rush, rec}): ReactElement => {
  const classes = useStyles();

  return (
    <div>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell className={classes.name}>
                    <Typography className={classes.bold}>Dropbacks</Typography>
                </TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>Yards/Play</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>EPA/Play</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>EPA</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>SR</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>WPA</Typography></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {pass.map((row) => (
                    <>
                        <TableRow key={row.passer_player_name}>
                            <TableCell component="th" scope="row"  className={classes.name}>
                                <Typography>{row.passer_player_name}</Typography>
                            </TableCell>
                            <TableCell align="right"  className={classes.number}><Typography>{row.YPA}</Typography></TableCell>
                            <TableCell align="right"  className={classes.number}><Typography>{row.EPA_per_Play}</Typography></TableCell>
                            <TableCell align="right"  className={classes.number}><Typography>{row.EPA}</Typography></TableCell>
                            <TableCell align="right"  className={classes.number}><Typography>{row.SR}</Typography></TableCell>
                            <TableCell align="right"  className={classes.number}><Typography>{row.WPA}</Typography></TableCell>
                        </TableRow>
                        <TableRow key={row.passer_player_name}>
                            <TableCell align="right">
                                <Typography className={classes.bold}>Stat line:</Typography>
                            </TableCell>
                            <TableCell align="left" colSpan={5}>
                                <Typography>{row.Comp+'/'+row.Att+' '+row.Yds+' yds, '+row.Pass_TD+' TD, '+row.Int+' INT, '+row.Sck+' Scks'}</Typography>
                            </TableCell>
                        </TableRow>
                    </>
                ))}
            </TableBody>
        </Table>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell className={classes.name}><Typography className={classes.bold}>Rush Attempts</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>Yards/Play</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>EPA/Play</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>EPA</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>SR</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>WPA</Typography></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {rush.map((row) => (
                    <>
                        <TableRow key={row.rusher_player_name}>
                        <TableCell component="th" scope="row"  className={classes.name}>
                            <Typography>{row.rusher_player_name}</Typography>
                        </TableCell>
                        <TableCell align="right"  className={classes.number}><Typography>{row.YPC}</Typography></TableCell>
                        <TableCell align="right"  className={classes.number}><Typography>{row.EPA_per_Play}</Typography></TableCell>
                        <TableCell align="right"  className={classes.number}><Typography>{row.EPA}</Typography></TableCell>
                        <TableCell align="right"  className={classes.number}><Typography>{row.SR}</Typography></TableCell>
                        <TableCell align="right"  className={classes.number}><Typography>{row.WPA}</Typography></TableCell>
                        </TableRow>
                        <TableRow key={row.rusher_player_name}>
                            <TableCell align="right">
                                <Typography className={classes.bold}>Stat line:</Typography>
                            </TableCell>
                            <TableCell align="left" colSpan={5}>
                                <Typography>{row.Car+' carries, '+row.Yds+' yds, '+row.Rush_TD+' TD, '+row.Fum+' Fum ('+row.Fum_Lost+' lost)'}</Typography>
                            </TableCell>
                        </TableRow>
                    </>
                ))}
            </TableBody>
        </Table>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell className={classes.name}>
                    <Typography className={classes.bold}>Pass Targets</Typography>
                </TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>Yards/Play</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>EPA/Play</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>EPA</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>SR</Typography></TableCell>
                <TableCell align="right"  className={classes.number}><Typography className={classes.bold}>WPA</Typography></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {rec.map((row) => (
                    <>
                        <TableRow key={row.receiver_player_name}>
                        <TableCell component="th" scope="row" className={classes.name}> 
                            <Typography>{row.receiver_player_name}</Typography>
                        </TableCell>
                        <TableCell align="right"  className={classes.number}><Typography>{row.YPT}</Typography></TableCell>
                        <TableCell align="right"  className={classes.number}><Typography>{row.EPA_per_Play}</Typography></TableCell>
                        <TableCell align="right"  className={classes.number}><Typography>{row.EPA}</Typography></TableCell>
                        <TableCell align="right"  className={classes.number}><Typography>{row.SR}</Typography></TableCell>
                        <TableCell align="right"  className={classes.number}><Typography>{row.WPA}</Typography></TableCell>
                        </TableRow>
                        <TableRow key={row.receiver_player_name}>
                            <TableCell align="right">
                                <Typography className={classes.bold}>Stat line:</Typography>
                            </TableCell>
                            <TableCell align="left" colSpan={5}>
                                <Typography>{row.Rec+' '+`${row.Rec > 1? 'catches':'catch'}`+' ('+row.Tar+' '+`${row.Tar > 1? 'targets), ':'target), '}`+row.Yds+' yds, '+row.Rec_TD+' TD, '+row.Fum+' Fum ('+row.Fum_Lost+' lost)'}</Typography>
                            </TableCell>
                        </TableRow>
                    </>
                ))}
            </TableBody>
        </Table>
    </div>
    );
}