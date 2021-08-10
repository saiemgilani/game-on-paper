import React from "react";
import { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import useRequest from '../../libs/useRequest'
import useCFBScoreboardApi from '../../hooks/useCFBScoreboardApi'
// core components
import { Footer } from "../../components/Footer";
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Parallax from "../../components/Parallax/Parallax.js";
import Head from 'next/head'
import styles from '../../styles/Shared.module.css'
import { NAME, NAME_AND_DOMAIN } from '../../types/constants'
import { ScoreCard } from "../../components/ScoreCard";
import { useTable } from 'react-table'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Image from 'next/image'
import SeasonSelectorCFB from '../../components/SeasonSelectorCFB';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 400,
    [theme.breakpoints.down('md')]: {
      width: 300,
    },
    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
    [theme.breakpoints.down('xs')]: {
      width: 300,
    },
    [theme.breakpoints.up('lg')]: {
      width: 200,
    },
    [theme.breakpoints.up('xl')]: {
      width: 200,
    },
    height: 200,
    margin: 10,
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.secondary,
  },
  media: {
    height: 35,
  },
  actions: {
    right: 5,
    bottom: 5,
    padding: 5,
    position: 'absolute',
  },
}))
const myLoader = ({ src }) => {
  return `https://a.espncdn.com/i/teamlogos/ncaa/500/${src}.png`
}
export default function LandingPage() {
  const large = useMediaQuery('(min-width:700px)')
  
  
  const [season, setSeason] = useState('2020');  
  const [cfbScoreboardData] = useCFBScoreboardApi({season})

  const data = cfbScoreboardData
  const classes = useStyles()
  console.log(data)
  return (
      <>
        <Head>
          <title>Game on Paper</title>
          <meta
            name="description"
            content={`${NAME}: Game on Paper.`}
          />
        </Head>
        <Grid container>
          <Grid item xs={12} className={styles.headings}>
            <Box p={5}>
              <Typography variant={large ? 'h4' : 'h6'}>
                College Football Scoreboard
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <div className={classNames(styles.main, styles.mainRaised)}>
          <div className={styles.headings}>
            <SeasonSelectorCFB
                season={season}
                setSeason={setSeason}
            />
          </div>
        </div>
        <div>
        {data.map((d) =>(
            <Link href={`/cfb/game/${d.id}`}>
                <Card className={classes.card} elevation={3} style={{}}>
                    <CardContent>
                    <Typography variant="body1" color="textPrimary" component="p">
                        {<Image loader={myLoader} src={d['away.id']} width={30} height={30} />} {d['away.location']} 
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        {<Image loader={myLoader} src={d['home.id']} width={30} height={30} />} {d['home.location']}
                    </Typography>
                    <Box pt={3}>
                        <Button size="small" variant="text" className={classes.actions}>
                        Boxscore <ChevronRight  />
                        </Button>
                    </Box>
                    </CardContent>
                </Card>
            </Link>
        ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <div>
            <p>
            <Link href="/cfb">
                <a>Back</a>
            </Link>
            </p>
          </div>
        </div>
        <Footer />

      </>
    );
  }

