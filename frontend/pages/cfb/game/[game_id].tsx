import React, {useEffect, useState} from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import useRequest from '../../../libs/useRequest'
import useCFBGameApi from '../../../hooks/useCFBGameApi'
// core components
import { Footer } from "../../../components/Footer";
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

const myLoader = ({ src, width }) => {
  return `https://a.espncdn.com/i/teamlogos/ncaa/500/${src}.png?w=${width}`
}
export default function CFBGamePage() {
  const gameId =
    typeof window !== 'undefined' ? window.location.pathname.slice(1) : ''
  const [cfbGameData,cfbGameCols,cfbPlayerData,cfbPlayerCols,cfbGameHeader] = useCFBGameApi(gameId)

  const large = useMediaQuery('(min-width:700px)')
  const data = cfbGameData
  const playerData = cfbPlayerData
  const columns = cfbGameCols
  const pros = ['wnba','nba','nfl']
  const proSport = pros.includes('cfb')
  console.log(cfbGameHeader)
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

