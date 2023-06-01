import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Competitor, TeamData, Breakdown, Away } from '@/lib/cfb/types';


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



export default function CFBSummaryTeamCard({
    breakdown,
    season,
    team,
    awayTeam,
    homeTeam}: {
        breakdown: any[],
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
    return(
        <>

        <div className="m-8 lg:m-6 xl:mg-4 my-4 max-w-sm rounded-md overflow-hidden border hover:border-blue-100  w-[100%] h-[84%]" >
            <div className="flex self-center justify-between px-4 py-4">
                <h2 className="text-3xl font-medium font-chivo self-center">{ cleanLocation(team) }</h2>
                {logo}
            </div>
            <div className="table-responsive px-2 py-2">
                <table className="min-w-[30%] w-[100%]  px-4 py-4 mb-4">
                    <thead>
                        <tr className="h-5">

                        <th className="text-center w-[33%]">{season} Record</th>
                        <th className="text-center w-[33%]">Conf Finish</th>
                        <th className="text-center w-[33%]">EPA/Play</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="numeral text-center w-[33%]">{overall} {conf}</td>
                            <td className="numeral text-center w-[33%]">{finish}</td>
                            <td className={`numeral text-center w-[33%]  ${generateColorRampValue(breakdown[0].differential?.overall?.epaPerPlayRank, maxTeams, null)}`}>{ generateMarginalString(parseFloat(breakdown[0].differential?.overall?.epaPerPlay), 2, 2) }
                                <small className="align-center opacity-[50%]"> #{breakdown[0].differential?.overall?.epaPerPlayRank}</small>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="min-w-[30%] w-[100%] px-4 py-4 mb-4">
                    <thead>
                        <tr className="h-5">
                            <th className="text-center w-[33%]">Yards/Play</th>
                            <th className="text-center w-[33%]">AY%</th>
                            <th className="text-center w-[33%]">Success %</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={`numeral text-center w-[33%] ${generateColorRampValue(breakdown[0].differential?.overall?.yardsPerPlayRank, maxTeams, null)}`} >
                                {generateMarginalString(parseFloat(breakdown[0].differential?.overall?.yardsPerPlay), 2, 2) }
                                <small className="align-center opacity-[50%]"> #{breakdown[0].differential?.overall?.yardsPerPlayRank}</small>
                            </td>
                            <td className={`numeral text-center w-[33%] ${generateColorRampValue(breakdown[0].differential?.overall?.availableYardsPctRank, maxTeams, null)}`}>
                                {generateMarginalString(100 * parseFloat(breakdown[0].differential?.overall?.availableYardsPct), 2, 1)}%
                                <small className="align-center opacity-[50%]"> #{breakdown[0].differential?.overall?.availableYardsPctRank}</small>
                            </td>
                            <td className={`numeral text-center w-[33%] ${generateColorRampValue(breakdown[0].differential?.overall?.successRateRank, maxTeams, null)}`} >
                                {generateMarginalString(100 * parseFloat(breakdown[0].differential?.overall?.successRate), 2, 1)}
                                <small className="align-center opacity-[50%]"> #{breakdown[0].differential?.overall?.successRateRank}</small>
                            </td>
                        </tr>
                    </tbody>

                    <caption className="text-small caption-bottom">
                        <small>
                            <p className="mb-0">Stats shown as margins. AY% (available yards pct) concept from Brian Fremeau (<a href="http://bcftoys.com">http://bcftoys.com</a>).
                            </p>
                        </small>
                    </caption>
                </table>
            </div>
        </div>
        </>
    );
}