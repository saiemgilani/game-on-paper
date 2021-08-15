import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GameCard from './GameCard';

export default class Scoreboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            games: props.games || []
        }
    }

    renderColumn(gms) {
        return (
            <Col xl={3} lg={6}>
                {gms.map(game => <GameCard key={game.id} game={game}/> )}
            </Col>
        );
    }

    render() {
        console.log("Track Scoreboard render() method");
        var slices = [];
        for (var i = 0; i < 4; i++) {
            slices.push([])
        }
        var index = 0;
        while (index < this.state.games.length) {
            slices[index % 4].push(this.state.games[index])
            index++;
        }

        let result = (this.state.games.length > 0) ? slices.map(gms => this.renderColumn(gms)) : <p className="text-center text-muted">No games scheduled today.</p>

        return (
            <Row>
                {
                    result
                }
            </Row>
        );
    }
}