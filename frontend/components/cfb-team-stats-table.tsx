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
const stat_key_title_mapping: StatKeyNames = {
    "EPA_plays" : "Total Plays",
    "scrimmage_plays" : "Scrimmage Plays",
    "EPA_overall_total" : "Total EPA",
    "EPA_overall_off" : "        EPA",
    "EPA_overall_offense" : "        Offensive EPA",
    "EPA_passing_overall" : "        EPA",
    "EPA_rushing_overall" : "        EPA",
    "EPA_per_play" : "        EPA/Play",
    "EPA_passing_per_play" : "        EPA/Play",
    "EPA_rushing_per_play" : "        EPA/Play",
    "rushes" : "Rushes",
    "rushing_power" : "        Power Run Attempts\n        (Down  ≥ 3, Distance ≤ 2)",
    "rushing_power_success" : "        Successful Power Runs (Rate)",
    "rushing_stuff" : "        Stuffed Runs\n        (Yds Gained ≤ 0)",
    "rushing_stopped" : "        Stopped Runs\n        (Yds Gained ≤ 2)",
    "rushing_opportunity" : "        Opportunity Runs\n        (Yds Gained ≥ 4)",
    "rushing_highlight" : "        Highlight Runs\n        (Yds Gained ≥ 8)",
    "havoc_total" : "Havoc Plays Created",
    "havoc_total_pass" : "        Passing",
    "havoc_total_rush" : "        Rushing",
    "EPA_penalty": "        Penalty EPA",
    "special_teams_plays" : "Total Plays",
    "EPA_sp" : "Total EPA",
    "EPA_special_teams" : "        Special Teams EPA",
    "EPA_fg" : "        Field Goal EPA",
    "EPA_punt" : "        Punting EPA",
    "EPA_kickoff" : "        Kickoff Return EPA",
    "TFL" : "TFLs Generated",
    "TFL_pass" : "        Passing",
    "TFL_rush" : "        Rushing",
    "EPA_success" : "Successful Plays (EPA > 0)",
    "EPA_success_pass" : "        When Passing",
    "EPA_success_rush" : "        When Rushing",
    "EPA_success_standard_down" : "        On Standard Downs",
    "EPA_success_passing_down": "        On Passing Downs",
    "EPA_success_early_down": "        On Early Downs",
    "EPA_success_early_down_pass": "        Successful Passes (Rate)",
    "EPA_success_early_down_rush": "        Successful Rushes (Rate)",
    "early_downs": "Early Downs",
    "early_down_pass": "        Passes",
    "early_down_rush": "        Rushes",
    "EPA_success_late_down": "        On Late Downs",
    "EPA_success_late_down_pass": "        Successful Passes (Rate)",
    "EPA_success_late_down_rush": "        Successful Rushes (Rate)",
    "late_downs": "Late Downs",
    "late_down_pass": "        Passes",
    "late_down_rush": "        Rushes",
    "EPA_explosive" : "Explosive Plays",
    "EPA_explosive_passing" : "        When Passing (EPA > 2.4)",
    "EPA_explosive_rushing" : "        When Rushing (EPA > 1.8)",
    "scoring_opps_opportunities" : "Scoring Opps",
    "scoring_opps_points" : "        Total Points",
    "scoring_opps_pts_per_opp" : "        Points per Opp",
    "field_pos_avg_start" : "Avg Starting FP",
    "field_pos_avg_starting_predicted_pts" : "        Predicted Points",
    "sacks" : "Sacks Generated",
    "turnovers" : "Turnovers",
    "expected_turnovers" : "Expected Turnovers",
    "turnover_margin" : "Turnover Margin",
    "expected_turnover_margin" : "Expected Turnover Margin",
    "turnover_luck" : "Turnover Luck (pts)",
    "PD" : "Passes Defensed",
    "INT" : "        Interceptions",
    "Int" : "        Interceptions",
    "def_int" : "Interceptions",
    "fumbles" : "Fumbles Forced",
    "total_fumbles" : "        Fumbles",
    "fumbles_lost" : "        Fumbles Lost",
    "fumbles_recovered" : "        Fumbles Recovered",
    "middle_8": "\"Middle 8\" Plays",
    "middle_8_pass": "        Passes",
    "middle_8_rush": "        Rushes",
    "EPA_middle_8": "        EPA",
    "EPA_middle_8_success": "        During \"Middle 8\"",
    "EPA_middle_8_success_pass": "        Successful Passes (Rate)",
    "EPA_middle_8_success_rush": "        Successful Rushes (Rate)",
    "EPA_middle_8_per_play" : "        EPA/play",
    "EPA_early_down" : "        EPA",
    "EPA_early_down_per_play" : "        EPA/Play",
    "first_downs_created" : "First Downs Created",
    "early_down_first_down" : "        First Downs Created",
    "passes" : "Passes",
    // @ts-ignore
    "rushes" : "Rushes",
    "drives" : "Total",
    "drive_total_gained_yards_rate" : "Available Yards %",
    "yards_per_drive" : "Yards/Drive",
    "plays_per_drive" : "Plays/Drive",
    "avg_field_position": "Avg Starting Field Position",
    "rushing_highlight_yards": "Highlight Yards",
    "rushing_highlight_yards_per_opp": "        Per Rush Opportunity",
    "line_yards": "OL Line Yards",
    "line_yards_per_carry": "        Per Carry",
    "yards_per_rush": "        Yards/Play",
    "yards_per_pass": "        Yards/Play",
    "yards_per_play": "        Yards/Play",
    "off_yards" : "        Yards",
    "rush_yards" : "        Yards",
    "pass_yards" : "        Yards",
    "total_yards":  "Total Yards",
    "total_off_yards" : "        Offensive Yards",
    "total_sp_yards":"        Special Teams Yards",
    "total_pen_yards":"        Penalty Yards",
    "EPA_misc" : "        Non-Scrimmage/Misc EPA",
    "open_field_yards" : "Open-Field Yards",
    "second_level_yards" : "Second-Level Yards",
    "drive_stopped_rate" : "Stop Rate",
    "EPA_non_explosive" : "EPA w/o Explosive Plays",
    "EPA_non_explosive_per_play" : "        EPA/Play",
    "EPA_non_explosive_passing" : "        When Passing",
    "EPA_non_explosive_passing_per_play" : "                EPA/Play",
    "EPA_non_explosive_rushing" : "        When Rushing",
    "EPA_non_explosive_rushing_per_play" : "                EPA/Play"
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



export default function CFBTeamStatsTable({
    advBoxScore,
    title,
    awayTeam,
    homeTeam,
    season }: {
        advBoxScore: BoxScoreClassFilter,
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
    let expectedPointsColumns = ["EPA_plays","EPA_overall_total", "EPA_overall_offense", "EPA_special_teams", "EPA_penalty", "EPA_misc"];
    let productionColumns = ["scrimmage_plays","off_yards","yards_per_play","EPA_overall_off","EPA_per_play","passes","pass_yards","yards_per_pass","EPA_passing_overall","EPA_passing_per_play","rushes","rush_yards","yards_per_rush", "EPA_rushing_overall","EPA_rushing_per_play"];
    let rushingColumns = ["scrimmage_plays","rushes","rushing_power","rushing_power_success","rushing_stuff","rushing_stopped","rushing_opportunity","line_yards","line_yards_per_carry","rushing_highlight_yards","rushing_highlight_yards_per_opp"];
    let explosivenessColumns = ["EPA_plays","scrimmage_plays","EPA_explosive","EPA_explosive_passing","EPA_explosive_rushing","EPA_non_explosive","EPA_non_explosive_per_play","EPA_non_explosive_passing","EPA_non_explosive_passing_per_play","EPA_non_explosive_rushing","EPA_non_explosive_rushing_per_play"];
    let situationalColumns = ["EPA_success", "EPA_success_pass", "EPA_success_rush", "EPA_success_standard_down", "EPA_success_passing_down", "EPA_success_early_down", "EPA_success_late_down", "EPA_middle_8_success", "early_downs", "early_down_first_down", "EPA_early_down", "EPA_early_down_per_play", "early_down_pass", "early_down_rush", "EPA_success_early_down_pass", "EPA_success_early_down_rush", "middle_8", "EPA_middle_8", "EPA_middle_8_per_play", "middle_8_pass", "middle_8_rush", "EPA_middle_8_success_pass", "EPA_middle_8_success_rush" ];
    let drivesColumns = ["drives", "avg_field_position", "plays_per_drive", "yards_per_drive", "drive_total_gained_yards_rate"];
    let defensiveColumns = ["scrimmage_plays","drive_stopped_rate","havoc_total","havoc_total_pass","havoc_total_rush","TFL","TFL_pass","TFL_rush", "sacks","PD","def_int","fumbles"];
    let turnoversColumns = ["turnovers","total_fumbles","fumbles_lost","fumbles_recovered","Int","turnover_margin","expected_turnovers","expected_turnover_margin","turnover_luck"];
    let specialTeamsColumns = ["special_teams_plays","EPA_sp","EPA_fg","EPA_punt","EPA_kickoff"];
    let columns;
    if (title === "Expected Points") {
        awayAdvBoxscoreTeam = advBoxScore.team?.filter((row) => row.pos_team.toString() == awayTeam.id)
        homeAdvBoxscoreTeam = advBoxScore.team?.filter((row) => row.pos_team.toString() == homeTeam.id)
        teamAdvBoxscore = advBoxScore.team;
        columns = expectedPointsColumns;
    } else if (title === "Production"){
        awayAdvBoxscoreTeam = advBoxScore.team?.filter((row) => row.pos_team.toString() == awayTeam.id)
        homeAdvBoxscoreTeam = advBoxScore.team?.filter((row) => row.pos_team.toString() == homeTeam.id)
        teamAdvBoxscore = advBoxScore.team;
        columns = productionColumns;
    } else if (title === "Rushing"){
        awayAdvBoxscoreTeam = advBoxScore.team?.filter((row) => row.pos_team.toString() == awayTeam.id)
        homeAdvBoxscoreTeam = advBoxScore.team?.filter((row) => row.pos_team.toString() == homeTeam.id)
        teamAdvBoxscore = advBoxScore.team;
        columns = rushingColumns;
    } else if (title === "Explosiveness"){
        awayAdvBoxscoreTeam = advBoxScore.team?.filter((row) => row.pos_team.toString() == awayTeam.id)
        homeAdvBoxscoreTeam = advBoxScore.team?.filter((row) => row.pos_team.toString() == homeTeam.id)
        teamAdvBoxscore = advBoxScore.team;
        columns = explosivenessColumns;
    } else if (title === "Situational"){
        awayAdvBoxscoreTeam = advBoxScore.situational?.filter((row) => row.pos_team.toString() == awayTeam.id)
        homeAdvBoxscoreTeam = advBoxScore.situational?.filter((row) => row.pos_team.toString() == homeTeam.id)
        teamAdvBoxscore = advBoxScore.situational;
        columns = situationalColumns;
    } else if (title === "Drives"){
        awayAdvBoxscoreTeam = advBoxScore.drives?.filter((row) => row.pos_team.toString() == awayTeam.id)
        homeAdvBoxscoreTeam = advBoxScore.drives?.filter((row) => row.pos_team.toString() == homeTeam.id)
        teamAdvBoxscore = advBoxScore.drives;
        columns = drivesColumns;
    } else if (title === "Defensive"){
        awayAdvBoxscoreTeam = advBoxScore.defensive?.filter((row) => row.def_pos_team.toString() == awayTeam.id)
        homeAdvBoxscoreTeam = advBoxScore.defensive?.filter((row) => row.def_pos_team.toString() == homeTeam.id)
        teamAdvBoxscore = advBoxScore.defensive;
        columns = defensiveColumns;
    } else if (title === "Turnovers"){
        awayAdvBoxscoreTeam = advBoxScore.turnover?.filter((row) => row.pos_team.toString() == awayTeam.id)
        homeAdvBoxscoreTeam = advBoxScore.turnover?.filter((row) => row.pos_team.toString() == homeTeam.id)
        teamAdvBoxscore = advBoxScore.turnover;
        columns = turnoversColumns;
    } else if (title === "Special Teams"){
        awayAdvBoxscoreTeam = advBoxScore.team?.filter((row) => row.pos_team.toString() == awayTeam.id)
        homeAdvBoxscoreTeam = advBoxScore.team?.filter((row) => row.pos_team.toString() == homeTeam.id)
        teamAdvBoxscore = advBoxScore.team;
        columns = specialTeamsColumns;
    } else {
        columns = expectedPointsColumns;
    }
    return(
        <>
        <table className="table whitespace-pre mx-2">
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
                        {Object.keys(stat_key_title_mapping).includes(item) ? (stat_key_title_mapping[item]) : item }
                    </td>
                    <td className="text-center">{handleRates(item, awayAdvBoxscoreTeam[0], true, 2)}</td>
                    <td className="text-center">{handleRates(item, homeAdvBoxscoreTeam[0], true, 2)}</td>
                </tr>
            ))) : null
            }
            </tbody>
        </table>
        </>
    );
}