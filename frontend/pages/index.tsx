import React from "react";
// nodejs library that concatenates classes
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import { Footer } from "../components/Footer";
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Head from 'next/head'
import { NAME, NAME_AND_DOMAIN } from '../types/constants'

// Sections for this page



export default function LandingPage(props) {
  const large = useMediaQuery('(min-width:700px)')
  const { ...rest } = props;
  return (
      <>
        <Head>
          <title>{NAME}: Game on Paper</title>
          <meta
            name="description"
            content={`${NAME}: The Game on Paper.`}
          />
        </Head>
        <Grid container>
          <Grid item xs={12}>
            <Box p={5}>
              <Typography variant={large ? 'h2' : 'h3'} style={{ textAlign: 'center' }}>
                Game on Paper
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
            <Box p={5}>
              <Link href="cfb/scoreboard" >
              <Button variant="text" color="inherit">
              <SportsFootballIcon />
              <Typography variant={large ? 'h6' : 'h6'} >College Football</Typography>
              </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
            <Box p={5}>
              <Link href="nfl/scoreboard" >
              <Button variant="text" color="inherit">
              <SportsFootballIcon />
                <Typography variant={large ? 'h6' : 'h6'} >NFL</Typography>
              </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
            <Box p={5}>
              <Link href="mbb/scoreboard" >
              <Button variant="text" color="inherit">
              <SportsBasketballIcon />
                <Typography variant={large ? 'h6' : 'h6'} >Men's College Basketball</Typography>
              </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
            <Box p={5}>
              <Link href="nba/scoreboard" >
              <Button variant="text" color="inherit">
              <SportsBasketballIcon />
                <Typography variant={large ? 'h6' : 'h6'} >NBA</Typography>
              </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
            <Box p={5}>
              <Link href="wbb/scoreboard" >
              <Button variant="text" color="inherit">
              <SportsBasketballIcon />
                <Typography variant={large ? 'h6' : 'h6'} >Women's College Basketball</Typography>
              </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
            <Box p={5}>
              <Link href="wnba/scoreboard" >
              <Button variant="text" color="inherit">
              <SportsBasketballIcon />
                <Typography variant={large ? 'h6' : 'h6'} >WNBA</Typography>
              </Button>
              </Link>
            </Box>
          </Grid>
      </Grid>
    </>
  );
}
