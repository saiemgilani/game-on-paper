import React, { FC, ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Box from '@material-ui/core/Box'
import Image from 'next/image'
import { ScoreData } from '../types/scores'
import Link from 'next/link'

type ScoreCardProps = {
  score: ScoreData
  loader: any
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
export const ScoreCard: FC<ScoreCardProps> = ({ score, loader, noMargin }): ReactElement => {
  const classes = useStyles()

  return (
    <Link href={`/cfb/game/${score.id}`}>
      <Card className={classes.card} elevation={3} style={{}}>
          <CardContent>
          <Typography variant={'h6'} color="textPrimary">{<Image loader={loader} src={score['away.id']} width={30} height={30}  alt={score['away.location']}/>} {score['away.location']} 
              <Button size="small" variant="text" className={classes.hscore}>
              {score['competitors'][1]['score']}
              </Button>
          </Typography>
          <Typography variant={'h6'} color="textPrimary">{<Image loader={loader} src={score['home.id']} width={30} height={30}  alt={score['home.location']}/>} {score['home.location']} 
              <Button size="small" variant="text" className={classes.ascore}>
              {score['competitors'][0]['score']}
              </Button>
          </Typography>
          <Box pt={3}>
              <Button size="small" variant="text" className={classes.actions}>
              Stats <ChevronRight  />
              </Button>
          </Box>
          </CardContent>
      </Card>
    </Link>
  )
}

export default ScoreCard
