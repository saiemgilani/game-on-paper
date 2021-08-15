import Head from 'next/head';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import SeasonSelect from '../components/SeasonSelect';
import dynamic from 'next/dynamic';
const Scoreboard = dynamic(
  () => import('../components/Scoreboard'),
  { loading: () => <p>...</p> }
)
import axios from 'axios';

export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      season: props.season || 2021,
      weekComposite: props.weekComposite || "2;-1"
    }
    this.handleSeasonSelectChange = this.handleSeasonSelectChange.bind(this);
    this.handleIDSubmit = this.handleIDSubmit.bind(this);
  }

  componentDidMount() {
    this.handleGameRetrieval(this.state.season, this.state.weekComposite.split(";")[0], this.state.weekComposite.split(";")[1]).then(data => {
      this.setState({
        games: data
      })
    })
  }

  async handleGameRetrieval(season, seasonType, week) {
    try {
      const baseUrl = 'https://cdn.espn.com/core/college-football/schedule';

        const params = {
            year: season,
            week: week > 0 ? parseInt(week) : 1,
            group: 80,
            seasontype: seasonType || 2,
            xhr: 1,
            render: 'false',
            userab: 18
        }

        console.log("making request to espn with params: " + JSON.stringify(params))

        const res = await axios.get(baseUrl, {
            params
        });
        let espnContent = res.data;
        if (espnContent == null) {
            throw Error(`Data not available for ESPN's schedule endpoint.`)
        }

        if (typeof espnContent == 'str' && espnContent.toLocaleLowerCase().includes("<html>")) {
            throw Error("Data returned from ESPN was HTML file, not valid JSON.")
        }

        var result = []
        // console.log(espnContent)
        Object.entries(espnContent.content.schedule).forEach(([date, schedule]) => {
            if (schedule != null && schedule.games != null) {
                result = result.concat(schedule.games)
            }
        })
        return result
    } catch(err) {
      console.error(err)
    }
    return []
  }

  handleIDSubmit(e) {
    e.preventDefault()
    let gameId = e.target[0].value;
    console.log(gameId)
    window.location.href = `https://gameonpaper.com/cfb/game/${gameId}`
  }

  handleSeasonSelectChange(szn, sznType, wk) {
    this.setState({
      season: szn,
      weekComposite: `${sznType};${wk}`
    }, async () => {
      console.log(`${this.state.season}, Week Composite ${this.state.weekComposite}`)
      let gameData = await this.handleGameRetrieval(this.state.season, this.state.weekComposite.split(";")[0], this.state.weekComposite.split(";")[1])
      console.log(`Found ${gameData.length} games to update`)
      this.setState({
        games: gameData
      })
      // // window.location.href = `https://gameonpaper.com/cfb/year/${this.state.season}/type/${sznType}/week/${wk}`
    })
  }

  render() {
    console.log("Track Home render() method");
    return (
      <Container>
        <Head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>College Football | Game on Paper</title>
        </Head>
  
        <main>
          <Row className="text-center mb-3">
              <Col className="form-signin">
                  <h1 className="title mb-3">
                    <a href="https://gameonpaper.com">Game On Paper</a>
                  </h1>
                  <Form id="game-id-form" onSubmit={this.handleIDSubmit}>
                    <FloatingLabel controlId="inputGameId" className="visually-hidden">Game ID</FloatingLabel>
                    <Form.Control id="inputGameId" className="mb-3" size="lg" type="text" placeholder="Provide a valid ESPN Game ID for a CFB game" required/>
                    <Button variant="primary" type="submit">
                      View Stats
                    </Button>
                  </Form>
              </Col>
          </Row>
          <Row className="mb-1">
              <h3 className="text-center"> -- OR -- </h3>
          </Row>
          <SeasonSelect season={this.state.season} week={this.state.weekComposite} callback={this.handleSeasonSelectChange}/>
          <Row>
              <hr className="mb-3"/>
          </Row>
          <Scoreboard games={this.state.games} />
        </main>
  
        <footer>
          <Row className="mb-3 text-center">
            <Col className="mt-3">
            <p>Built by <a href="https://github.com/akeaswaran/">Akshay Easwaran</a>, <a href="https://github.com/saiemgilani">Saiem Gilani</a>, and others.</p>
            <p>Contribute on <a href="https://github.com/saiemgilani/game-on-paper-app">GitHub</a>.</p>
            <a href="#">Back to top</a>
            </Col>
          </Row>
        </footer>
  
        <style jsx>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }
          
          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
  
          footer {
            width: 100%;
            border-top: 1px solid #eaeaea;
            padding-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
  
          a {
            // color: inherit;
            text-decoration: none;
          }
  
          .title a {
            color: #0070f3;
            text-decoration: none;
          }
  
          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }
  
          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }
  
          .title,
          .description {
            text-align: center;
          }
        `}</style>
      </Container>
    )
  }
}
