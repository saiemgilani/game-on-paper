import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Competitor, Breakdown } from '@/lib/cfb/types';


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
function formatLogo(team: Competitor, season: number) {
    return (
    <>
        <Link className="inline-block dark:hidden" href={`/cfb/year/${season}/team/${team.id}`}>
            <Image className="inline-block align-middle dark:hidden" width={"35"} height={"35"} src={team.team.logos[0].href} alt={`ESPN team id ${team.id}`}/>
        </Link>
        <Link className="hidden dark:inline-block" href={`/cfb/year/${season}/team/${team.id}`}>
            <Image className="align-middle hidden dark:inline-block" width={"35"} height={"35"} src={team.team.logos[1].href} alt={`ESPN team id ${team.id}`}/>
        </Link>
    </>
    );
}

function handleRatesNew(item: string, teamInfo: any, baseKey:any, subKey: any, useSuffix: boolean, decimalPoints: number, widthPct: number) {
    let finalTeamInfo = teamInfo;
    let finalDecimalPoints = decimalPoints || 1;
    let result;

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

    function produceNumerals(valueFormatter: any, isMargin: any) {
        let teamData = finalTeamInfo;
        let result;
        if (!(baseKey in teamData)) {
            let result = <td className={`text-center w-[${widthPct}%]`}>N/A <small className="align-center opacity-[80%]"> N/A</small></td>
            return result;

        } else {
            let val = teamData[baseKey][subKey][item] || 0;
            let rank = teamData[baseKey][subKey][`${item}Rank`]
            let colorClass = null;
            let sign = "";

            if (isMargin) {
                if (val > 0) {
                    colorClass = " hulk-bg-green"
                    sign = "+"
                } else if (val < 0) {
                    colorClass = " hulk-bg-purple"
                } else {
                    colorClass = null
                }
            } else {
                colorClass = generateColorRampValue(rank, 130, 255)
            }

            let tied = rank === undefined ?  false : rank.toString().includes(".5")
            let rankString: any;
            if (rank && tied) {
                rankString = <small className="align-center opacity-[80%]"> {`T-#${roundNumber(Math.floor(parseFloat(rank)), 2, 0)}`}</small>;
            } else if (rank) {
                rankString = <small className="align-center opacity-[80%]">{`#${roundNumber(Math.floor(parseFloat(rank)), 2, 0)}`}</small>
            }

            if (colorClass) {
                result = <td className={`align-center numeral${colorClass} text-center width-[${widthPct}%] h-5`}>{`${sign}${valueFormatter(val)} `}{rankString}</td>;
            } else {
                result = <td className={`align-center numeral${colorClass} text-center width-[${widthPct}%] h-5`}>{`${sign}${valueFormatter(val)} `}{rankString}</td>;
            }
        }
        return result;

    }

    if (item.includes("startingFP")) {
        result = produceNumerals((value: any) => {
            if (baseKey.includes("differential")) {
                return `${roundNumber(parseFloat(value), 2, 0)}`;
            } else {
                let prefix = (value >= 50) ? "Own" : "Opp"
                let printedVal = (value >= 50) ? (100 - parseFloat(value)) : value
                return `${prefix} ${roundNumber(printedVal, 2, 0)}`;
            }
        }, baseKey.includes("differential"))
    } else if (item.toLocaleLowerCase().includes("epa")) {
        result = produceNumerals((value: any) => `${roundNumber(parseFloat(value), 2, 2)}`, baseKey.includes("differential"))
    } else if (item.includes("success")) {
        result = produceNumerals((value: any) => `${roundNumber(parseFloat((value * 100).toString()), 2, 1)}%`, baseKey.includes("differential"))
    } else {
        result = produceNumerals((value: any) => `${roundNumber(parseFloat(value), 2, 0)}`, baseKey.includes("differential"))
    }
    return result;
}





export default function CFBSummaryTeamStatsTable({
    breakdown,
    title,
    target,
    situation,
    team,
    awayTeam,
    homeTeam,
    showTeamLogos }: {
        breakdown: any[],
        title: string,
        target: string,
        situation: string,
        team: Competitor,
        awayTeam?: Competitor,
        homeTeam?: Competitor,
        showTeamLogos: boolean }){

    const width = (showTeamLogos && homeTeam && awayTeam) ? 33 : 50
    const columns: any = {
        offensive: {
            overall: ["totalPlays","playsPerGame","totalEPA","epaPerPlay","epaPerGame","successRate","startingFP"],
            passing: ["totalPlays","playsPerGame","totalEPA","epaPerPlay","epaPerGame","successRate"],
            rushing: ["totalPlays","playsPerGame","totalEPA","epaPerPlay","epaPerGame","successRate"]
        },
        defensive: {
            overall: ["totalPlays","playsPerGame","totalEPA","epaPerPlay","epaPerGame","successRate","startingFP"],
            passing: ["totalPlays","playsPerGame","totalEPA","epaPerPlay","epaPerGame","successRate"],
            rushing: ["totalPlays","playsPerGame","totalEPA","epaPerPlay","epaPerGame","successRate"]
        },
        differential: {
            overall: ["totalEPA","epaPerPlay","epaPerGame","successRate","startingFP"],
            passing: ["totalEPA","epaPerPlay","epaPerGame","successRate"],
            rushing: ["totalEPA","epaPerPlay","epaPerGame","successRate"]
        }
    };
    return(
        <>
    <table className="min-w-[90%] ">
        <thead>
            <tr className="h-5">
                <th className={`text-left w-[${width}%] h-5`}>{title}</th>
                <th className={`text-left w-[${width}%] h-5`}><span hidden>Value</span></th>
            </tr>
        </thead>
        <tbody>
        {columns[target][situation].map((item: any, idx: any) => (
            <tr key={idx} className="h-5 border-b">
                <td className="text-left whitespace-pre overflow-auto h-5">
                    {Object.keys(stat_key_title_mapping).includes(item) ? (stat_key_title_mapping[item]) : item }
                </td>
                    {handleRatesNew(item, breakdown[0], target, situation, false, 1, width)}

            </tr>
            ))
        }
        </tbody>
    </table>
        </>
    );
}