import React, {useEffect, useState} from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import useRequest from '../../../libs/useRequest'
import useWNBAGameApi from '../../../hooks/useWNBAGameApi'
// core components
import { TeamBoxScore } from "../../../components/TeamBoxScore";
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Head from 'next/head'
import { NAME, NAME_AND_DOMAIN } from '../../../types/constants'


export default function WNBAGamePage() {
  const gameId = typeof window !== 'undefined' ? window.location.pathname.slice(1) : ''
  const [wnbaGameData,wnbaGameCols] = useWNBAGameApi(gameId)

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
        <Grid container>
          <Grid item xs={12}>
            <Box p={5}>
              <Typography variant={large ? 'h4' : 'h4'} style={{ textAlign: 'center' }}>Game on Paper</Typography>
            </Box>
          </Grid>
        </Grid>
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

