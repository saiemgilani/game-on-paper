import React, { FC, ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
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
    minWidth: '95%',
    width: '100%',
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
    height: 190,
    margin: '2%',
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
  result: {
    right: 18,
    top: 12,
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
export const ScoreCard: FC<ScoreCardProps> = ({ score,  sport, loader, noMargin }): ReactElement => {
  const classes = useStyles()
  const pros = ['wnba','nba','nfl']
  const proSport = pros.includes(sport)
  const large = useMediaQuery('(min-width:500px)')
  const src1 = proSport ? score['competitors'][1]['team']['abbreviation'] : score['competitors'][1]['team']['id']
  const src2 = proSport ? score['competitors'][0]['team']['abbreviation'] : score['competitors'][0]['team']['id']
  const gameDate = date(score)
  console.log(proSport)
  return (
      <Card className={classes.card} elevation={3} style={{}}>
        <CardContent>
          <Grid container
            direction="row"
            spacing={10}>
            <Grid item>
              <Typography variant={'caption'}
                color="textPrimary" >
                {'  '}{gameDate}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant={'caption'} className={classes.result}
                color="textPrimary" style={{ justifyContent: 'right'}} >
                {'  '}{score['status.type.state']==='post'?'Final':(score['status.type.state']==='in'? score['status.type.shortDetail']: ' ')}
              </Typography>
            </Grid>
          </Grid>
          <Grid container
            direction="row"
            spacing={1}>
            <Grid item>
              {<Image loader={loader}
                src={src1}
                width={large ? 30 : 25}
                height={large ? 30 : 25}
                alt={proSport ? score['competitors'][1]['team']['shortDisplayName']:score['competitors'][1]['team']['location']}/>}
            </Grid>
            <Grid item>
              <Typography variant={'h6'}
                color="textPrimary" >
                {'  '}{proSport ? score['competitors'][1]['team']['shortDisplayName']:score['competitors'][1]['team']['location']}
              </Typography>
            </Grid>
            <Grid item>
              <Button size="small"
                variant="text"
                className={classes.ascore}>
                {score['status.type.state']==='pre'? ' ': score['competitors'][1]['score']}
              </Button>
            </Grid>
          </Grid>
          <Grid container
            direction="row"
            spacing={1}>
            <Grid item>
              {<Image
                loader={loader}
                src={src2}
                width={large ? 30 : 25}
                height={large ? 30 : 25}
                alt={proSport? score['competitors'][0]['team']['shortDisplayName']:score['competitors'][0]['team']['location']}/>}
            </Grid>
            <Grid item>
            <Typography
              variant={'h6'}
              color="textPrimary">
              {'  '}{proSport? score['competitors'][0]['team']['shortDisplayName']:score['competitors'][0]['team']['location']}
            </Typography>
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="text"
                className={classes.hscore}>
                {score['status.type.state']==='pre'? ' ': score['competitors'][0]['score']}
              </Button>
            </Grid>
          </Grid>
          <Grid container
            direction="row"
            spacing={1}>
            <Grid item>
              <Typography variant={'caption'}
                color="textPrimary" >
                {'  '}{score['status.type.state']==='in'? (score['situation.downDistanceText'] != null ? (score['situation.downDistanceText']):'')+
                  ' '+score['situation.lastPlay.text']: ' '}
              </Typography>
            </Grid>
          </Grid>
          <Link href={`/${sport}/game/${score.id}`}>
            <Box pt={3}>
                <Button size="small" variant="text" className={classes.actions}>
                  Stats <ChevronRight  />
                </Button>
            </Box>
          </Link>
        </CardContent>
      </Card>
  )
}

export default ScoreCard
