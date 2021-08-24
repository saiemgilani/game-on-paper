import React, {useEffect, useState} from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import useRequest from '../../../libs/useRequest'
import useWNBAGameApi from '../../../hooks/useWNBAGameApi'
// core components
import { TeamBoxScore } from "../../../components/TeamBoxScore";
import { GameHeader } from "../../../components/GameHeader";
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Head from 'next/head'
import { NAME, NAME_AND_DOMAIN } from '../../../types/constants'


const myLoader = ({ src, width}) => {
  return `https://a.espncdn.com/i/teamlogos/wnba/500/${src}.png?w=${width}`
}
export default function WNBAGamePage() {
  const gameId = typeof window !== 'undefined' ? window.location.pathname.slice(1) : ''
  const [wnbaGameData,wnbaGameCols,wnbaGameHeader] = useWNBAGameApi(gameId)

  const large = useMediaQuery('(min-width:700px)')
  const data = wnbaGameData
  const columns = wnbaGameCols

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
                score={wnbaGameHeader}
                sport={'wnba'}
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

