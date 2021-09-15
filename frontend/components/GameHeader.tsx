import React, { FC, ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
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
    return (
      <Grid container
        spacing={1}
        style={{alignContent:'center'}}>
        <Grid item
          xs={12}>
          <Box p={5}>
            <Typography variant={'h6'}
              color="textPrimary"
              style={{ justifyContent: 'center',
              fontSize: '1.8rem' }} >
              <div>Still fetching data</div>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    )
  }
  return (
    <Grid container
      spacing={1}
      style={{alignContent:'center'}}>
      <Grid item
        xs={12}>
        <Box p={5}>
          <Typography variant={'h6'}
            color="textPrimary"
            style={{ justifyContent: 'center',
            fontSize: '1.8rem' }} >
            <div className={classes.img}>
            <Image loader={loader}
              src={score[0]['team']['abbreviation']}
              width={35} height={35}
              alt={score[0]['abbreviation']}/>
            </div>
            {score[0].team.location+'  '+score[0].score+`                         `}
            <div className={classes.img}>
            <Image loader={loader}
              src={score[1]['team']['abbreviation']}
              width={35} height={35}
              alt={score[1]['abbreviation']}/>
            </div>
            {score[1].team.location+'  '+score[1].score}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default GameHeader
