import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import { CFBGamePlay, Competitor, Competition, Away, BoxScoreClass, BoxScoreClassFilter, Pass, Rush, Receiver } from '@/lib/cfb/types';
import AnimatedHeading from './FramerMotion/animated-heading';
import { useState, useEffect } from "react";
import { useTheme } from 'next-themes'
import styled, { keyframes } from 'styled-components';

interface StatKeyNames {
    [key: string]: string
  }
let boxScoreNonRateDecimalColumns = ["expected_turnovers","expected_turnover_margin","turnover_luck","EPA_middle_8_per_play","EPA_middle_8","EPA_middle_8_per_play","EPA_middle_8","EPA_early_down_per_play","EPA_early_down","EPA_sp","EPA_special_teams","EPA_kickoff","EPA_punt","EPA_fg","EPA_overall_off","EPA_per_play","EPA_passing_overall","EPA_passing_per_play", "EPA_rushing_overall","EPA_rushing_per_play","points_per_drive","yards_per_drive","plays_per_drive","avg_field_position","rushing_highlight_yards_per_opp","line_yards_per_carry","yards_per_rush","yards_per_pass","yards_per_play","drive_stopped_rate","EPA_non_explosive","EPA_non_explosive_passing","EPA_non_explosive_rushing","EPA_non_explosive_per_play","EPA_non_explosive_passing_per_play","EPA_non_explosive_rushing_per_play"];
let boxScoreNonRateColumns = ["EPA_plays","scrimmage_plays","expected_turnover_margin","turnover_margin","turnovers","expected_turnovers","turnover_luck","early_downs","late_downs","fumbles","INT","PD","middle_8","EPA_middle_8_per_play","EPA_middle_8","EPA_early_down_per_play","EPA_early_down","fumbles_lost","fumbles_recovered","Int","TFL","TFL_pass","TFL_rush","total_fumbles","def_int","points_per_drive","drives","points_per_drive","yards_per_drive","plays_per_drive","drive_total_gained_yards_rate","avg_field_position","rushing_highlight_yards","line_yards","yards_per_rush","yards_per_pass","yards_per_play","off_yards","pass_yards","rush_yards","EPA_overall_offense","EPA_penalty","EPA_overall_total","second_level_yards","open_field_yards","drive_stopped_rate","EPA_non_explosive","EPA_non_explosive_passing","EPA_non_explosive_rushing","EPA_non_explosive_per_play","EPA_non_explosive_passing_per_play","EPA_non_explosive_rushing_per_play"];
let boxScoreNonRatePercentColumns = ["drive_total_gained_yards_rate","drive_stopped_rate","EPA_success_rate_third","EPA_success_rate_rz"];
function boxScoreGetOrdinal(n) {
    var s = ["th", "st", "nd", "rd"];
    let v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function boxScoreGenerateColorRampValue(percentiles, input, max, midColor) {
    if (percentiles.length == 0) {
        //console.log('no pctls logged')
        return null;
    }
    if (!input) {
        //console.log('no input logged')
        return null;
    }
    //console.log(`calc color ramp for val ${input}`)

    let value = parseFloat(input) / parseFloat(max)
    let step = Math.round(value / 0.1)
    let clampedStep = Math.min(Math.max(step, 0), 9)

    let hex = null
    if (clampedStep == 4 || clampedStep == 5) {
        return null
    } else {
        return ` hulk-bg-level-${clampedStep}`
    }
}

function boxScoreRoundNumber(value, power10, fixed) {
    return (Math.round(parseFloat(value || 0) * (Math.pow(10, power10))) / (Math.pow(10, power10))).toFixed(fixed)
}
interface StatKeyNames {
    [key: string]: any
  }
const percentile_title_key_mapping: StatKeyNames = {
    "EPA_per_play" : "epaPerPlay",
    "EPA_passing_per_play" : "epaPerDropback",
    "EPA_rushing_per_play" : "epaPerRush",
    "havoc_total" : "havocRate",
    "EPA_success" : "successRate",
    "EPA_explosive" : "explosivePlayRate",
    "yards_per_pass": "yardsPerDropback",
    "yards_per_play": "yardsPerPlay",
    "rushing_stuff" : "playStuffedRate",
    "EPA_success_rate_third" : "thirdDownSuccessRate",
    "EPA_success_rate_rz" : "redZoneSuccessRate"
}

const slim_title_mapping: StatKeyNames = {
    "EPA_per_play" : "EPA/Play",
    "EPA_passing_per_play" : "EPA/Dropback",
    "EPA_rushing_per_play" : "EPA/Rush",
    "defensive.havoc_total" : "Havoc Rate",
    "rushing_stuff" : "Def Run Stuff Rate",
    "situational.EPA_success" : "Success Rate",
    "situational.EPA_success_rate_third" : "3rd Down Success Rate",
    "situational.EPA_success_rate_rz" : "Red Zone Success Rate",
    "EPA_explosive" : "Explosive Play Rate",
    "yards_per_pass": "Yards/Dropback",
    "yards_per_play": "Yards/Play",
}


function boxScoreRetrievePercentile(percentiles, value, key) {
    if (percentiles.length == 0) {
        //console.log('no pctls available')
        return {
            pctl: null,
            min: null,
            mid: null,
            max: null
        }
    }

    const adjKey = percentile_title_key_mapping[key];
    if (!adjKey) {
        //console.log('bailing out of percentile title key with key ' + key)
        return {
            pctl: null,
            min: null,
            mid: null,
            max: null
        }
    }

    //console.log(`calc pctl for key ${adjKey} w/ val ${value}`)

    let basePctls = percentiles.map(item => {
        let val = retrieveValue(item, adjKey);
        return parseFloat(val)
    })
    basePctls.sort((a, b) => {
        return parseFloat(a) - parseFloat(b)
    })

    if (basePctls[0] == null || basePctls.length == 0) {
        //console.log('all ptcls null for key ' + adjKey)
        return {
            pctl: null,
            min: null,
            mid: null,
            max: null
        }
    }

    let pctls = [...basePctls];
    //console.log(`mapped pctls for key ${adjKey}: ${JSON.stringify(pctls, null, 2)}`)
    pctls = pctls.filter(item => {
        return parseFloat(item) <= parseFloat(value)
    });

    const pct = pctls.length
    //console.log(`pct calc for key ${key} is ${pct}`)
    return {
        pctl: boxScoreRoundNumber(pct, 2, 0),
        min: boxScoreRoundNumber(basePctls[0], 2, 2),
        mid: boxScoreRoundNumber(basePctls[basePctls.length / 2], 2, 2),
        max: boxScoreRoundNumber(basePctls[basePctls.length - 1], 2, 2),
    }
}

function handleBoxScoreRates(percentiles, item, teamInfo, useSuffix, decimalPoints) {
    let baseTeamInfo = (teamInfo == null) ? advBoxScore : teamInfo;

    let subKeys = item.split('.');
    if (subKeys.length == 1) {
        subKeys.splice(0, 0, 'team');
    }

    let finalTeamInfo = [...baseTeamInfo[subKeys[0]]]
    const finalKey = subKeys[1];
    if (finalKey.includes('rushing_stuff')) {
        finalTeamInfo.reverse()
    }


    let finalDecimalPoints = decimalPoints || 1;
    var result = ""
    if (boxScoreNonRatePercentColumns.includes(finalKey)) {
        finalTeamInfo.forEach(teamData => {
            let val = retrieveValue(teamData, finalKey) || 0;
            let rate = parseFloat(JSON.parse(JSON.stringify(val)));
            if (finalKey.includes('_third') || finalKey.includes('_rz')) {
                rate *= 100
            }
            let pct = boxScoreRetrievePercentile(percentiles, val, finalKey);
            let colorRampClass = boxScoreGenerateColorRampValue(percentiles, pct.pctl, 100, null)
            //console.log(`calculated pctl for key ${finalKey} with pct value ${pct} and class ${colorRampClass}`)
            result += `<td class="numeral${colorRampClass}" style="text-align: center;" title="Worst: ${boxScoreRoundNumber(parseFloat(pct.min), 2, 0)}%\nMedian: ${boxScoreRoundNumber(parseFloat(pct.mid), 2, 0)}%\nBest: ${boxScoreRoundNumber(parseFloat(pct.max), 2, 0)}%">${boxScoreRoundNumber(parseFloat(rate), 2, 0)}% <small class="align-self-center" style="opacity: 50%">${boxScoreGetOrdinal(pct.pctl)} %ile</small></td>`;
        });
    } else if (boxScoreNonRateDecimalColumns.includes(finalKey)) {
        finalTeamInfo.forEach(teamData => {
            let val = retrieveValue(teamData, finalKey) || 0;
            let pct = boxScoreRetrievePercentile(percentiles, val, finalKey);
            let colorRampClass = boxScoreGenerateColorRampValue(percentiles, pct.pctl, 100, null)
            //console.log(`calculated pctl for key ${finalKey} with pct value ${pct} and class ${colorRampClass}`)
            result += `<td class="numeral${colorRampClass}" style="text-align: center;" title="Worst: ${boxScoreRoundNumber(parseFloat(pct.min), 2, finalDecimalPoints)}\nMedian: ${boxScoreRoundNumber(parseFloat(pct.mid), 2, finalDecimalPoints)}\nBest: ${boxScoreRoundNumber(parseFloat(pct.max), 2, finalDecimalPoints)}">${boxScoreRoundNumber(parseFloat(val), 2, finalDecimalPoints)} <small class="align-self-center" style="opacity: 50%">${boxScoreGetOrdinal(pct.pctl)} %ile</small></td>`;
        });
    } else if (boxScoreNonRateColumns.includes(finalKey)) {
        finalTeamInfo.forEach(teamData => {
            let val = retrieveValue(teamData, finalKey) || 0;
            let pct = boxScoreRetrievePercentile(percentiles, val, finalKey);
            let colorRampClass = boxScoreGenerateColorRampValue(percentiles, pct.pctl, 100, null)
            //console.log(`calculated pctl for key ${finalKey} with pct value ${pct} and class ${colorRampClass}`)
            result += `<td class="numeral${colorRampClass}" style="text-align: center;" title="Worst: ${pct.min}\nMedian: ${pct.mid}\nBest: ${pct.max}">${val} <small class="align-self-center" style="opacity: 50%">${boxScoreGetOrdinal(pct.pctl)} %ile</small></td>`;
        });
    } else {
        finalTeamInfo.forEach(teamData => {
            let val = retrieveValue(teamData, finalKey) || 0;
            var rate = 0.0;
            if (useSuffix) {
                rate = retrieveValue(teamData,`${finalKey}_rate`)
            } else {
                rate = (parseFloat(val) / parseFloat(retrieveValue(teamData,'scrimmage_plays')))
            }
            let pct = boxScoreRetrievePercentile(percentiles, rate, finalKey);
            let colorRampClass = boxScoreGenerateColorRampValue(percentiles, pct.pctl, 100, null)
            //console.log(`calculated pctl for key ${finalKey} with pct value ${pct} and class ${colorRampClass}`)
            result += `<td class="numeral${colorRampClass}" style="text-align: center;" title="Worst: ${boxScoreRoundNumber(parseFloat(100.0 * pct.min), 2, 0)}%\nMedian: ${boxScoreRoundNumber(parseFloat(100.0 * pct.mid), 2, 0)}%\nBest: ${boxScoreRoundNumber(parseFloat(100.0 * pct.max), 2, 0)}%">${boxScoreRoundNumber(parseFloat(100.0 * rate), 2, 0)}% <small class="align-self-center" style="opacity: 50%">${boxScoreGetOrdinal(pct.pctl)} %ile</small></td>`;
        });
    }
    return result;
}

function retrieveValue(dictionary, key) {
    const subKeys = key.split('.')
    let sub = dictionary;
    for (const k of subKeys) {
        sub = sub[k];
    }
    return sub;
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

let nonRateDecimalColumns = ["expected_turnovers","expected_turnover_margin","turnover_luck","EPA_middle_8_per_play","EPA_middle_8","EPA_middle_8_per_play","EPA_middle_8","EPA_early_down_per_play","EPA_early_down","EPA_sp","EPA_special_teams","EPA_kickoff","EPA_punt","EPA_fg","EPA_overall_off","EPA_per_play","EPA_passing_overall","EPA_passing_per_play", "EPA_rushing_overall","EPA_rushing_per_play","points_per_drive","yards_per_drive","plays_per_drive","avg_field_position","rushing_highlight_yards_per_opp","line_yards_per_carry","yards_per_rush","yards_per_pass","yards_per_play","drive_stopped_rate","EPA_non_explosive","EPA_non_explosive_passing","EPA_non_explosive_rushing","EPA_non_explosive_per_play","EPA_non_explosive_passing_per_play","EPA_non_explosive_rushing_per_play"];
let nonRateColumns = ["EPA_plays","scrimmage_plays","expected_turnover_margin","turnover_margin","turnovers","expected_turnovers","turnover_luck","early_downs","late_downs","fumbles","INT","PD","middle_8","EPA_middle_8_per_play","EPA_middle_8","EPA_early_down_per_play","EPA_early_down","fumbles_lost","fumbles_recovered","Int","TFL","TFL_pass","TFL_rush","total_fumbles","def_int","points_per_drive","drives","points_per_drive","yards_per_drive","plays_per_drive","drive_total_gained_yards_rate","avg_field_position","rushing_highlight_yards","line_yards","yards_per_rush","yards_per_pass","yards_per_play","off_yards","pass_yards","rush_yards","EPA_overall_offense","EPA_penalty","EPA_overall_total","second_level_yards","open_field_yards","drive_stopped_rate","EPA_non_explosive","EPA_non_explosive_passing","EPA_non_explosive_rushing","EPA_non_explosive_per_play","EPA_non_explosive_passing_per_play","EPA_non_explosive_rushing_per_play"];
let nonRatePercentColumns = ["drive_total_gained_yards_rate","drive_stopped_rate"];
function handleRates(item: string, teamInfo: any, useSuffix: boolean, decimalPoints: number) {
    let finalTeamInfo = teamInfo;
    let finalDecimalPoints = decimalPoints || 1;
    let result;
    if (item == "EPA_misc") {
        let overall = parseFloat(finalTeamInfo['EPA_overall_total']) || 0;
        let off = parseFloat(finalTeamInfo['EPA_overall_offense']) || 0;
        let sp_epa = parseFloat(finalTeamInfo['EPA_special_teams']) || 0;
        let pen_epa = parseFloat(finalTeamInfo['EPA_penalty']) || 0;
        let val = (overall - off - sp_epa - pen_epa)
        result = roundNumber(val, 2, 2);
    } else if (item == "avg_field_position") {
        let val = finalTeamInfo[item] || 0;
        let prefix = (val >= 50) ? "Own" : "Opp"
        let printedVal = (val >= 50) ? (100 - parseFloat(val)) : val
        result = `${prefix} ${roundNumber(printedVal, 2, 0)}`;
    } else if (nonRatePercentColumns.includes(item)) {
        let val = finalTeamInfo[item] || 0;
        result = `${roundNumber(parseFloat(val), 2, 0)+"%"}`;
    } else if (nonRateDecimalColumns.includes(item)) {
        let val = finalTeamInfo[item] || 0;
        result = `${roundNumber(parseFloat(val), 2, finalDecimalPoints)}`;
    } else if (nonRateColumns.includes(item)) {
        let val = finalTeamInfo[item] || 0;
        result = `${val}`;
    } else {
        let val = finalTeamInfo[item] || 0;
        var rate = 0.0;
        if (useSuffix) {
            rate = 100.0 * finalTeamInfo[`${item}_rate`]
        } else {
            rate = 100.0 * (parseFloat(val) / parseFloat(finalTeamInfo["scrimmage_plays"]))
        }
        result = `${val} (${roundNumber(parseFloat(rate.toString()), 2, 0)}%)`;

    }
    return result;
}



export default function CFBTeamStatsOverallTable({
    advBoxScore,
    percentiles,
    title,
    awayTeam,
    homeTeam,
    season }: {
        advBoxScore: BoxScoreClassFilter,
        percentiles: any,
        title: string,
        awayTeam: Competitor,
        homeTeam: Competitor,
        season: number }){

    let baseData;
    Object.keys(advBoxScore).forEach(key => {
        baseData = advBoxScore[key]
        var teamKey = "pos_team"
        if (Object.keys(baseData).includes("def_pos_team")) {
            teamKey = "def_pos_team"
        }
        baseData.sort((a: any, b: any) => {
            if (a[teamKey] == awayTeam.id && b[teamKey] == homeTeam.id) {
                return -1;
            } else if (b[teamKey] == awayTeam.id && a[teamKey] == homeTeam.id) {
                return 1;
            } else {
                return 0;
            }
        });
    });
    let awayAdvBoxscoreTeam = advBoxScore.team?.filter((row) => row.pos_team.toString() == awayTeam.id)
    let homeAdvBoxscoreTeam = advBoxScore.team?.filter((row) => row.pos_team.toString() == homeTeam.id)
    let teamAdvBoxscore = advBoxScore.team;
    let expectedPointsColumns = ["EPA_per_play", "situational.EPA_success", "yards_per_play", "EPA_passing_per_play", "EPA_rushing_per_play", "yards_per_pass", "EPA_explosive", "situational.EPA_success_rate_third", "situational.EPA_success_rate_rz", "rushing_stuff", "defensive.havoc_total"];
    let columns;
    if (title === "Expected Points") {
        awayAdvBoxscoreTeam = advBoxScore.team?.filter((row) => row.pos_team.toString() == awayTeam.id)
        homeAdvBoxscoreTeam = advBoxScore.team?.filter((row) => row.pos_team.toString() == homeTeam.id)
        teamAdvBoxscore = advBoxScore.team;
        columns = expectedPointsColumns;
    } else {
        columns = expectedPointsColumns;
    }
    return(
        <>
        <table className="table whitespace-pre w-1/3 mx-2">
            <thead>
                <tr>
                    <th className="text-left whitespace-pre overflow-auto">{title}</th>
                    <th className="text-center">{formatLogo(awayTeam, season)}</th>
                    <th className="text-center">{formatLogo(homeTeam, season)}</th>
                </tr>
            </thead>
            <tbody>
            {awayAdvBoxscoreTeam && awayAdvBoxscoreTeam[0] ? (columns.map((item, idx) => (
                <tr key={idx}>
                    <td className="text-left whitespace-pre overflow-auto">
                        {Object.keys(slim_title_mapping).includes(item) ? (slim_title_mapping[item]) : item }
                    </td>
                    <td>{handleRates( item, awayAdvBoxscoreTeam[0], true, 2)}</td>
                    <td>{handleRates( item, homeAdvBoxscoreTeam[0], true, 2)}</td>
                </tr>
            ))) : null}
            </tbody>
        </table>
        </>
    );
}