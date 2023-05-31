import * as React from 'react';
import { CFBGamePlay, Competitor, Competition, Away, Passing, Pass, Receiving, Rush, Receiver } from '@/lib/cfb/types';

function roundNumber(value: any, power10: number, fixed: number) {
    return (Math.round(parseFloat(value || '0') * (Math.pow(10, power10))) / (Math.pow(10, power10))).toFixed(fixed)
}
function calculateDETMER(boxScore: Pass) {
    // yds/(400#games) (TD+INT)/(1+|TD-INT|)
    return (parseFloat(boxScore.Yds.toString()) / 400) * ((parseFloat(boxScore.Pass_TD.toString()) + parseFloat(boxScore.Int.toString())) / (1 + Math.abs(parseFloat(boxScore.Pass_TD.toString()) - parseFloat(boxScore.Int.toString()))))
}
function injectDetmerSpan() {
    return <abbr title="Stands for 'Downfield Eventful Throwing Metric Encouraging Ripping it'. Built to find the most sicko QB performances. Developed by the Moon Crew Discord & @SickosCommittee on Twitter.">DETMER</abbr>;
}

function playerHeaderCallback() {
    return (
        <>
            <th ></th>
            <th className="box-heading text-center;">Comp/Att</th>
            <th className="box-heading text-center;">Yds</th>
            <th className="box-heading text-center;">TD</th>
            <th className="box-heading text-center;">INT</th>
            <th className="box-heading text-center;">Sacks</th>
            <th className="box-heading text-center;">{injectDetmerSpan()}</th>
            <th className="box-heading text-center;" title="Includes sacks, sack yards, and all pass attempts.">Yds/dropback</th>
            <th className="box-heading text-center;" title="Expected Points Added per Dropback">EPA/dropback</th>
            <th className="box-heading text-center;" title="Total Expected Points Added">EPA</th>
            <th className="box-heading text-center;" title="Success Rate">SR</th>
        </>
    )
}

function playerRowCallback(p: any) {
    let compPct = parseInt(p.att) == 0 ? 0 : (parseFloat(p.comp) / parseFloat(p.att))
    return (
    <>
        <td className="text-left;">{ p.passer_player_name }</td>
        <td className="numeral text-center">{`${ p.comp }/${ p.att }`} ({`${roundNumber(compPct * 100, 2, 0)}`}% Comp)</td>
        <td className="numeral text-center">{ p.yards }</td>
        <td className="numeral text-center">{ p.touchdowns }</td>
        <td className="numeral text-center">{ p.pass_int }</td>
        <td className="numeral text-center">{ p.sacked }</td>
        <td className="numeral text-center">{ roundNumber(parseFloat(p.detmer || 0), 2, 2) }</td>
        <td className="numeral text-center">{ roundNumber(parseFloat(p.yardsdropback || 0), 2, 2) }</td>
        <td className="numeral text-center">{ roundNumber(parseFloat(p.EPAplay), 2, 2) }</td>
        <td className="numeral text-center">{ roundNumber(parseFloat(p.TEPA), 2, 2) }</td>
        <td className="numeral text-center">{ roundNumber(parseFloat(p.success) * 100, 2, 0) }%</td>
    </>
    )
}

function passerPlayerHeaderCallback() {
    return (
        <>
            <th ></th>
            <th className="box-heading text-center;">Comp/Att</th>
            <th className="box-heading text-center;">Yds</th>
            <th className="box-heading text-center;">TD</th>
            <th className="box-heading text-center;">INT</th>
            <th className="box-heading text-center;">Sacks</th>
            <th className="box-heading text-center;">{injectDetmerSpan()}</th>
            <th className="box-heading text-center;" title="Includes sacks, sack yards, and all pass attempts.">Yds/dropback</th>
            <th className="box-heading text-center;" title="Expected Points Added per Dropback">EPA/dropback</th>
            <th className="box-heading text-center;" title="Total Expected Points Added">EPA</th>
            <th className="box-heading text-center;" title="Success Rate">SR</th>
        </>
    )
}

function passerPlayerRowCallback(p: any) {
    let compPct = parseInt(p.att) == 0 ? 0 : (parseFloat(p.comp) / parseFloat(p.att))
    return (
    <>
        <td className="text-left">{ p.passer_player_name }</td>
        <td className="numeral text-center">{`${ p.comp }/${ p.att }`} ({`${roundNumber(compPct * 100, 2, 0)}`}% Comp)</td>
        <td className="numeral text-center">{ p.yards }</td>
        <td className="numeral text-center">{ p.touchdowns }</td>
        <td className="numeral text-center">{ p.pass_int }</td>
        <td className="numeral text-center">{ p.sacked }</td>
        <td className="numeral text-center">{ roundNumber(parseFloat(p.detmer || 0), 2, 2) }</td>
        <td className="numeral text-center">{ roundNumber(parseFloat(p.yardsdropback || 0), 2, 2) }</td>
        <td className="numeral text-center">{ roundNumber(parseFloat(p.EPAplay), 2, 2) }</td>
        <td className="numeral text-center">{ roundNumber(parseFloat(p.TEPA), 2, 2) }</td>
        <td className="numeral text-center">{ roundNumber(parseFloat(p.success) * 100, 2, 0) }%</td>
    </>
    )
}

function rusherPlayerHeaderCallback() {
    return (
    <>
    <th ></th>
    <th className="box-heading text-center">Carries</th>
    <th className="box-heading text-center">Yds</th>
    <th className="box-heading text-center">TD</th>
    <th className="box-heading text-center">Fum</th>
    <th className="box-heading text-center">Yds/rush</th>
    <th className="box-heading text-center" title="Expected Points Added per Rush">EPA/rush</th>
    <th className="box-heading text-center" title="Total Expected Points Added">EPA</th>
    <th className="box-heading text-center" title="Success Rate">SR</th>
    </>
    )
}
function rusherPlayerRowCallback(p: any){
   return (
    <>
    <td className="text-left">{ p.rusher_player_name }</td>
    <td className="numeral text-center">{ p.plays }</td>
    <td className="numeral text-center">{ p.yards }</td>
    <td className="numeral text-center">{ p.rushing_td }</td>
    <td className="numeral text-center">{ p.fumbles }</td>
    <td className="numeral text-center">{ roundNumber(parseFloat(p.yardsplay || 0), 2, 2) }</td>
    <td className="numeral text-center">{ roundNumber(parseFloat(p.EPAplay), 2, 2) }</td>
    <td className="numeral text-center">{ roundNumber(parseFloat(p.TEPA), 2, 2) }</td>
    <td className="numeral text-center">{ roundNumber(parseFloat(p.success) * 100, 2, 0) }%</td>
    </>
    )
}

function receiverPlayerHeaderCallback() {
    return (
    <>
    <th></th>
    <th className="text-center">Catches</th>
    <th className="text-center">Targets</th>
    <th className="text-center">Catch Rate</th>
    <th className="text-center">Yds</th>
    <th className="text-center">TD</th>
    <th className="text-center">Fum</th>
    <th className="text-center">Yds/play</th>
    <th className="text-center" title="Expected Points Added per Play">EPA/play</th>
    <th className="text-center" title="Total Expected Points Added">EPA</th>
    <th className="text-center" title="Success Rate">SR</th>
    </>
    )
}
function receiverPlayerRowCallback(p: any) {
   return (
    <>
        <td className="text-left">{ p.receiver_player_name }</td>
        <td className="text-center">{ p.comp }</td>
        <td className="text-center">{ p.targets }</td>
        <td className="text-center">{roundNumber(parseFloat(p.catchpct) * 100, 2, 0)}%</td>
        <td className="text-center">{ p.yards }</td>
        <td className="text-center">{ p.passing_td }</td>
        <td className="text-center">{ p.fumbles }</td>
        <td className="text-center">{ roundNumber(parseFloat(p.yardsplay || 0), 2, 2) }</td>
        <td className="text-center">{ roundNumber(parseFloat(p.EPAplay), 2, 2) }</td>
        <td className="text-center">{ roundNumber(parseFloat(p.TEPA), 2, 2) }</td>
        <td className="text-center">{ roundNumber(parseFloat(p.success) * 100, 2, 0) }%</td>
    </>
   )
}

export default function CFBSummaryPlayerStatsTable({
    players, type }: {
        players: Passing[] | Receiving[], type : string}){

    // console.log(players)
    players.sort((a: any, b: any) => parseFloat(b.plays) - parseFloat(a.plays))
    let headerCallback: any;
    let rowCallback: any;
    if (type == "passing") {
        headerCallback = passerPlayerHeaderCallback
        rowCallback = passerPlayerRowCallback
    } else if (type == "receiving") {
        headerCallback = receiverPlayerHeaderCallback
        rowCallback = receiverPlayerRowCallback
    } else if (type == "rushing") {
        headerCallback = rusherPlayerHeaderCallback
        rowCallback = rusherPlayerRowCallback
    }
    return(
        <>
            <table className="whitespace-pre min-w-[90%] lg:min-w-[90%]">
                <thead>
                    <tr>
                    { headerCallback() }
                    </tr>
                </thead>
                <tbody>
                { players.map((p: any, idx: any) => (

                            <tr key={idx} className={"border-b"}>
                                 { rowCallback(p) }
                            </tr>
                           ) )

                }
                </tbody>
            </table>
        </>
    );
}