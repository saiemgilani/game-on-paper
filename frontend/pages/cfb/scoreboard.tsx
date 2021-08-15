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
import Head from 'next/head'
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
    width: 300,
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
      width: 400,
    },
    [theme.breakpoints.up('xl')]: {
      width: 400,
    },
    height: 200,
    margin: 10,
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 35,
  },
  hscore:{
    right: 5,
    top: 58,
    padding: 5,
    fontSize: '1.1rem',
    position: 'absolute',
  },
  ascore:{
    right: 5,
    top: 18,
    padding: 5,
    fontSize: '1.1rem',
    position: 'absolute',
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
  
  const seasons = '2020'
  const [season, setSeason] = useState('2020');  
  const [cfbScoreboardData] = useCFBScoreboardApi(seasons, 1)

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
          <Grid item xs={12}>
            <Box p={5}>
              <Typography variant={large ? 'h4' : 'h6'} style={{ textAlign: 'center' }}>
                College Football Scoreboard
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <div>
          <div>
            <SeasonSelectorCFB
                season={season}
                setSeason={setSeason}
            />
          </div>
        </div>
        <div>
        
        <Grid container direction={"row"} justifyContent={'space-between'}>
        {data.map((d) =>(
            <Grid item xs={6} md = {4} lg={4} key={d}>
              <Link href={`/cfb/game/${d.id}`}>
                  <Card className={classes.card} elevation={3} style={{}}>
                      <CardContent>
                      <Typography variant={large ? 'h6' : 'h6'} color="textPrimary">{<Image loader={myLoader} src={d['away.id']} width={30} height={30}  alt={d['away.location']}/>} {d['away.location']} 
                          <Button size="small" variant="text" className={classes.hscore}>
                          {d['competitors'][1]['score']}
                          </Button>
                      </Typography>
                      <Typography variant={large ? 'h6' : 'h6'} color="textPrimary">{<Image loader={myLoader} src={d['home.id']} width={30} height={30}  alt={d['home.location']}/>} {d['home.location']} 
                          <Button size="small" variant="text" className={classes.ascore}>
                          {d['competitors'][0]['score']}
                          </Button>
                      </Typography>
                      <Box pt={3}>
                          <Button size="small" variant="text" className={classes.actions}>
                          Boxscore <ChevronRight  />
                          </Button>
                      </Box>
                      </CardContent>
                  </Card>
              </Link>
            </Grid>
        ))}
        </Grid>
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

      </>
    );
  }

