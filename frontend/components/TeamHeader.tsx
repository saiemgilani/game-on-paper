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
import Link from 'next/link'

type TeamHeaderProps = {
  score: any
  homeAway: any
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
}))
export const TeamHeader: FC<TeamHeaderProps> = ({ score, homeAway, sport, loader, noMargin }): ReactElement => {
  const classes = useStyles()
  const pros = ['wnba','nba','nfl']
  const proSport = pros.includes(sport)

  if (score.length === 0) {
    return (
      <Grid container
        spacing={1}
        style={{alignContent:'left'}}>
        <Grid item
          xs={12}>
          <Box p={5}>
            <Typography variant={'h6'}
              color="textPrimary"
              style={{ justifyContent: 'left',
                       fontSize: '1.8rem' }} >
              <div></div>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    )
  }
  return (
    <Grid container
      spacing={1}
      style={{alignContent:'left',
              justifyContent: 'left'
      }}>
      <Grid item >
        <Box p={2}>
          <Typography variant={'h6'}
                color="textPrimary"
                style={{ justifyContent: 'left',
                        alignContent:'left',
                        fontSize: '1.8rem' }} >
            <div className={classes.img}>
              <Image loader={loader}
                src={score[homeAway]['id']}
                width={35} height={35}
                alt={score[homeAway]['id']}/>
            </div>
            {score[homeAway].team.location}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}


