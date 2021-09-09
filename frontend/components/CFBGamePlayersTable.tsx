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
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    bold: {
      fontWeight: 600
    },
  });

  export const CFBGamePlayersTable: FC<MaterialTableProps> = ({ pass, rush, rec}): ReactElement => {
  const classes = useStyles();

  return (
    <div>
    <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell></TableCell>
                <TableCell align="left"><Typography className={classes.bold}>Stat line</Typography></TableCell>
                <TableCell align="right"><Typography className={classes.bold}>Yards/Play</Typography></TableCell>
                <TableCell align="right"><Typography className={classes.bold}>EPA/Play</Typography></TableCell>
                <TableCell align="right"><Typography className={classes.bold}>EPA</Typography></TableCell>
                <TableCell align="right"><Typography className={classes.bold}>SR</Typography></TableCell>
                <TableCell align="right"><Typography className={classes.bold}>WPA</Typography></TableCell>
            </TableRow>
            </TableHead>
            <TableHead>
            <TableRow>
                <TableCell><Typography className={classes.bold}>Dropbacks</Typography></TableCell>
                <TableCell align="left"><Typography></Typography></TableCell>
                <TableCell align="right"><Typography></Typography></TableCell>
                <TableCell align="right"><Typography></Typography></TableCell>
                <TableCell align="right"><Typography></Typography></TableCell>
                <TableCell align="right"><Typography></Typography></TableCell>
                <TableCell align="right"><Typography></Typography></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {pass.map((row) => (
                    <TableRow key={row.passer_player_name}>
                    <TableCell component="th" scope="row">
                        <Typography>{row.passer_player_name}</Typography>
                    </TableCell>
                    <TableCell align="left">
                    <Typography>{row.Comp+'/'+row.Att+' '+row.Yds+' yds, '+row.Pass_TD+' TD, '+row.Int+' INT, '+row.Sck+' Scks'}</Typography>
                    </TableCell>
                    <TableCell align="right"><Typography>{row.YPA}</Typography></TableCell>
                    <TableCell align="right"><Typography>{row.EPA_per_Play}</Typography></TableCell>
                    <TableCell align="right"><Typography>{row.EPA}</Typography></TableCell>
                    <TableCell align="right"><Typography>{row.SR}</Typography></TableCell>
                    <TableCell align="right"><Typography>{row.WPA}</Typography></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell><Typography className={classes.bold}>Rush Attempts</Typography></TableCell>
                <TableCell align="left"><Typography></Typography></TableCell>
                <TableCell align="right"><Typography></Typography></TableCell>
                <TableCell align="right"><Typography></Typography></TableCell>
                <TableCell align="right"><Typography></Typography></TableCell>
                <TableCell align="right"><Typography></Typography></TableCell>
                <TableCell align="right"><Typography></Typography></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {rush.map((row) => (
                    <TableRow key={row.rusher_player_name}>
                    <TableCell component="th" scope="row">
                    <Typography>{row.rusher_player_name}</Typography>
                    </TableCell>
                    <TableCell align="left">
                    <Typography>{row.Car+' carries, '+row.Yds+' yds, '+row.Rush_TD+' TD, '+row.Fum+' Fum ('+row.Fum_Lost+' lost)'}</Typography>
                    </TableCell>
                    <TableCell align="right"><Typography>{row.YPC}</Typography></TableCell>
                    <TableCell align="right"><Typography>{row.EPA_per_Play}</Typography></TableCell>
                    <TableCell align="right"><Typography>{row.EPA}</Typography></TableCell>
                    <TableCell align="right"><Typography>{row.SR}</Typography></TableCell>
                    <TableCell align="right"><Typography>{row.WPA}</Typography></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell><Typography className={classes.bold}>Pass Targets</Typography></TableCell>
                <TableCell align="left"><Typography></Typography></TableCell>
                <TableCell align="right"><Typography></Typography></TableCell>
                <TableCell align="right"><Typography></Typography></TableCell>
                <TableCell align="right"><Typography></Typography></TableCell>
                <TableCell align="right"><Typography></Typography></TableCell>
                <TableCell align="right"><Typography></Typography></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {rec.map((row) => (
                    <TableRow key={row.receiver_player_name}>
                    <TableCell component="th" scope="row">
                        <Typography>{row.receiver_player_name}</Typography>
                    </TableCell>
                    <TableCell align="left">
                        <Typography>{row.Rec+' '+`${row.Rec > 1? 'catches':'catch'}`+' ('+row.Tar+' '+`${row.Tar > 1? 'targets), ':'target), '}`+row.Yds+' yds, '+row.Rec_TD+' TD, '+row.Fum+' Fum ('+row.Fum_Lost+' lost)'}</Typography>
                    </TableCell>
                    <TableCell align="right"><Typography>{row.YPT}</Typography></TableCell>
                    <TableCell align="right"><Typography>{row.EPA_per_Play}</Typography></TableCell>
                    <TableCell align="right"><Typography>{row.EPA}</Typography></TableCell>
                    <TableCell align="right"><Typography>{row.SR}</Typography></TableCell>
                    <TableCell align="right"><Typography>{row.WPA}</Typography></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    
    </div>
    );
}