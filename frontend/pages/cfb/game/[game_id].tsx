import React, {useEffect, useState} from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import useRequest from '../../../libs/useRequest'
import useCFBGameApi from '../../../hooks/useCFBGameApi'
// core components

import { TeamBoxScore } from "../../../components/TeamBoxScore";
import { MaterialTable } from "../../../components/MaterialTable";
import { CollegeGameHeader } from "../../../components/CollegeGameHeader";
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Head from 'next/head'
import { ScoreData } from '../../../types/scores'
import { NAME } from '../../../types/constants'
import axios from 'axios';
import Card from '@material-ui/core/Card'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
type MaterialTableProps = {
    score: ScoreData
    sport: string
    rows: any
    noMargin?: boolean
  }
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    bold: {
      fontWeight: 600
    },
  });
const myLoader = ({ src, width }) => {
  return `https://a.espncdn.com/i/teamlogos/ncaa/500/${src}.png?w=${width}`
}
export default function CFBGamePage() {
  const gameId =
    typeof window !== 'undefined' ? window.location.pathname.slice(1) : ''
  const [cfbGameData, 
        cfbHomePassBox, cfbAwayPassBox,
        cfbHomeRushBox, cfbAwayRushBox,
        cfbHomeRecBox, cfbAwayRecBox,
        cfbTeamBoxData, cfbTeamBoxCols,
        cfbPlayerData,cfbPlayerCols,
        cfbGameHeader] = useCFBGameApi(gameId)

  const large = useMediaQuery('(min-width:700px)')

  const homePassRows = cfbHomePassBox
  const awayPassRows = cfbAwayPassBox
  const homeRushRows = cfbHomeRushBox
  const awayRushRows = cfbAwayRushBox
  const homeRecRows = cfbHomeRecBox
  const awayRecRows = cfbAwayRecBox
  const data = cfbTeamBoxData
  const playerData = cfbPlayerData
  const columns = cfbTeamBoxCols
  const pros = ['wnba','nba','nfl']
  const proSport = pros.includes('cfb')
  const classes = useStyles();
  console.log(cfbGameData)
  return (
      <>
        <Head>
          <title>{NAME}: Game on Paper</title>
          <meta
            name="description"
            content={`${NAME}: Game on Paper`}
          />
        </Head>
        <div style={{ textAlign: 'center' }}>
          <Grid container style={{justifyContent: 'center'}}>
              <CollegeGameHeader 
              score={cfbGameHeader}
              sport={'cfb'}
              loader={myLoader}
              />
          </Grid>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TeamBoxScore
              data={data}
              columns={columns}
              />
            </Grid>
          </Grid>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <Grid container spacing={3}>
            <Grid item xs={11}>
              <Typography variant={'h3'} align="left">{cfbGameData['homeTeamName']}</Typography>
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
                      {homePassRows.map((row) => (
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
                      {homeRushRows.map((row) => (
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
                      {homeRecRows.map((row) => (
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
            </Grid>
            <Grid item xs={11} >
              <Typography variant={'h3'} align="left">{cfbGameData['awayTeamName']}</Typography>
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
                      {awayPassRows.map((row) => (
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
                      {awayRushRows.map((row) => (
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
                      {awayRecRows.map((row) => (
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
            </Grid>
          </Grid>
        </div>
      </>
    );
  }

