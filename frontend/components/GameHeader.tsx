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
  score: any
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
    height: 200,
    margin: 10,
    position: 'relative',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  },
  img: {
    height: 30,
    display:'inline-block',
    maxHeight:'80%',
    maxWidth:'80%',
    transform: 'translateY(7.5px)',
  },
  actions: {
    right: 5,
    bottom: 5,
    padding: 5,
    position: 'absolute',
  },
}))
export const GameHeader: FC<ScoreCardProps> = ({ score,  sport, loader, noMargin }): ReactElement => {
  const classes = useStyles()
  const pros = ['wnba','nba','nfl']
  const proSport = pros.includes(sport)
  
  if (score.length === 0) {
    return <div>Still fetching data</div>;
  }
  return (
    <Grid container spacing={1} style={{alignContent:'center'}}>
        <Grid item xs={12}> 
          <Typography variant={'h6'} color="textPrimary" 
            style={{ justifyContent: 'center', 
            fontSize: '1.8rem' }} >
            <div className={classes.img}>
            <Image loader={loader} src={score[0]['team']['abbreviation']} width={35} height={35} alt={score[0]['abbreviation']}/> 
            </div>
            {score[0].team.location+'  '+score[0].score+`                         `}
            <div className={classes.img}>
            <Image loader={loader} src={score[1]['team']['abbreviation']} width={35} height={35} alt={score[1]['abbreviation']}/> 
            </div>
            {score[1].team.location+'  '+score[1].score}
          </Typography>
        </Grid>
    </Grid>
  )
}

export default GameHeader
