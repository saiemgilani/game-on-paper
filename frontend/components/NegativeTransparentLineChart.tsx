import React, { FC, ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Box from '@material-ui/core/Box'
import Image from 'next/image'
import { ScoreData } from '../types/scores'
import Link from 'next/link'

type ScoreCardProps = {
  score: ScoreData
  loader: any
  sport: string
  noMargin?: boolean
}

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
    height: 150,
    margin: 10,
    position: 'relative',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  },
  media: {
    height: 30,
  },
  hscore:{
    right: 5,
    top: 66,
    padding: 5,
    fontSize: '1.1rem',
    position: 'absolute',
  },
  ascore:{
    right: 5,
    top: 31,
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

function date(score) {
  let dt = new Date(score['date']);
  let dtString = dt.toLocaleDateString()
  let hours = dt.getHours();
  let minutes = dt.getMinutes();
  let hrs = hours > 12 ? hours - 12 : hours;
  let mins = minutes > 10 ? minutes  : '0' + minutes;
  let ampm = hours >= 12 ? 'PM' : 'AM';
  let timeString = hrs + ':' + mins + ampm;
  return dtString + ' ' + timeString;
}
// export const ScoreCard: FC<ScoreCardProps> = ({ score,  sport, loader, noMargin }): ReactElement => {
//   const classes = useStyles()
//   const pros = ['wnba','nba','nfl']
//   const proSport = pros.includes(sport)
//   const src1 = proSport ? score['competitors'][1]['team']['abbreviation'] : score['competitors'][1]['team']['id']
//   const src2 = proSport ? score['competitors'][0]['team']['abbreviation'] : score['competitors'][0]['team']['id']
//   const gameDate = date(score)
//   return(
//     <>
//       <div>
//       </div>
//   )
// }

// export default ScoreCard
