import React, {useEffect, useState} from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import useRequest from '../../../libs/useRequest'
import useNFLGameApi from '../../../hooks/useNFLGameApi'
// core components
import { Footer } from "../../../components/Footer";
import { TeamBoxScore } from "../../../components/TeamBoxScore";
import { GameHeader } from "../../../components/GameHeader";
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Head from 'next/head'
import { NAME } from '../../../types/constants'
import axios from 'axios';



const myLoader = ({ src, width }) => {
  return `https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/${src}.png?w=${width}`
}
export default function NFLGamePage() {
  const gameId =
    typeof window !== 'undefined' ? window.location.pathname.slice(1) : ''
  const [nflGameData,nflGameCols,nflGameHeader] = useNFLGameApi(gameId)

  const large = useMediaQuery('(min-width:700px)')
  const data = nflGameData

  const columns = nflGameCols

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
              score={nflGameHeader}
              sport={'nfl'}
              loader={myLoader}
              />
          </Grid>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Grid container>
            <Grid item xs={12}>
              <TeamBoxScore
              data={data}
              columns={columns}
              />
            </Grid>
          </Grid>
        </div>
      </>
    );
  }

