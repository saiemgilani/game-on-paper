import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import { useRouter } from 'next/router'
import useRequest from '../../libs/useRequest'
import useCFBScoreboardApi from '../../hooks/useCFBScoreboardApi'

// core components
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Head from 'next/head'
import { NAME } from '../../types/constants'
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
import CFBSeasonTypeSelector from '../../components/CFBSeasonTypeSelector';
import CFBWeekSelector from '../../components/CFBWeekSelector';
import CFBSeasonSelector from '../../components/CFBSeasonSelector';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    height: 30,
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
  cards: {
    paddingTop: 10,
  },
  actions: {
    right: 5,
    bottom: 5,
    padding: 5,
    position: 'absolute',
  },
}))
const myLoader = ({ src, width }) => {
  return `https://a.espncdn.com/i/teamlogos/ncaa/500/${src}.png?w=${width}`
}
export default function CFBScoreboardPage() {
  const large = useMediaQuery('(min-width:700px)')
  
  const [season, setSeason] = useState('');
  const [week, setWeek] = useState('');
  const [seasonType, setSeasonType] = useState('');
  const [cfbScoreboardData] = useCFBScoreboardApi(season, week, seasonType)

  const data = cfbScoreboardData
  const acc = data.reduce((acc, x) => {
    console.log(x['status.type.name'] === 'STATUS_CANCELED')
     if(x['status.type.name'] === 'STATUS_CANCELED' || x['status.type.name'] === 'STATUS_POSTPONED') {return acc}
     else{
       acc.push(x)
       return acc
    }
  }, [])
  const classes = useStyles()
  console.log(acc)
  return (
      <>
        <Head>
          <title>Game on Paper</title>
          <meta
            name="description"
            content={`${NAME}: Game on Paper.`}
          />
        </Head>
        <Row>
          <Col>
            <CFBSeasonSelector
              season={season}
              setSeason={setSeason}/>
          </Col>
          <Col>
            <CFBWeekSelector
              seasonType={seasonType}
              week={week}
              setWeek={setWeek}/>
          </Col>
          <Col>
            <CFBSeasonTypeSelector
              week={week}
              seasonType={seasonType}
              setSeasonType={setSeasonType}/>
          </Col>
        </Row>
        <div>
        {acc.map((d, idx) =>(
            <ScoreCard
            score={d}
            loader={myLoader}
            noMargin={false}
            sport={'cfb'}/>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
            <Link href="/cfb">Back</Link>
        </div>

      </>
    );
  }

