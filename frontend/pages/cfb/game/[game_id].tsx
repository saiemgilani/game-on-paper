import React, {useEffect, useState} from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import useRequest from '../../../libs/useRequest'
import useCFBGameApi from '../../../hooks/useCFBGameApi'
// core components

import { TeamBoxScore } from "../../../components/TeamBoxScore";
import { CFBGamePlayersTable } from "../../../components/CFBGamePlayersTable";
import { CollegeGameHeader } from "../../../components/CollegeGameHeader";
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
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    bold: {
      fontWeight: 600
    },
    img: {
      height: 30,
      display:'inline-block',
      maxHeight:'80%',
      maxWidth:'80%',
      transform: 'translateY(7.5px)',
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
        cfbPlayerData, cfbPlayerCols,
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
            <Grid item xs={12}>
              <Box p={2}>
                <Typography variant={'h3'} align="left">
                  {'  '+ cfbGameData['homeTeamName']}
                </Typography>
              
                <CFBGamePlayersTable pass={homePassRows} rush={homeRushRows} rec={homeRecRows}/>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box p={2}>
                
                <Typography variant={'h3'} align="left">
                  {'  '+ cfbGameData['awayTeamName']}
                </Typography>
                <CFBGamePlayersTable pass={awayPassRows} rush={awayRushRows} rec={awayRecRows}/>
              </Box>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }

