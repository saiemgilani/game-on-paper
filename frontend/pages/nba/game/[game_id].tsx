import React, {useEffect, useState} from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import useRequest from '../../../libs/useRequest'
import useNBAGameApi from '../../../hooks/useNBAGameApi'
// core components
import { Footer } from "../../../components/Footer";
import { TeamBoxScore } from "../../../components/TeamBoxScore";
import { GameHeader } from "../../../components/GameHeader";
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Head from 'next/head'
import { NAME, NAME_AND_DOMAIN } from '../../../types/constants'
import axios from 'axios';

const myLoader = ({ src, width }) => {
  return `https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/${src}.png?w=${width}`
}

export default function NBAGamePage() {
  const gameId = typeof window !== 'undefined' ? window.location.pathname.slice(1) : ''
  const [nbaGameData,nbaGameCols,nbaGameHeader] = useNBAGameApi(gameId)

  const large = useMediaQuery('(min-width:700px)')
  const data = nbaGameData
  const columns = nbaGameCols

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
              <GameHeader 
              score={nbaGameHeader}
              sport={'nba'}
              loader={myLoader}
              />
          </Grid>
        </div>
        <Grid container>
          <Grid item xs={12}>
        <div style={{ textAlign: 'center' }}>
          <TeamBoxScore
          data={data}
          columns={columns}
          />
        </div>
          </Grid>
        </Grid>
      </>
    );
  }

