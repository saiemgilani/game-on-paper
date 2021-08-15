import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DateTime } from "luxon";

export default function GameCard(props) {
    let game = props.game;
    let gameDate = DateTime.fromISO(game.date);
    const gameComp = game.competitions[0];
    const homeComp = gameComp.competitors[0];
    const awayComp = gameComp.competitors[1];
    const homeTeam = homeComp.team;
    const awayTeam = awayComp.team;

    let determineGameDate = () => {
        if (game.status.type.name.includes("STATUS_SCHEDULED")) {
            return <span className="game-date">{gameDate.toLocaleString(DateTime.DATETIME_SHORT)}</span>
        } else if (game.status.type.completed == true) {
            return <><span>{game.status.type.detail} -</span> <span className="game-date">{gameDate.toLocaleString(DateTime.DATETIME_SHORT)}</span></>;
        } else {
            return game.status.type.detail;
        }
    }

    let generateTeamImg = (teamId) => {
        let url = `https://a.espncdn.com/i/teamlogos/ncaa/500/${teamId}.png`
        return <img className="img-fluid d-inline-block" width="30px" src={url} alt="ESPN team id {teamId}"/>
    }

    let formatScore = (score, winner) => {
        if (winner) {
            return <strong>{score}</strong>
        } else {
            return score
        }
    }

    let determineLastPlay = () => {
        if (!(game.status.type.completed == true || game.status.type.detail.includes("Cancel") || game.status.type.detail.includes("Postpone"))) {
            if (gameComp.situation != null && gameComp.situation.lastPlay != null) {
                var basePlay = `<p className="card-text text-muted mb-2">`;
                if (gameComp.situation.lastPlay.text.toLocaleLowerCase().includes("two-point conversion") || gameComp.situation.lastPlay.text.includes("KICK")) {
                    basePlay += `(PAT) ${gameComp.situation.lastPlay.text}`;
                } else if (gameComp.situation.lastPlay.text.toLocaleLowerCase().includes("kickoff")) {
                    basePlay += `(Kickoff) ${gameComp.situation.lastPlay.text}`;
                } else if (gameComp.situation.downDistanceText == null || (gameComp.situation.downDistanceText != null && gameComp.situation.downDistanceText.length == 0)) {
                    basePlay += `${gameComp.situation.lastPlay.text}`;
                } else {
                    basePlay += `(${gameComp.situation.downDistanceText}) ${gameComp.situation.lastPlay.text}`;
                }
                basePlay += `</p>`;
                return basePlay;
            }
        }
        return ``;
    }

    let determineIfStatsDisabled = () => {
        return (game.status.type.name.includes("STATUS_SCHEDULED") || game.status.type.detail.includes("Cancel") || game.status.type.detail.includes("Postpone")) ? "disabled" : ""
    }

    return (
        <Row className="border rounded m-2 mb-4 shadow-sm">
            <Col className="p-3">
                <strong className="d-inline-block mb-2 text-primary">
                    {determineGameDate()}
                </strong> 
                <div className="m-0 clearfix">
                    <div className="d-flex justify-content-between">
                        <div className="text-left">
                            {generateTeamImg(awayComp.id)} <span className="d-inline-block h4">{formatScore(awayTeam.abbreviation, (parseInt(awayComp.score) > parseInt(homeComp.score) && game.status.type.completed == true))}</span>
                        </div>
                        <div className="text-right">
                            <p className="h4">{ (game.status.type.name.includes("STATUS_SCHEDULED") || game.status.type.detail.includes("Cancel") || game.status.type.detail.includes("Postpone")) ? "" : formatScore(awayComp.score, (parseInt(awayComp.score) > parseInt(homeComp.score) && game.status.type.completed == true)) }</p>
                        </div>
                    </div>
                </div>
                <div className="m-0 mb-2 clearfix">
                    <div className="d-flex justify-content-between">
                        <div className="text-left">
                            {generateTeamImg(homeComp.id)} <span className="d-inline-block h4">{formatScore(homeTeam.abbreviation, (parseInt(awayComp.score) < parseInt(homeComp.score) && game.status.type.completed == true))}</span>
                        </div>
                        <div className="text-right">
                            <p className="h4">{(game.status.type.name.includes("STATUS_SCHEDULED") || game.status.type.detail.includes("Cancel") || game.status.type.detail.includes("Postpone")) ? "" : formatScore(homeComp.score, (parseInt(awayComp.score) < parseInt(homeComp.score) && game.status.type.completed == true))}</p>
                        </div>
                    </div>
                </div>
                {determineLastPlay()}
                <a className={"btn btn-sm btn-outline-primary " + determineIfStatsDisabled()} role="button" href="https://gameonpaper.com/cfb/game/{game.id}">Stats</a>
            </Col>
        </Row>
    );
}