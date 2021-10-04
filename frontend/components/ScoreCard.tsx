import React, { FC, ReactElement } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { ScoreData } from '../types/scores'
import Link from 'next/link'

type ScoreCardProps = {
  score: ScoreData
  loader: any
  sport: string
  noMargin?: boolean
}

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
  const pros = ['wnba','nba','nfl']
  const proSport = pros.includes(sport)
  const large = useMediaQuery('(min-width:500px)')
  const src1 = proSport ? score['competitors'][1]['team']['abbreviation'] : score['competitors'][1]['team']['id']
  const src2 = proSport ? score['competitors'][0]['team']['abbreviation'] : score['competitors'][0]['team']['id']
  const gameDate = date(score)
  console.log(proSport)
  return (
      <Row className="border rounded m-2 mb-4 shadow-sm">
            <Col className="p-3">
                <div className="m-0 clearfix">
                    <div className="d-flex justify-content-between">
                        <div className="text-left">
                        {'  '}{gameDate}
                        </div>
                        <div className="text-right">
                        {'  '}{score['status.type.state']==='post'?'Final':(score['status.type.state']==='in'? score['status.type.shortDetail']: ' ')}
                        </div>
                    </div>
                </div>
                <div className="m-0 clearfix">
                    <div className="d-flex justify-content-between">
                        <div className="text-left">
                        {<Image src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${src1}.png?`}
                                width={large ? 30 : 25}
                                height={large ? 30 : 25}
                                alt={proSport ? score['competitors'][1]['team']['shortDisplayName']:score['competitors'][1]['team']['location']}/>
                        } 
                        <p className="h6">{'  '}{proSport ? score['competitors'][1]['team']['shortDisplayName']:score['competitors'][1]['team']['location']}</p>
                        </div>
                        <div className="text-right">
                        {score['status.type.state']==='pre'? ' ': score['competitors'][1]['score']}
                        </div>
                    </div>
                </div>
                <div className="m-0 clearfix">
                    <div className="d-flex justify-content-between">
                        <div className="text-left">
                        {<Image src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${src2}.png`}
                                width={large ? 30 : 25}
                                height={large ? 30 : 25}
                                alt={proSport ? score['competitors'][0]['team']['shortDisplayName']:score['competitors'][0]['team']['location']}/>
                        } 
                        <p className="h6">{'  '}{proSport ? score['competitors'][0]['team']['shortDisplayName']:score['competitors'][0]['team']['location']}</p>
                        </div>
                        <div className="text-right">
                        {score['status.type.state']==='pre'? ' ': score['competitors'][0]['score']}
                        </div>
                    </div>
                </div>
                {'  '}{score['status.type.state']==='in'? (score['situation.downDistanceText'] != null ? (score['situation.downDistanceText']):'')+ ' '+score['situation.lastPlay.text']: ' '}
                <Link href={`/cfb/game/${score["id"]}`}>Stats</Link>
            </Col>
        </Row>
      // <Card className={classes.card} elevation={3} style={{}}>
      //   <CardContent>
      //     <Grid container
      //       direction="row"
      //       spacing={10}>
      //       <Grid item>
      //         <Typography variant={'caption'}
      //           color="textPrimary" >
      //           {'  '}{gameDate}
      //         </Typography>
      //       </Grid>
      //       <Grid item>
      //         <Typography variant={'caption'} className={classes.result}
      //           color="textPrimary" style={{ justifyContent: 'right'}} >
      //           {'  '}{score['status.type.state']==='post'?'Final':(score['status.type.state']==='in'? score['status.type.shortDetail']: ' ')}
      //         </Typography>
      //       </Grid>
      //     </Grid>
      //     <Grid container
      //       direction="row"
      //       spacing={1}>
      //       <Grid item>
      //         {<Image loader={loader}
      //           src={src1}
      //           width={large ? 30 : 25}
      //           height={large ? 30 : 25}
      //           alt={proSport ? score['competitors'][1]['team']['shortDisplayName']:score['competitors'][1]['team']['location']}/>}
      //       </Grid>
      //       <Grid item>
      //         <Typography variant={'h6'}
      //           color="textPrimary" >
      //           {'  '}{proSport ? score['competitors'][1]['team']['shortDisplayName']:score['competitors'][1]['team']['location']}
      //         </Typography>
      //       </Grid>
      //       <Grid item>
      //         <Button size="small"
      //           variant="text"
      //           className={classes.ascore}>
      //           {score['status.type.state']==='pre'? ' ': score['competitors'][1]['score']}
      //         </Button>
      //       </Grid>
      //     </Grid>
      //     <Grid container
      //       direction="row"
      //       spacing={1}>
      //       <Grid item>
      //         {<Image
      //           loader={loader}
      //           src={src2}
      //           width={large ? 30 : 25}
      //           height={large ? 30 : 25}
      //           alt={proSport? score['competitors'][0]['team']['shortDisplayName']:score['competitors'][0]['team']['location']}/>}
      //       </Grid>
      //       <Grid item>
      //       <Typography
      //         variant={'h6'}
      //         color="textPrimary">
      //         {'  '}{proSport? score['competitors'][0]['team']['shortDisplayName']:score['competitors'][0]['team']['location']}
      //       </Typography>
      //       </Grid>
      //       <Grid item>
      //         <Button
      //           size="small"
      //           variant="text"
      //           className={classes.hscore}>
      //           {score['status.type.state']==='pre'? ' ': score['competitors'][0]['score']}
      //         </Button>
      //       </Grid>
      //     </Grid>
      //     <Grid container
      //       direction="row"
      //       spacing={1}>
      //       <Grid item>
      //         <Typography variant={'caption'}
      //           color="textPrimary" >
      //           {'  '}{score['status.type.state']==='in'? (score['situation.downDistanceText'] != null ? (score['situation.downDistanceText']):'')+
      //             ' '+score['situation.lastPlay.text']: ' '}
      //         </Typography>
      //       </Grid>
      //     </Grid>
      //     <Link href={`/${sport}/game/${score.id}`}>
      //       <Box pt={3}>
      //           <Button size="small" variant="text" className={classes.actions}>
      //             Stats <ChevronRight  />
      //           </Button>
      //       </Box>
      //     </Link>
      //   </CardContent>
      // </Card>
  )
}

export default ScoreCard
