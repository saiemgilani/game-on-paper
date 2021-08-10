import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import useRequest from '../../libs/useRequest'
// core components
import { Footer } from "../../components/Footer";
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Button from "../../components/CustomButtons/Button.js";
import Parallax from "../../components/Parallax/Parallax.js";
import Head from 'next/head'
import styles from '../../styles/Shared.module.css'
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
          <Grid item xs={12} className={styles.headings}>
            <Box p={5}>
              <Typography variant={large ? 'h2' : 'h4'}>
              Game on Paper
              </Typography>
            </Box>
          </Grid>
          </Grid>
        <div className={classNames(styles.main, styles.mainRaised)}>
          <div className={styles.headings}>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div>
            <p>
              <Link href="cfb/scoreboard" >
                <a>Scoreboard</a>
              </Link>
            </p>
          </div>
          <div>
            {data
              ? data.map(project => (
                  <p key={project}>
                    <Link href="cfb/[year]/[game_id]" as={`/${project}`}>
                      <a>{project}</a>
                    </Link>
                  </p>
                ))
              : 'loading...'}
          </div>
        </div>
        <Footer />

      </>
    );
  }

