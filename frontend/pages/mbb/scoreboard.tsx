import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import useMBBScoreboardApi from '../../hooks/useMBBScoreboardApi'
// core components
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Head from 'next/head'
import { NAME, NAME_AND_DOMAIN } from '../../types/constants'
import { ScoreCard } from "../../components/ScoreCard";
import { useTable } from 'react-table'
import Button from '@material-ui/core/Button'
import YearSelector from '../../components/YearSelector';
import MonthSelector from '../../components/MonthSelector';
import DaySelector from '../../components/DaySelector';
// import SeasonTypeSelector from '../../components/SeasonTypeSelector';

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
  return `https://a.espncdn.com/i/teamlogos/ncaa/500/${src}.png`
}
export default function MBBScoreboardPage() {
  const large = useMediaQuery('(min-width:700px)')
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const [mbbScoreboardData] = useMBBScoreboardApi(year, month, day)

  const data = mbbScoreboardData
  const acc = data.reduce((acc, x) => {
    //** console.log(x['status.type.name'] === 'STATUS_CANCELED') **//
    if(x['status.type.name'] === 'STATUS_CANCELED' || x['status.type.name'] === 'STATUS_POSTPONED') {
      return acc
    } else{
      acc.push(x)
      return acc
    }
  }, [])
  const classes = useStyles()
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
                Men's College Basketball Scoreboard
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container direction={"row"} alignContent={'center'} justifyContent={'center'} spacing = {1}>
          <Grid item >
            <YearSelector
                year={year}
                setYear={setYear}/>
          </Grid>
          <Grid item >
            <MonthSelector
                month={month}
                setMonth={setMonth}/>
          </Grid>
          <Grid item >
            <DaySelector
                day={day}
                month={month}
                year={year}
                setDay={setDay}/>
          </Grid>
          {/* <Grid item >
          <SeasonTypeSelector
                seasonType={seasonType}
                setSeasonType={setSeasonType}/>
          </Grid> */}
        </Grid>
        <div>
        <Grid container direction={"row"} justifyContent={'space-between'}>
          {acc.map((d, idx) =>(
              <Grid item xs={12} sm={6} md={4} lg={4} key={idx}>
                <ScoreCard
                  score={d}
                  noMargin={false}
                  sport={'mbb'}/>
              </Grid>
          ))}
          </Grid>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div>
            <p>
            <Link href="/mbb">
                <a>Back</a>
            </Link>
            </p>
          </div>
        </div>

      </>
    );
  }