import React from "react";
// nodejs library that concatenates classes
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import useRequest from '../../libs/useRequest'
// core components
import { Footer } from "../../components/Footer";
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Head from 'next/head'
import { NAME, NAME_AND_DOMAIN } from '../../types/constants'



export default function LandingPage() {
  const large = useMediaQuery('(min-width:700px)')
  return (
      <>
        <Head>
          <title>Game on Paper</title>
          <meta
            name="description"
            content={`${NAME}: The Game on Paper.`}
          />
        </Head>
        <Grid container>
          <Grid item xs={12}>
            <Box p={5}>
              <Typography variant={large ? 'h4' : 'h4'} style={{ textAlign: 'center' }}>
              NFL
              </Typography>
            </Box>
          </Grid>
          </Grid>
        <div style={{ textAlign: 'center' }}>
          <div>
            <p>
            <Link href="nfl/scoreboard" >
              <Button variant="text" color="inherit">
                <SportsFootballIcon /> <Typography variant={large ? 'h6' : 'h6'} >Scoreboard</Typography>
              </Button>
            </Link>
            </p>
          </div>
        </div>

      </>
    );
  }
