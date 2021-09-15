import React, { FC, ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Image from 'next/image'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ScoreData } from '../types/scores'
type GameTeamsTableProps = {
    ovr: any[]
    scrim: any[]
    rushing: any[]
    expl: any[]
    situ: any[]
    drives: any[]
    loader: any
  }
  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 550,
      width: 700,
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
        width: 550,
      },
      [theme.breakpoints.up('xl')]: {
        width: 400,
      },
      margin: 0,
      position: 'relative',
      cursor: 'pointer',
      color: theme.palette.text.secondary,
    },
    bold: {
      fontWeight: 600
    },
  }));

  export const CFBGameTeamsTable: FC<GameTeamsTableProps> = ({ ovr, scrim, rushing, expl, situ, drives, loader }): ReactElement => {
  const classes = useStyles();
  if(ovr.length == 0 || scrim.length == 0 || rushing.length == 0 || expl.length == 0 ||
    situ.length == 0 || drives.length == 0 ){
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
    <div>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">
                        <Typography style={{ 
                            justifyContent: 'left', alignContent:'left', 
                            fontSize: '1.3rem', fontWeight: 600 }}>
                            Overall
                        </Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Image loader={loader}
                            src={`${ovr[0]['away_pos_team']}`}
                            width={35} height={35}
                            alt={`${ovr[0]['away_pos_team']}`}/>
                    </TableCell>
                    <TableCell align="right">
                        <Image loader={loader}
                            src={`${ovr[0]['home_pos_team']}`}
                            width={35} height={35}
                            alt={`${ovr[0]['home_pos_team']}`}/>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableHead>
            </TableHead>
            <TableBody>
                {ovr.map((row) => (
                    <TableRow key={row.Stat}>
                        <TableCell component="th" scope="row">
                            <Typography>{`${String(row.Stat)}`}</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography>{row.away_stat_value}</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography>{row.home_stat_value}</Typography>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">
                        <Typography style={{ 
                            justifyContent: 'left', alignContent:'left', 
                            fontSize: '1.3rem', fontWeight: 600 }}>
                            Production
                        </Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Image loader={loader}
                            src={`${scrim[0]['away_pos_team']}`}
                            width={35} height={35}
                            alt={`${scrim[0]['away_pos_team']}`}/>
                    </TableCell>
                    <TableCell align="right">
                        <Image loader={loader}
                            src={`${scrim[0]['home_pos_team']}`}
                            width={35} height={35}
                            alt={`${scrim[0]['home_pos_team']}`}/>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableHead>
            </TableHead>
            <TableBody>
                {scrim.map((row) => (
                    <TableRow key={row.Stat}>
                        <TableCell component="th" scope="row">
                            <Typography>{`${String(row.Stat)}`}</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography>{row.away_stat_value}</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography>{row.home_stat_value}</Typography>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">
                        <Typography style={{ 
                            justifyContent: 'left', alignContent:'left', 
                            fontSize: '1.3rem', fontWeight: 600 }}>
                            Rushing
                        </Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Image loader={loader}
                            src={`${rushing[0]['away_pos_team']}`}
                            width={35} height={35}
                            alt={`${rushing[0]['away_pos_team']}`}/>
                    </TableCell>
                    <TableCell align="right">
                        <Image loader={loader}
                            src={`${rushing[0]['home_pos_team']}`}
                            width={35} height={35}
                            alt={`${rushing[0]['home_pos_team']}`}/>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableHead>
            </TableHead>
            <TableBody>
                {rushing.map((row) => (
                    <TableRow key={row.Stat}>
                        <TableCell component="th" scope="row">
                            <Typography>{`${String(row.Stat)}`}</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography>{row.away_stat_value}</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography>{row.home_stat_value}</Typography>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">
                        <Typography style={{ 
                            justifyContent: 'left', alignContent:'left', 
                            fontSize: '1.3rem', fontWeight: 600 }}>
                            Explosiveness
                        </Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Image loader={loader}
                            src={`${expl[0]['away_pos_team']}`}
                            width={35} height={35}
                            alt={`${expl[0]['away_pos_team']}`}/>
                    </TableCell>
                    <TableCell align="right">
                        <Image loader={loader}
                            src={`${expl[0]['home_pos_team']}`}
                            width={35} height={35}
                            alt={`${expl[0]['home_pos_team']}`}/>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableHead>
            </TableHead>
            <TableBody>
                {expl.map((row) => (
                    <TableRow key={row.Stat}>
                        <TableCell component="th" scope="row">
                            <Typography>{`${String(row.Stat)}`}</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography>{row.away_stat_value}</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography>{row.home_stat_value}</Typography>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
    );
}