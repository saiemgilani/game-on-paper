import React, { FC, ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { PostData } from '../types/posts'
import { Box } from '@material-ui/core'
import Link from 'next/link'
import ChevronRight from '@material-ui/icons/ChevronRight'

type ScoreCardProps = {
  score: ScoreData
  noMargin?: boolean
}

const useStyles = makeStyles((theme) => ({
  card: {
    width: 400,
    [theme.breakpoints.down('md')]: {
      width: 430,
    },
    [theme.breakpoints.down('sm')]: {
      width: 450,
    },
    [theme.breakpoints.down('xs')]: {
      width: 300,
      height: 500,
    },
    [theme.breakpoints.up('lg')]: {
      width: 410,
    },
    [theme.breakpoints.up('xl')]: {
      width: 450,
    },
    height: 430,
    margin: 'auto',
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.secondary,
  },
  media: {
    height: 35,
  },
  actions: {
    right: 20,
    bottom: 10,
    padding: 10,
    position: 'absolute',
  },
}))
export const ScoreCard: FC<ScoreCardProps> = ({ score, noMargin }): ReactElement => {
  const classes = useStyles()

  return (
    <Link href={`/cfb/game/${score.id}`}>
      <Card className={classes.card} elevation={3} style={noMargin ? { margin: 0 } : {}}>
        <CardActionArea>
          <CardMedia className={classes.media} image={`${score}`} title={score.title} />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {score.title}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {score.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ScoreCard
