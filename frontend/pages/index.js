import Head from 'next/head';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

let range = (start, end) => Array.from(Array(end + 1).keys()).slice(start); 

function SeasonSelect() {
  let [season, setSeason] = useState("Choose Season...")

  let handleSeasonChange = (e) => {
    setSeason(e.target.value)
    console.log(e.target.value)
  }

  let yrRange = range(2002, 2021).reverse();
  console.log(yrRange)
  return (
    <Form.Select size="lg" id="yearSelect" onChange={handleSeasonChange}>
        <option value="-1">Choose Season...</option>
        {yrRange.forEach((yr) => <option value={yr}>{yr}</option>)}
    </Form.Select>
  );
}

function WeekSelect() {
  let [week, setWeek] = useState("Choose Week...")

  let handleWeekChange = (e) => {
    setWeek(e.target.value)
    console.log(e.target.value)
  }

  let weekRange = range(1, 15);
  console.log(weekRange)
  return (
    <Form.Select size="lg" id="weekSelect" onChange={handleWeekChange}>
        <option value="-1">Choose Week...</option>
        {weekRange.forEach((wk) => <option value={wk}>{wk}</option>)}
    </Form.Select>
  );
}

export default function Home() {

  let handleIDSubmit = (e) => {
    e.preventDefault()
    let gameId = e.target[0].value;
    console.log(gameId)
    window.location.href = `https://gameonpaper.com/cfb/game/${gameId}`
  }

  return (
    <div className="container">
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
                <Form id="game-id-form" onSubmit={handleIDSubmit}>
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
        <Form id="dropdown-form" className="gx-3 row-cols-sm-auto mb-3 align-items-center form-picker">
          <Row>
            <Col xs="auto" className="mb-xs-3 mb-sm-0">
              <SeasonSelect />
            </Col>
            <Col xs="auto" className="mb-xs-3 mb-sm-0">
              <WeekSelect />
            </Col>
            <Col xs="auto" className="mb-xs-3 mb-sm-0">
              <Button size="lg" variant="primary" type="submit">
                View
              </Button>
            </Col>
          </Row>
        </Form>
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
    </div>
  )
}
