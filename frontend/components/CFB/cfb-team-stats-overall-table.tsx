import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Competitor, BoxScoreClassFilter } from '@/lib/cfb/types';


interface StatKeyNames {
    [key: string]: string
  }
let boxScoreNonRateDecimalColumns = ["expected_turnovers","expected_turnover_margin","turnover_luck","EPA_middle_8_per_play","EPA_middle_8","EPA_middle_8_per_play","EPA_middle_8","EPA_early_down_per_play","EPA_early_down","EPA_sp","EPA_special_teams","EPA_kickoff","EPA_punt","EPA_fg","EPA_overall_off","EPA_per_play","EPA_passing_overall","EPA_passing_per_play", "EPA_rushing_overall","EPA_rushing_per_play","points_per_drive","yards_per_drive","plays_per_drive","avg_field_position","rushing_highlight_yards_per_opp","line_yards_per_carry","yards_per_rush","yards_per_pass","yards_per_play","drive_stopped_rate","EPA_non_explosive","EPA_non_explosive_passing","EPA_non_explosive_rushing","EPA_non_explosive_per_play","EPA_non_explosive_passing_per_play","EPA_non_explosive_rushing_per_play"];
let boxScoreNonRateColumns = ["EPA_plays","scrimmage_plays","expected_turnover_margin","turnover_margin","turnovers","expected_turnovers","turnover_luck","early_downs","late_downs","fumbles","INT","PD","middle_8","EPA_middle_8_per_play","EPA_middle_8","EPA_early_down_per_play","EPA_early_down","fumbles_lost","fumbles_recovered","Int","TFL","TFL_pass","TFL_rush","total_fumbles","def_int","points_per_drive","drives","points_per_drive","yards_per_drive","plays_per_drive","drive_total_gained_yards_rate","avg_field_position","rushing_highlight_yards","line_yards","yards_per_rush","yards_per_pass","yards_per_play","off_yards","pass_yards","rush_yards","EPA_overall_offense","EPA_penalty","EPA_overall_total","second_level_yards","open_field_yards","drive_stopped_rate","EPA_non_explosive","EPA_non_explosive_passing","EPA_non_explosive_rushing","EPA_non_explosive_per_play","EPA_non_explosive_passing_per_play","EPA_non_explosive_rushing_per_play"];
let boxScoreNonRatePercentColumns = ["drive_total_gained_yards_rate","drive_stopped_rate","EPA_success_rate_third","EPA_success_rate_rz"];


function boxScoreRoundNumber(value: any, power10: any, fixed: any) {
    return (Math.round(parseFloat(value || 0) * (Math.pow(10, power10))) / (Math.pow(10, power10))).toFixed(fixed)
}

const percentile_title_key_mapping: StatKeyNames = {
    "EPA_per_play" : "EPAplay",
    "EPA_passing_per_play" : "EPAdropback",
    "EPA_rushing_per_play" : "EPArush",
    "havoc_total" : "havoc",
    "EPA_success" : "success",
    "EPA_explosive" : "explosive",
    "yards_per_pass": "yardsdropback",
    "yards_per_play": "yardsplay",
    "rushing_stuff" : "play_stuffed",
    "EPA_success_rate_third" : "third_down_success",
    "EPA_success_rate_rz" : "red_zone_success"
}

const slim_title_mapping: StatKeyNames = {
    "EPA_per_play" : "EPA/Play",
    "EPA_passing_per_play" : "EPA/Dropback",
    "EPA_rushing_per_play" : "EPA/Rush",
    "havoc_total" : "Havoc Rate",
    "rushing_stuff" : "Def Run Stuff Rate",
    "EPA_success" : "Success Rate",
    "EPA_success_rate_third" : "3rd Down Success Rate",
    "EPA_success_rate_rz" : "Red Zone Success Rate",
    "EPA_explosive" : "Explosive Play Rate",
    "yards_per_pass": "Yards/Dropback",
    "yards_per_play": "Yards/Play",
}

function boxScoreGetOrdinal(n: any) {
    var s = ["th", "st", "nd", "rd"];
    let v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function boxScoreGenerateColorRampValue(percentiles: any, input: string, max: any, midColor: any) {
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

function boxScoreRetrievePercentile(percentiles: any, value: any, key: any) {
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

    // console.log(`calc pctl for key ${adjKey} w/ val ${value}`)

    let basePctls = percentiles.map((item: any) => {
        // console.log(item, adjKey)
        let val = item[adjKey];
        return parseFloat(val)
    })
    // console.log(basePctls)
    basePctls.sort((a: any, b: any) => {
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

    let pctls = basePctls
    //console.log(`mapped pctls for key ${adjKey}: ${JSON.stringify(pctls, null, 2)}`)
    pctls = pctls.filter((item: any) => {
        return parseFloat(item) <= parseFloat(value)
    });

    const pct = pctls.length
    // console.log(basePctls.length)
    //console.log(`pct calc for key ${key} is ${pct}`)
    return {
        pctl: boxScoreRoundNumber(pct, 2, 0),
        min: boxScoreRoundNumber(basePctls[0], 2, 2),
        mid: boxScoreRoundNumber(basePctls[(basePctls.length+1) / 2], 2, 2),
        max: boxScoreRoundNumber(basePctls[basePctls.length - 1], 2, 2),
    }
}

function handleBoxScoreRates(percentiles: any, item: any, teamInfo: any, team: any, useSuffix: any, decimalPoints: number) {
    let baseTeamInfo = teamInfo

    // let subKeys = item.split('.');
    // if (subKeys.length == 1) {
    //     subKeys.splice(0, 0, 'team');
    // }
    // // console.log(baseTeamInfo[subKeys[0]][0])
    // // console.log(baseTeamInfo[subKeys[0]][1])
    // let finalTeamInfo = [...baseTeamInfo[subKeys[0]]]
    // const finalKey = subKeys[1];
    // if (finalKey.includes('rushing_stuff')) {
    //     finalTeamInfo.reverse()
    // }
    const finalTeamInfo = baseTeamInfo
    // console.log(finalTeamInfo)
    let finalDecimalPoints = decimalPoints || 1;
    let result: any ;

    // console.log(finalTeamInfo[0])
    // console.log(finalTeamInfo)
    if (boxScoreNonRatePercentColumns.includes(item)) {
            let val = finalTeamInfo[0][item] || 0;
            // console.log(val)
            let rate = parseFloat(JSON.parse(JSON.stringify(val)));
            if (item.includes('_third') || item.includes('_rz')) {
                rate *= 100
            }
            let pct = boxScoreRetrievePercentile(percentiles, val, item);
            let colorRampClass = boxScoreGenerateColorRampValue(percentiles, pct.pctl || "0", 100, null)
            // console.log(`calculated pctl for key ${finalKey}, with val ${val}, rate ${rate} with pct value ${pct} and class ${colorRampClass}`)
            result = <td className={`numeral${colorRampClass} text-center`}
                         title={`Worst: ${boxScoreRoundNumber(100 * parseFloat(pct.min || "0"), 2, 0)}%\nMedian: ${boxScoreRoundNumber(100 * parseFloat(pct.mid || "0"), 2, 0)}%\nBest: ${boxScoreRoundNumber(100 * parseFloat(pct.max || "0"), 2, 0)}%`}>
                        {`${boxScoreRoundNumber(parseFloat(rate.toString() || "0"), 2, 0)}% `}
                        <small className="align-center opacity-[80%]">
                            {`${boxScoreGetOrdinal(pct.pctl)} %ile`}
                        </small>
                     </td>;
    } else if (boxScoreNonRateDecimalColumns.includes(item)) {
            let val = finalTeamInfo[0][item] || 0;
            let pct = boxScoreRetrievePercentile(percentiles, val, item);
            let colorRampClass = boxScoreGenerateColorRampValue(percentiles, pct.pctl || "0", 100, null)
            // console.log(`calculated pctl for key ${finalKey} with pct value ${pct} and class ${colorRampClass}`)
            result = <td className={`numeral${colorRampClass} text-center`}
                         title={`Worst: ${boxScoreRoundNumber(parseFloat(pct.min || "0"), 2, finalDecimalPoints)}\nMedian: ${boxScoreRoundNumber(parseFloat(pct.mid || "0"), 2, finalDecimalPoints)}\nBest: ${boxScoreRoundNumber(parseFloat(pct.max || "0"), 2, finalDecimalPoints)}`}>
                        {`${boxScoreRoundNumber(parseFloat(val), 2, finalDecimalPoints)} `}
                        <small className="align-center opacity-[80%]">
                            {`${boxScoreGetOrdinal(pct.pctl)} %ile`}
                        </small>
                    </td>

    } else if (boxScoreNonRateColumns.includes(item)) {

            let val = finalTeamInfo[0][item] || 0;
            let pct = boxScoreRetrievePercentile(percentiles, val, item);
            let colorRampClass = boxScoreGenerateColorRampValue(percentiles, pct.pctl || "0", 100, null)
            // console.log(`calculated pctl for key ${finalKey} with pct value ${pct} and class ${colorRampClass}`)
            result = <td className={`numeral${colorRampClass} text-center`} title={`Worst: ${pct.min}\nMedian: ${pct.mid}\nBest: ${pct.max}`}>
                        {`${val} `}
                        <small className="align-center opacity-[80%]">
                            {`${boxScoreGetOrdinal(parseFloat(pct.pctl || "0"))} %ile`}
                        </small>
                    </td>;

    } else {

            let val = finalTeamInfo[0][item] || 0;
            var rate = 0.0;
            if (useSuffix) {
                rate = finalTeamInfo[0][`${item}_rate`]
            } else {
                rate = (parseFloat(val) / parseFloat(finalTeamInfo[0]['scrimmage_plays']))
            }
            let pct = boxScoreRetrievePercentile(percentiles, rate, item);
            let colorRampClass = boxScoreGenerateColorRampValue(percentiles, pct.pctl || "0", 100, null)
            //console.log(`calculated pctl for key ${finalKey} with pct value ${pct} and class ${colorRampClass}`)
            result = <td className={`numeral${colorRampClass} text-center`}
                         title={`Worst: ${boxScoreRoundNumber(100.0 * parseFloat( (pct.min || "0")), 2, 0)}%\nMedian: ${boxScoreRoundNumber(100.0 * parseFloat(pct.mid || "0"), 2, 0)}%\nBest: ${boxScoreRoundNumber(100.0 * parseFloat(pct.max || "0"), 2, 0)}%`}>
                        {`${boxScoreRoundNumber(100.0 * parseFloat( rate.toString() || "0"), 2, 0)}% ` }
                        <small className="align-center opacity-[80%]">
                            {`${boxScoreGetOrdinal(pct.pctl)} %ile`}
                        </small>
                     </td>;

    }
    // console.log(result)
    return result;
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
    let awayAdvBoxscoreTeam: any;
    let homeAdvBoxscoreTeam: any;
    let awayAdvBoxscoreSituational: any;
    let homeAdvBoxscoreSituational: any;
    let awayAdvBoxscoreDefensive: any;
    let homeAdvBoxscoreDefensive: any;
    awayAdvBoxscoreTeam = advBoxScore.team?.filter((row) => row.pos_team.toString() == awayTeam.id)
    awayAdvBoxscoreSituational = advBoxScore.situational?.filter((row) => row.pos_team.toString() == awayTeam.id)
    awayAdvBoxscoreDefensive = advBoxScore.defensive?.filter((row) => row.def_pos_team.toString() == awayTeam.id)
    let awayAdvBoxScore = [{ ...awayAdvBoxscoreTeam[0], ...awayAdvBoxscoreSituational[0],  ...awayAdvBoxscoreDefensive[0] }]
    homeAdvBoxscoreTeam = advBoxScore.team?.filter((row) => row.pos_team.toString() == homeTeam.id)
    homeAdvBoxscoreSituational = advBoxScore.situational?.filter((row) => row.pos_team.toString() == homeTeam.id)
    homeAdvBoxscoreDefensive = advBoxScore.defensive?.filter((row) => row.def_pos_team.toString() == homeTeam.id)
    let homeAdvBoxScore = [{ ...homeAdvBoxscoreTeam[0], ...homeAdvBoxscoreSituational[0],  ...homeAdvBoxscoreDefensive[0] }]

    let teamAdvBoxscore = advBoxScore.team;
    let expectedPointsColumns = ["EPA_per_play", "EPA_success", "yards_per_play", "EPA_passing_per_play", "EPA_rushing_per_play", "yards_per_pass", "EPA_explosive", "EPA_success_rate_third", "EPA_success_rate_rz", "rushing_stuff", "havoc_total"];


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
        <table className="whitespace-pre min-w-[90%] lg:min-w-[90%] m-auto">
            <thead>
                <tr>
                    <th className="text-left whitespace-pre overflow-auto">{title}</th>
                    <th className="text-center">{formatLogo(awayTeam, season)}</th>
                    <th className="text-center">{formatLogo(homeTeam, season)}</th>
                </tr>
            </thead>
            <tbody>
            {awayAdvBoxscoreTeam && awayAdvBoxscoreTeam[0] ? (columns.map((item, idx) => (
                <tr key={idx} className="border-b">
                    <td className="text-left whitespace-pre overflow-auto">
                        {Object.keys(slim_title_mapping).includes(item) ? (slim_title_mapping[item]) : item }
                    </td>
                    {handleBoxScoreRates( percentiles, item, awayAdvBoxScore, awayTeam, true, 2)}
                    {handleBoxScoreRates( percentiles, item, homeAdvBoxScore, homeTeam, true, 2)}
                </tr>
            ))) : null}
            </tbody>
        </table>
        </>
    );
}