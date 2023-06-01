import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Competitor, TeamData, Players, Breakdown, Away } from '@/lib/cfb/types';


interface StatKeyNames {
    [key: string]: string
  }
const stat_key_title_mapping: StatKeyNames =  {
    "totalPlays" : "Plays",
    "playsPerGame" : "Plays/Game",
    "totalEPA": "Total EPA",
    "epaPerPlay": "EPA/Play",
    "epaPerGame": "EPA/Game",
    "successRate": "Success Rate",
    "startingFP" : "Starting FP"
}
function roundNumber(value: any, power10: number, fixed: number) {
    return (Math.round(parseFloat(value || '0') * (Math.pow(10, power10))) / (Math.pow(10, power10))).toFixed(fixed)
}

function getNumberWithOrdinal(n: number) {
    var s = ["th", "st", "nd", "rd"];
    let v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}


const CLEAN_LIST = [61];
function cleanLocation(team: TeamData) {
    if (CLEAN_LIST.includes(parseInt(team.id))) {
        return team.location.toLocaleLowerCase()
    }
    return team.location
}
function formatLogo(team: TeamData, season: number) {
    return (
    <>
        <Link className="inline-block dark:hidden" href={`/cfb/year/${season}/team/${team.id}`}>
            <Image className="inline-block self-center dark:hidden" width={"50"} height={"50"} src={team.logos[0].href} alt={`ESPN team id ${team.id}`}/>
        </Link>
        <Link className="hidden dark:inline-block" href={`/cfb/year/${season}/team/${team.id}`}>
            <Image className="self-center hidden dark:inline-block" width={"50"} height={"50"} src={team.logos[1].href} alt={`ESPN team id ${team.id}`}/>
        </Link>
    </>
    );
}



function generateColorRampValue(input: string, max: any, midColor: any) {
    if (!input) {
        return null;
    }
    let value = (parseFloat(max) - parseFloat(input)) / parseFloat(max)
    let step = Math.round(value / 0.1)
    let clampedStep = Math.min(Math.max(step, 0), 9)

    let hex = null
    if (clampedStep == 4 || clampedStep == 5) {
        return null
    } else {
        return ` hulk-bg-level-${clampedStep}`
    }
}

function generateMarginalString(input: any, power10: number, fixed: number) {
    if (input >= 0) {
        return `+${roundNumber(input, power10, fixed)}`;
    } else {
        return roundNumber(input, power10, fixed);
    }
}



export default function CFBSummaryPlayerCard({
    breakdown,
    players,
    season,
    team,
    awayTeam,
    homeTeam}: {
        breakdown: any[],
        players: Players,
        season: number,
        team: TeamData,
        awayTeam?: Competitor,
        homeTeam?: Competitor }){


    const maxTeams = (season == 2022) ? 131 : 130;
    const isBreakdownAvailable = (breakdown[0].differential != null);
    const records = team["record"] ;
    const overallStuff = team["record"].filter(item => item["type"] == "total")[0];
    const overall = overallStuff?.displayValue || "0-0";
    const finishes = overallStuff?.stats?.filter(item => item.name == "playoffSeed") || []
    const finish = (finishes.length > 0 && finishes[0].displayValue ) ? getNumberWithOrdinal(parseInt(finishes[0].displayValue)) : 'N/A';

    var conf = ""
    let confRecs = records.filter(item => item.type == "vsconf")
    if (confRecs.length > 0) {
        conf = ` (Conf: ${confRecs[0].displayValue})`;
    } else {
        conf = ""
    }
    const logo = formatLogo(team, season);

    const CONST_PLAYER = {
        id: 4432734,
        name: 'J. Monroe',
        statline: 'test test test test test'
    }
    const types = ['passing', 'rushing', 'receiving'];
    let passing = players['passing'].filter(item => item.passer_player_name != null).filter(item => item.passer_player_name.length > 0).slice();
    passing.sort((a, b) => {
        let aVal = a.plays
        let bVal = b.plays
        return parseInt(bVal.toString()) - parseInt(aVal.toString())
    });
    let pass = passing[0];
    let rushing = players['rushing'].filter(item => item.rusher_player_name != null).filter(item => item.rusher_player_name.length > 0).slice();
    rushing.sort((a, b) => {
        let aVal = a.plays
        let bVal = b.plays
        return parseInt(bVal.toString()) - parseInt(aVal.toString())
    });
    let rush = rushing[0];
    let receiving = players['receiving'].filter(item => item.receiver_player_name != null).filter(item => item.receiver_player_name.length > 0).slice();
    receiving.sort((a, b) => {
        let aVal = a.plays
        let bVal = b.plays
        return parseInt(bVal.toString()) - parseInt(aVal.toString())
    });
    let rec = receiving[0];
    return(
        <>

            <div className="m-8 lg:m-6 xl:mg-4 my-4 max-w-2xl rounded-md overflow-hidden border hover:border-blue-100" >
                <div className="flex self-center justify-between py-2 mx-2">
                    <h2 className="text-3xl font-medium font-chivo self-center">{season} {cleanLocation(team)} Leaders</h2>
                    {logo}
                </div>
                <div className="grid grid-cols-3 mx-2">

                    <div className="grid grid-cols-1 mb-4 mx-2">
                            <p className="self-center content-center items-center text-center ">Passing</p>
                            {pass.player_id && pass.player_id.toString() !== 'NA' ?
                                (<a className="self-center justify-self-center justify-center content-center items-center" href={`https://www.espn.com/college-football/player/_/id/${pass.player_id}`}>
                                    <Image className="self-center justify-self-center justify-center content-center items-center img-circle-bg " src={`https://a.espncdn.com/combiner/i?img=/i/headshots/college-football/players/full/${pass.player_id}.png&w=150`} width={150} height={150} alt={pass.passer_player_name}/>
                                </a>):
                                (<Image className="self-center justify-self-center justify-center content-center items-center img-circle-bg " src="https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=150&scale=crop" width={150} height={150} alt={pass.passer_player_name}/>)
                            }
                            <h5 className="self-center content-center items-center  text-center ">{ pass.passer_player_name }</h5>
                            <p className="text-xs self-center content-center items-center  text-center ">{roundNumber(pass.EPAplay, 2, 2)} EPA/Play, {roundNumber(100 * (pass.comppct || 0), 2, 0)}% Comp%, {pass.yards} yd{(Math.abs(parseFloat(pass.yards?.toString() || "0")) == 1) ? "" : "s"}, {pass.passing_td} TD, {roundNumber(pass.detmer || 0, 2, 2) } DETMER</p>
                    </div>
                    <div className="grid grid-cols-1 mb-4 mx-2">
                            <p className="self-center content-center items-center text-center ">Rushing</p>
                            {rush.player_id && rush.player_id.toString() !== 'NA' ?
                                (<a className="self-center justify-self-center justify-center content-center items-center" href={`https://www.espn.com/college-football/player/_/id/${rush.player_id}`}>
                                    <Image className="self-center justify-self-center justify-center content-center items-center img-circle-bg " src={`https://a.espncdn.com/combiner/i?img=/i/headshots/college-football/players/full/${rush.player_id}.png&w=150`} width={150} height={150} alt={rush.rusher_player_name}/>
                                </a>):
                                (<Image className="self-center justify-self-center justify-center content-center items-center img-circle-bg " src="https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=150&scale=crop" width={150} height={150} alt={rush.rusher_player_name}/>)
                            }
                            <h5 className="self-center content-center items-center  text-center ">{ rush.rusher_player_name }</h5>
                            <p className="text-xs self-center content-center items-center  text-center ">{roundNumber(rush.EPAplay, 2, 2)} EPA/Play, {rush.plays} Car, {rush.yards} yd{(Math.abs(rush.yards || 0) == 1) ? "" : "s"},  {rush.rushing_td} TD </p>
                    </div>
                    <div className="grid grid-cols-1 mb-4 mx-2">
                            <p className="self-center content-center items-center text-center ">Receiving</p>
                            {rec.player_id && rec.player_id.toString() !== 'NA' ?
                                (<a className="self-center justify-self-center justify-center content-center items-center" href={`https://www.espn.com/college-football/player/_/id/${rec.player_id}`}>
                                    <Image className="self-center justify-self-center justify-center content-center items-center img-circle-bg " src={`https://a.espncdn.com/combiner/i?img=/i/headshots/college-football/players/full/${rec.player_id}.png&w=150`} width={150} height={150} alt={rec.receiver_player_name}/>
                                </a>):
                                (<Image className="self-center justify-self-center justify-center content-center items-center img-circle-bg " src="https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=150&scale=crop" width={150} height={150} alt={rec.receiver_player_name}/>)
                            }
                            <h5 className="self-center content-center items-center  text-center ">{ rec.receiver_player_name }</h5>
                            <p className="text-xs self-center content-center items-center  text-center ">{roundNumber(rec.EPAplay, 2, 2)} EPA/Play, {rec.comp} Cat ({roundNumber(100 * (rec.catchpct || 0), 2, 0)}% Catch%), {rec.yards} yd{(Math.abs(rec.yards || 0) == 1) ? "" : "s"},  {rec.passing_td} TD </p>
                    </div>
                </div>
            </div>
        </>
    );
}