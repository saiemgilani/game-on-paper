import React, {useEffect, useState} from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import useRequest from '../../../libs/useRequest'
import useMBBGameApi from '../../../hooks/useMBBGameApi'
// core components
import { Footer } from "../../../components/Footer";
import { TeamBoxScore } from "../../../components/TeamBoxScore";
import { CollegeGameHeader } from "../../../components/CollegeGameHeader";
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Head from 'next/head'
import { NAME } from '../../../types/constants'
import axios from 'axios';


const myLoader = ({ src, width }) => {
  return `https://a.espncdn.com/i/teamlogos/ncaa/500/${src}.png?w=${width}`
}
export default function MBBGamePage() {
  const gameId =
    typeof window !== 'undefined' ? window.location.pathname.slice(1) : ''
    
  const [mbbGameData,mbbGameCols,mbbGameHeader] = useMBBGameApi(gameId)

  const large = useMediaQuery('(min-width:700px)')
  const data = mbbGameData
 
  const columns = mbbGameCols
  
  return (
      <>
        <Head>
          <title>{NAME}: Game on Paper</title>
          <meta
            name="description"
            content={`${NAME}: Game on Paper`}
          />
        </Head>
        <div style={{ textAlign: 'center' ,
                                  margin: '20'}}>
          <Grid container style={{justifyContent: 'center'}}>
              <CollegeGameHeader 
              score={mbbGameHeader}
              sport={'mbb'}
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

