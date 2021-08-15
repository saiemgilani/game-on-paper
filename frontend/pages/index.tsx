import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Link from 'next/link'
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
              <Typography variant={large ? 'h2' : 'h4'} style={{ textAlign: 'center' }}>Game on Paper</Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Grid container>
          <Grid item xs={12}>
            <Box p={5}>
              <Link href="cfb/scoreboard" >
                <a><Typography variant={large ? 'h2' : 'h4'} style={{ textAlign: 'center' }}>Scoreboard</Typography></a>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box p={5}>
              <Typography variant={large ? 'h2' : 'h4'} style={{ textAlign: 'center' }}>Game on Paper</Typography>
            </Box>
          </Grid>
        </Grid>
    </>
  );
}
