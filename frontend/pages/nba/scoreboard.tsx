import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import useNBAScoreboardApi from '../../hooks/useNBAScoreboardApi'
// core components
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Head from 'next/head'
import { NAME, NAME_AND_DOMAIN } from '../../types/constants'
import { ScoreCard } from "../../components/ScoreCard";
import { useTable } from 'react-table'
import Button from '@material-ui/core/Button'
import Image from 'next/image'
import MBBYearSelector from '../../components/MBBYearSelector';
import MBBMonthSelector from '../../components/MBBMonthSelector';
import MBBDaySelector from '../../components/MBBDaySelector';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 300,
    [theme.breakpoints.down('xs')]: {
      width: 300,
    },
    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
    [theme.breakpoints.down('md')]: {
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
  return `https://a.espncdn.com/i/teamlogos/nba/500/${src}.png`
}
export default function NBAScoreboardPage() {
  const large = useMediaQuery('(min-width:700px)')
  const [year, setYear] = useState('2020');
  const [month, setMonth] = useState('11');
  const [day, setDay] = useState('');
  const [nbaScoreboardData] = useNBAScoreboardApi(year, month, day)

  const data = nbaScoreboardData
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
                NBA Scoreboard
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container direction={"row"} alignContent={'center'} justifyContent={'center'} spacing = {1}>
          <Grid item >
            <MBBYearSelector
                year={year}
                setYear={setYear}/>
          </Grid>
          <Grid item >
            <MBBMonthSelector
                month={month}
                setMonth={setMonth}/>
          </Grid>
          <Grid item >
            <MBBDaySelector
                day={day}
                month={month}
                year={year}
                setDay={setDay}/>
          </Grid>
        </Grid>
        <div>
        <Grid container direction={"row"} justifyContent={'space-between'}>
          {data.map((d, idx) =>(
              <Grid item xs={12} sm={6} md={4} lg={4} key={idx}>
                <ScoreCard
                  score={d}
                  noMargin={false}
                  loader={myLoader}
                  sport={'nba'}/>
              </Grid>
          ))}
        </Grid>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div>
            <p>
            <Link href="/nba">
                <a>Back</a>
            </Link>
            </p>
          </div>
        </div>

      </>
    );
  }