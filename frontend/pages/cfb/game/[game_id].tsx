import React, {useEffect, useState} from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import useRequest from '../../../libs/useRequest'
import useCFBGameApi from '../../../hooks/useCFBGameApi'
// core components

import { TeamBoxScore } from "../../../components/TeamBoxScore";
import { CFBGameTeamsTable } from "../../../components/CFBGameTeamsTable";
import { CFBGameTeamsTable2 } from "../../../components/CFBGameTeamsTable2";
import { CFBGameTeamsTable3 } from "../../../components/CFBGameTeamsTable3";
import { CFBGamePlayersTable } from "../../../components/CFBGamePlayersTable";
import { CFBGamePlays } from "../../../components/CFBGamePlays";
import { CollegeGameHeader } from "../../../components/CollegeGameHeader";
import { TeamHeader } from "../../../components/TeamHeader";
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Head from 'next/head'
import { ScoreData } from '../../../types/scores'
import { NAME } from '../../../types/constants'
import axios from 'axios';
import Image from 'next/image'
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
const useStyles = makeStyles((theme) => ({
    table: {
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
      height: 200,
      margin: 10,
      position: 'relative',
      cursor: 'pointer',
      color: theme.palette.text.secondary,
    },
    bold: {
      fontWeight: 600
    },
    card: {
      width: 300,
      [theme.breakpoints.down('xs')]: {
        width: 280,
      },
      [theme.breakpoints.down('sm')]: {
        width: 280,
      },
      [theme.breakpoints.down('md')]: {
        width: 280,
      },
      [theme.breakpoints.up('lg')]: {
        width: 300,
      },
      [theme.breakpoints.up('xl')]: {
        width: 400,
      },
      height: 200,
      margin: 10,
      position: 'relative',
      cursor: 'pointer',
      color: theme.palette.text.secondary,
    },
    media: {
      height: 30,
    },
    hscore:{
      right: 5,
      top: 58,
      padding: 5,
      fontSize: '1.1rem',
      position: 'absolute',
    },
    ascore:{
      right: 5,
      top: 18,
      padding: 5,
      fontSize: '1.1rem',
      position: 'absolute',
    },
    actions: {
      right: 5,
      bottom: 5,
      padding: 5,
      position: 'absolute',
    },
    }))
const myLoader = ({ src, width }) => {
  return `https://a.espncdn.com/i/teamlogos/ncaa/500/${src}.png?w=${width}`
}
export default function CFBGamePage() {
  const gameId =
    typeof window !== 'undefined' ? window.location.pathname.slice(1) : ''
  const [cfbGameData,
        cfbGamePlays,
        cfbGameBigPlays,
        cfbGameImportantPlays,
        cfbGameScoringPlays,
        cfbTeamOverall,
        cfbTeamScrimmage,
        cfbTeamRushing,
        cfbTeamExplosiveness,
        cfbTeamSituational,
        cfbTeamDrives, cfbTeamHavoc,
        cfbTeamTurnovers,
        cfbTeamSpecialTeams,
        cfbHomePassBox, cfbAwayPassBox,
        cfbHomeRushBox, cfbAwayRushBox,
        cfbHomeRecBox, cfbAwayRecBox,
        cfbTeamBoxData, cfbTeamBoxCols,
        cfbPlayerData, cfbPlayerCols,
        cfbGameHeader] = useCFBGameApi(gameId)

  const large = useMediaQuery('(min-width:700px)')
  const overall = cfbTeamOverall
  const plays = cfbGamePlays
  const bigPlays = cfbGameBigPlays
  const importantPlays = cfbGameImportantPlays
  const scoringPlays = cfbGameScoringPlays
  const scrimmage = cfbTeamScrimmage
  const rushing = cfbTeamRushing
  const explosiveness = cfbTeamExplosiveness
  const situational = cfbTeamSituational
  const drives = cfbTeamDrives
  const havoc = cfbTeamHavoc
  const turnovers = cfbTeamTurnovers
  const specialTeams = cfbTeamSpecialTeams
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
  console.log(cfbTeamScrimmage)
  return (
      <>
        <Head>
          <title>{NAME}: Game on Paper</title>
          <meta name="referrer" content="origin-when-cross-origin"/>
          <link rel="canonical" href={`http://gameonpaper.com/cfb/game/${gameId}`}/>
          <meta name="description" content={`Advanced stats for ${cfbGameData['awayTeamName']} vs. ${cfbGameData['homeTeamName']}`}/>
          <meta property="og:site_name" content="GameOnPaper.com"/>
          <meta property="og:url" content={`http://gameonpaper.com/cfb/game/${gameId}`}/>
          <meta property="og:title" content={'Game on Paper'}/>
          <meta property="og:description" content={`Advanced stats for ${cfbGameData['awayTeamName']} vs. ${cfbGameData['homeTeamName']}`}/>
          <meta property="og:image" content={`https://s.espncdn.com/stitcher/sports/football/college-football/events/${gameId}.png?templateId=espn.com.share.1`}/>
          <meta property="og:image:width" content="1200"/>
          <meta property="og:image:height" content="630"/>
          <meta property="og:type" content="website"/>
          <meta name="twitter:site" content="Game on Paper"/>
          <meta name="twitter:url" content={`http://gameonpaper.com/cfb/game/${gameId}`}/>
          <meta name="twitter:title" content={`${gameId}`}/>
          <meta name="twitter:description" content={`Advanced stats for ${cfbGameData['awayTeamName']} vs. ${cfbGameData['homeTeamName']}`}/>
          <meta name="twitter:card" content="summary"/>
          <meta name="title" content={'Game on Paper'}/>
          <meta name="medium" content="website"/>
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
          <Grid container
            direction="row" style={{justifyContent: 'center'}}>
            <Grid item xs={12} sm={8} md={8} lg={6} xl={4}>
              <CFBGameTeamsTable
                ovr={overall}
                scrim={scrimmage}
                rushing={rushing}
                expl={explosiveness}
                situ={situational}
                drives={drives}
                loader={myLoader}/>
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={6} xl={4}>
              <CFBGameTeamsTable2
                situ={situational}
                drives={drives}
                loader={myLoader}/>
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={6} xl={4}>
              <CFBGameTeamsTable3
                def={havoc}
                turns={turnovers}
                special={specialTeams}
                loader={myLoader}/>
            </Grid>
          </Grid>
        <div style={{ textAlign: 'center' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
                <TeamHeader
                  score={cfbGameHeader}
                  homeAway={0}
                  sport={'cfb'}
                  loader={myLoader}
                />
                <CFBGamePlayersTable pass={homePassRows} rush={homeRushRows} rec={homeRecRows}/>
            </Grid>
            <Grid item xs={12} lg={12}>
                <TeamHeader
                  score={cfbGameHeader}
                  homeAway={1}
                  sport={'cfb'}
                  loader={myLoader}
                />
                <CFBGamePlayersTable pass={awayPassRows} rush={awayRushRows} rec={awayRecRows}/>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box p={2}>
                <Typography variant={'h3'} align="left" className={classes.bold}>Most Important Plays</Typography>
              <CFBGamePlays plays={importantPlays} loader={myLoader}/>
              </Box>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box p={2}>
                <Typography variant={'h3'} align="left" className={classes.bold}>Big Plays</Typography>
              <CFBGamePlays plays={bigPlays} loader={myLoader}/>
              </Box>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box p={2}>
                <Typography variant={'h3'} align="left" className={classes.bold}>Scoring Plays</Typography>
              <CFBGamePlays plays={scoringPlays} loader={myLoader}/>
              </Box>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box p={2}>
                <Typography variant={'h3'} align="left" className={classes.bold}>All Plays</Typography>
              <CFBGamePlays plays={plays} loader={myLoader}/>
              </Box>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }

