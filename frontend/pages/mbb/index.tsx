import React from "react";
// nodejs library that concatenates classes
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import useRequest from '../../libs/useRequest'
// core components
import { Footer } from "../../components/Footer";
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Head from 'next/head'
import { NAME, NAME_AND_DOMAIN } from '../../types/constants'



export default function LandingPage() {
  const { data } = useRequest({
    url: '/api/sports'
  })
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
              <Typography variant={large ? 'h3' : 'h4'} style={{ textAlign: 'center' }}>
              Men's College Basketball
              </Typography>
            </Box>
          </Grid>
          </Grid>
        <div style={{ textAlign: 'center' }}>
          <div>
            <p>
              <Link href="mbb/scoreboard" >
                <a>Scoreboard</a>
              </Link>
            </p>
          </div>
          <div>
            {data
              ? data.map(project => (
                  <p key={project}>
                    <Link href="mbb/[year]/[game_id]" as={`/${project}`}>
                      <a>{project}</a>
                    </Link>
                  </p>
                ))
              : 'loading...'}
          </div>
        </div>

      </>
    );
  }

