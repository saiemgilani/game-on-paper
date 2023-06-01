import * as React from 'react';
import { CFBGamePlay, Competitor, Competition, Away, BoxScoreClass, Pass, Rush, Receiver } from '@/lib/cfb/types';

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

export default function CFBPlayerStatsTable({
    advBoxScore,
    title,
    team }: {
        advBoxScore: BoxScoreClass,
        title: string,
        team: Competitor }){

    const teamBox = {
        pass: advBoxScore.pass?.filter((row: Pass) => row.pos_team.toString() == team.id),
        rush: advBoxScore.rush?.filter((row: Rush) => row.pos_team.toString() == team.id),
        receiving: advBoxScore.receiver?.filter((row: Receiver) => row.pos_team.toString() == team.id)
    }
    teamBox.pass?.sort((a, b) => parseFloat(b.EPA.toString()) - parseFloat(a.EPA.toString()))
    teamBox.rush?.sort((a, b) => parseFloat(b.EPA.toString()) - parseFloat(a.EPA.toString()))
    teamBox.receiving?.sort((a, b) => parseFloat(b.EPA.toString()) - parseFloat(a.EPA.toString()))

    return(
        <>
        <table className="table	m-auto">
            <thead>
                <tr>
                    <th></th>
                    <th className="text-left">Stat line</th>
                    <th className="text-left">Yards/play</th>
                    <th className="text-left" title="Expected Points Added per Play">EPA/play</th>
                    <th className="text-center" title="Total Expected Points Added">EPA</th>
                    <th className="text-center" title="Success Rate">SR</th>
                    <th className="text-center" title="Win Probability Added">WPA</th>
                </tr>
            </thead>
            <tbody>
            <tr key={`dropbacks${team.id}`} className=" border-b">
                    <td colSpan={12} className="font-bold" title="Includes pass attempts and sacks.">Dropbacks</td>
            </tr>
            {teamBox.pass?.map((p: Pass, idx: any) => (
                <>
                    <tr key={idx} className=" border-b">
                        <td className="text-left">{p.passer_player_name} </td>
                        <td className="text-left">{ p.Comp +"/"+ p.Att + ", " + p.Yds + "yd"}{(Math.abs(parseFloat(p.Yds?.toString())) == 1) ? "" : "s" }{", "+ p.Pass_TD +" TD, "+ p.Int + " INT, " +
                                p.Sck+ " Sck"}{ (Math.abs(parseFloat(p.Sck.toString())) == 1) ? "" : "s" }{", "+ roundNumber(parseFloat(p.exp_qbr.toString()), 2, 1) +" xQBR, " + roundNumber(calculateDETMER(p), 2, 2) + " "}<abbr title="Stands for 'Downfield Eventful Throwing Metric Encouraging Ripping it'. Built to find the most sicko QB performances. Developed by the Moon Crew Discord & @SickosCommittee on Twitter.">DETMER</abbr></td>
                        <td className="text-center">{roundNumber(parseFloat(p.YPA.toString() || '0'), 2, 2)}</td>
                        <td className="text-center">{ roundNumber(parseFloat(p.EPA_per_Play.toString()), 2, 2) }</td>
                        <td className="text-center">{ roundNumber(parseFloat(p.EPA.toString()), 2, 2) }</td>
                        <td className="text-center">{ roundNumber(parseFloat(p.SR.toString()) * 100, 2, 0)+"%" }</td>
                        <td className="text-center">{ roundNumber(parseFloat(p.WPA.toString()) * 100, 2, 1)+"%" }</td>
                    </tr>
                </>
                ))
            }
            <tr key={`rushAttempts${team.id}`} className=" border-b">
                    <td colSpan={12}  className="font-bold" >Rush attempts</td>
            </tr>
            {teamBox.rush?.map((p: Rush, idx: any) => (
                <>
                    <tr key={idx} className=" border-b">
                        <td className="text-left">{p.rusher_player_name} </td>
                        <td className="text-left">{ p.Car + " carr"}{(parseInt(p.Car.toString()) == 1) ? "y" : "ies"}{", "+ p.Yds +" yd"}{ (Math.abs(parseFloat(p.Yds.toString())) == 1) ? "" : "s" }{", " +
                            p.Rush_TD + " TD, "+ p.Fum +" Fum ("+ p.Fum_Lost+ " lost)" }</td>
                        <td className="text-center">{roundNumber(parseFloat(p.YPC.toString() || '0'), 2, 2)}</td>
                        <td className="text-center">{ roundNumber(parseFloat(p.EPA_per_Play.toString()), 2, 2) }</td>
                        <td className="text-center">{ roundNumber(parseFloat(p.EPA.toString()), 2, 2) }</td>
                        <td className="text-center">{ roundNumber(parseFloat(p.SR.toString()) * 100, 2, 0)+"%" }</td>
                        <td className="text-center">{ roundNumber(parseFloat(p.WPA.toString()) * 100, 2, 1)+"%" }</td>
                    </tr>
                </>
                ))
            }

            <tr key={`passTargets${team.id}`} className=" border-b">
                    <td colSpan={12}  className="font-bold" >Pass targets</td>
            </tr>
            {teamBox.receiving?.map((p: Receiver, idx: any) => (
                <>
                    <tr key={idx} className=" border-b">
                        <td className="text-left">{p.receiver_player_name} </td>
                        <td className="text-left">{ p.Rec +" catch"}{ (parseInt(p.Rec.toString()) == 1) ? "" : "es" }{" ("+p.Tar+" target"}{ (parseInt(p.Tar.toString()) == 1) ? "" : "s" }{"), "+
                            p.Yds+ "yd"}{(Math.abs(parseFloat(p.Yds.toString())) == 1) ? "" : "s"}{", "+ p.Rec_TD +" TD, "+ p.Fum +" Fum ("+p.Fum_Lost +" lost)"}</td>
                        <td className="text-center">{roundNumber(parseFloat((p.YPT || 0).toString() ), 2, 2)}</td>
                        <td className="text-center">{ roundNumber(parseFloat(p.EPA_per_Play.toString()), 2, 2) }</td>
                        <td className="text-center">{ roundNumber(parseFloat(p.EPA.toString()), 2, 2) }</td>
                        <td className="text-center">{ roundNumber(parseFloat(p.SR.toString()) * 100, 2, 0)+"%" }</td>
                        <td className="text-center">{ roundNumber(parseFloat(p.WPA.toString()) * 100, 2, 1)+"%" }</td>
                    </tr>
                </>
                ))
            }
            </tbody>
        </table>
        </>
    );
}