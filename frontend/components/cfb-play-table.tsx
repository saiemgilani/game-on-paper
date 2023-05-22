"use client";
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import { CFBGamePlay, Competitor, Competition, Away } from '@/lib/cfb/types';
import AnimatedHeading from './FramerMotion/animated-heading';
import { useState, useEffect } from "react";
import { useTheme } from 'next-themes'
import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
	margin: 16px;
	animation: ${rotate360} 1s linear infinite;
	transform: translateZ(0);
	border-top: 2px solid grey;
	border-right: 2px solid grey;
	border-bottom: 2px solid grey;
	border-left: 4px solid black;
	background: transparent;
	width: 80px;
	height: 80px;
	border-radius: 50%;
`;


const CustomLoader = () => (
	<div style={{ padding: '24px' }}>
		<Spinner />
		<div>Loading plays data...</div>
	</div>
);

const CLEAN_LIST = [61]
interface StatKeyNames {
    [key: string]: string
  }
const stat_key_title_mapping: StatKeyNames = {
    "EPA_plays" : "Total Plays",
    "scrimmage_plays" : "Scrimmage Plays",
    "EPA_overall_total" : "Total EPA",
    "EPA_overall_off" : "&emsp;&emsp;EPA",
    "EPA_overall_offense" : "&emsp;&emsp;Offensive EPA",
    "EPA_passing_overall" : "&emsp;&emsp;EPA",
    "EPA_rushing_overall" : "&emsp;&emsp;EPA",
    "EPA_per_play" : "&emsp;&emsp;EPA/Play",
    "EPA_passing_per_play" : "&emsp;&emsp;EPA/Play",
    "EPA_rushing_per_play" : "&emsp;&emsp;EPA/Play",
    "rushes" : "Rushes",
    "rushing_power" : "&emsp;&emsp;Power Run Attempts (Down &#8805; 3, Distance &#8804; 2)",
    "rushing_power_success" : "&emsp;&emsp;Successful Power Runs (Rate)",
    "rushing_stuff" : "&emsp;&emsp;Stuffed Runs (Yds Gained &#8804; 0)",
    "rushing_stopped" : "&emsp;&emsp;Stopped Runs (Yds Gained &#8804; 2)",
    "rushing_opportunity" : "&emsp;&emsp;Opportunity Runs (Yds Gained &#8805; 4)",
    "rushing_highlight" : "&emsp;&emsp;Highlight Runs (Yds Gained &#8805; 8)",
    "havoc_total" : "Havoc Plays Created",
    "havoc_total_pass" : "&emsp;&emsp;Passing",
    "havoc_total_rush" : "&emsp;&emsp;Rushing",
    "EPA_penalty": "&emsp;&emsp;Penalty EPA",
    "special_teams_plays" : "Total Plays",
    "EPA_sp" : "Total EPA",
    "EPA_special_teams" : "&emsp;&emsp;Special Teams EPA",
    "EPA_fg" : "&emsp;&emsp;Field Goal EPA",
    "EPA_punt" : "&emsp;&emsp;Punting EPA",
    "EPA_kickoff" : "&emsp;&emsp;Kickoff Return EPA",
    "TFL" : "TFLs Generated",
    "TFL_pass" : "&emsp;&emsp;Passing",
    "TFL_rush" : "&emsp;&emsp;Rushing",
    "EPA_success" : "Successful Plays (EPA > 0)",
    "EPA_success_pass" : "&emsp;&emsp;When Passing",
    "EPA_success_rush" : "&emsp;&emsp;When Rushing",
    "EPA_success_standard_down" : "&emsp;&emsp;On Standard Downs",
    "EPA_success_passing_down": "&emsp;&emsp;On Passing Downs",
    "EPA_success_early_down": "&emsp;&emsp;On Early Downs",
    "EPA_success_early_down_pass": "&emsp;&emsp;Successful Passes (Rate)",
    "EPA_success_early_down_rush": "&emsp;&emsp;Successful Rushes (Rate)",
    "early_downs": "Early Downs",
    "early_down_pass": "&emsp;&emsp;Passes",
    "early_down_rush": "&emsp;&emsp;Rushes",
    "EPA_success_late_down": "&emsp;&emsp;On Late Downs",
    "EPA_success_late_down_pass": "&emsp;&emsp;Successful Passes (Rate)",
    "EPA_success_late_down_rush": "&emsp;&emsp;Successful Rushes (Rate)",
    "late_downs": "Late Downs",
    "late_down_pass": "&emsp;&emsp;Passes",
    "late_down_rush": "&emsp;&emsp;Rushes",
    "EPA_explosive" : "Explosive Plays",
    "EPA_explosive_passing" : "&emsp;&emsp;When Passing (EPA > 2.4)",
    "EPA_explosive_rushing" : "&emsp;&emsp;When Rushing (EPA > 1.8)",
    "scoring_opps_opportunities" : "Scoring Opps",
    "scoring_opps_points" : "&emsp;&emsp;Total Points",
    "scoring_opps_pts_per_opp" : "&emsp;&emsp;Points per Opp",
    "field_pos_avg_start" : "Avg Starting FP",
    "field_pos_avg_starting_predicted_pts" : "&emsp;&emsp;Predicted Points",
    "sacks" : "Sacks Generated",
    "turnovers" : "Turnovers",
    "expected_turnovers" : "Expected Turnovers",
    "turnover_margin" : "Turnover Margin",
    "expected_turnover_margin" : "Expected Turnover Margin",
    "turnover_luck" : "Turnover Luck (pts)",
    "PD" : "Passes Defensed",
    "INT" : "&emsp;&emsp;Interceptions",
    "Int" : "&emsp;&emsp;Interceptions",
    "def_int" : "Interceptions",
    "fumbles" : "Fumbles Forced",
    "total_fumbles" : "&emsp;&emsp;Fumbles",
    "fumbles_lost" : "&emsp;&emsp;Fumbles Lost",
    "fumbles_recovered" : "&emsp;&emsp;Fumbles Recovered",
    "middle_8": "\"Middle 8\" Plays",
    "middle_8_pass": "&emsp;&emsp;Passes",
    "middle_8_rush": "&emsp;&emsp;Rushes",
    "EPA_middle_8": "&emsp;&emsp;EPA",
    "EPA_middle_8_success": "&emsp;&emsp;During \"Middle 8\"",
    "EPA_middle_8_success_pass": "&emsp;&emsp;Successful Passes (Rate)",
    "EPA_middle_8_success_rush": "&emsp;&emsp;Successful Rushes (Rate)",
    "EPA_middle_8_per_play" : "&emsp;&emsp;EPA/play",
    "EPA_early_down" : "&emsp;&emsp;EPA",
    "EPA_early_down_per_play" : "&emsp;&emsp;EPA/Play",
    "first_downs_created" : "First Downs Created",
    "early_down_first_down" : "&emsp;&emsp;First Downs Created",
    "passes" : "Passes",
    // @ts-ignore
    "rushes" : "Rushes",
    "drives" : "Total",
    "drive_total_gained_yards_rate" : "Available Yards %",
    "yards_per_drive" : "Yards/Drive",
    "plays_per_drive" : "Plays/Drive",
    "avg_field_position": "Avg Starting Field Position",
    "rushing_highlight_yards": "<a href=\"https://www.footballstudyhall.com/2018/2/2/16963820/college-football-advanced-stats-glossary\">Highlight Yards</a>",
    "rushing_highlight_yards_per_opp": "&emsp;&emsp;Per Rush Opportunity",
    "line_yards": "<a href=\"https://www.footballstudyhall.com/2018/2/2/16963820/college-football-advanced-stats-glossary\">OL Line Yards</a>",
    "line_yards_per_carry": "&emsp;&emsp;Per Carry",
    "yards_per_rush": "&emsp;&emsp;Yards/Play",
    "yards_per_pass": "&emsp;&emsp;Yards/Play",
    "yards_per_play": "&emsp;&emsp;Yards/Play",
    "off_yards" : "&emsp;&emsp;Yards",
    "rush_yards" : "&emsp;&emsp;Yards",
    "pass_yards" : "&emsp;&emsp;Yards",
    "total_yards":  "Total Yards",
    "total_off_yards" : "&emsp;&emsp;Offensive Yards",
    "total_sp_yards":"&emsp;&emsp;Special Teams Yards",
    "total_pen_yards":"&emsp;&emsp;Penalty Yards",
    "EPA_misc" : "&emsp;&emsp;Non-Scrimmage/Misc EPA",
    "open_field_yards" : "Open-Field Yards",
    "second_level_yards" : "Second-Level Yards",
    "drive_stopped_rate" : "<a href=\"https://theathletic.com/2419632/2021/03/02/college-football-defense-rankings-stop-rate/\">Stop Rate</a>",
    "EPA_non_explosive" : "EPA w/o Explosive Plays",
    "EPA_non_explosive_per_play" : "&emsp;&emsp;EPA/Play",
    "EPA_non_explosive_passing" : "&emsp;&emsp;When Passing",
    "EPA_non_explosive_passing_per_play" : "&emsp;&emsp;&emsp;&emsp;EPA/Play",
    "EPA_non_explosive_rushing" : "&emsp;&emsp;When Rushing",
    "EPA_non_explosive_rushing_per_play" : "&emsp;&emsp;&emsp;&emsp;EPA/Play"
}
const turnover_vec = [
    "Blocked Field Goal",
    "Blocked Field Goal Touchdown",
    "Blocked Punt",
    "Blocked Punt Touchdown",
    "Field Goal Missed",
    "Missed Field Goal Return",
    "Missed Field Goal Return Touchdown",
    "Fumble Recovery (Opponent)",
    "Fumble Recovery (Opponent) Touchdown",
    "Fumble Return Touchdown",
    "Defensive 2pt Conversion",
    "Interception",
    "Interception Return",
    "Interception Return Touchdown",
    "Pass Interception Return",
    "Pass Interception Return Touchdown",
    "Kickoff Team Fumble Recovery",
    "Kickoff Team Fumble Recovery Touchdown",
    "Punt Touchdown",
    "Punt Return Touchdown",
    "Sack Touchdown",
    "Uncategorized Touchdown"
]

function cleanAbbreviation(team: Away) {
    if (team.abbreviation !== undefined) {
        if (CLEAN_LIST.includes(parseInt(team.id))) {
            return team?.abbreviation.toLocaleLowerCase()
        }
        return team?.abbreviation
    } else {
        return team?.location
    }
}

function cleanName(team: Away) {
    if (team.nickname !== undefined) {
        if (CLEAN_LIST.includes(parseInt(team.id))) {
            return team?.nickname.toLocaleLowerCase()
        }
        return team?.nickname
    } else {
        return team?.location
    }
}

function cleanLocation(team: Away) {
    if (team.location !== undefined) {
        if (CLEAN_LIST.includes(parseInt(team.id))) {
            return team?.location.toLocaleLowerCase()
        }
        return team?.location
    } else {
        return team?.location
    }
}
function getNumberWithOrdinal(n: number) {
    let s = ["th", "st", "nd", "rd"];
    let v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
function formatDown(down: number, playType: string) {
    if (playType.includes("Kickoff")) {
        return "Kickoff"
    } else if (playType.includes("Extra Point") || playType.includes("Conversion")) {
        return "PAT"
    } else if (down > -1) {
        return getNumberWithOrdinal(down)
    } else {
        return down
    }
}
function formatColorRow(play: CFBGamePlay, homeTeam: Competitor, awayTeam: Competitor){
    let classText = "";
    if (turnover_vec.includes(play.type.text) || (play.text.includes("fumble") && play.change_of_poss == 1) || (play.start.down == 4 && parseFloat(play.statYardage.toString()) < parseFloat(play.start.distance.toString()) && !play.type.text.includes('Punt') && !play.type.text.includes('Timeout'))) {
        classText = " table-danger"
    } else if (play.scoringPlay == true) {
        classText = " table-success"
    } else if (play.text.toLocaleLowerCase().includes("penalty")) {
        classText = " table-warning"
    }
}
function formatYardline(yardsToEndzone: number, offenseAbbrev: string, defenseAbbrev: string) {
    if (yardsToEndzone == 50) {
        return "50";
    } else if (yardsToEndzone < 50) {
        return `${defenseAbbrev} ${yardsToEndzone}`
    } else {
        return `${offenseAbbrev} ${100 - yardsToEndzone}`
    }
}
function formatDistance(down: number, type: string, distance: number, yardline: number) {
    let dist = (distance == 0 || yardline <= distance) ? "Goal" : distance
    let downForm: any = formatDown(down, type)
    if (downForm.includes("Kickoff") || downForm.includes("PAT")) {
        return downForm
    } else {
        return downForm + " & " + dist
    }
}
function roundNumber(value: any, power10: number, fixed: number) {
    return (Math.round(parseFloat(value || '0') * (Math.pow(10, power10))) / (Math.pow(10, power10))).toFixed(fixed)
}
function formatPeriod(play: CFBGamePlay){
    let period = `Q${play.period}`;
    if (play.period > 5) {
        period = `${play.period - 4}OT`
    } else if (play.period == 5) {
        period = "OT"
    } else {
        period = `Q${play.period} ${play.clock.displayValue}`;
    }
    return period
}
function formatPlayDescription(play: CFBGamePlay, homeTeam: Competitor, awayTeam: Competitor){
    let offense = (play.start.pos_team.id == play.homeTeamId) ? play.homeTeamId : play.awayTeamId;
    let defense = (play.start.pos_team.id == play.homeTeamId) ? play.awayTeamId : play.homeTeamId;
    let offenseAbbrev = (play.start.pos_team.id == play.homeTeamId) ? play.homeTeamAbbrev : play.awayTeamAbbrev;
    let defenseAbbrev = (play.start.pos_team.id == play.homeTeamId) ? play.awayTeamAbbrev : play.homeTeamAbbrev;

    return <p data-tag="allowRowEvents">{`(${formatDistance(play.start.down, play.type.text, play.start.distance, play.start.yardsToEndzone)}`+
    ' at '+`${formatYardline(play.start.yardsToEndzone, offenseAbbrev, defenseAbbrev)}`+') '+
     play.text}{
     ((play.scoringPlay == true) ? <b>{` - ${play.awayTeamAbbrev} ${play.awayScore}, ${play.homeTeamAbbrev} ${play.homeScore}`}</b> : ` - ${play.awayTeamAbbrev} ${play.awayScore}, ${play.homeTeamAbbrev} ${play.homeScore}`)
     }</p>
}
function formatOffenseLogo(row: CFBGamePlay, homeTeam: Competitor, awayTeam: Competitor, theme?: string){
    let homeTeamLogoUrl = theme === "light" ? homeTeam.team.logos[0].href : homeTeam.team.logos[1].href;
    let awayTeamLogoUrl = theme === "light" ? awayTeam.team.logos[0].href : awayTeam.team.logos[1].href;
    let logoUrl = (row.pos_team == row.homeTeamId) ? homeTeamLogoUrl : awayTeamLogoUrl;
    return <Link href={`/cfb/year/${row.season}/team/${row.pos_team}`}><Image width={"35"} height={"35"} src={logoUrl} alt={`ESPN team id ${row.pos_team}`}/></Link>
}
const columns = [
    {
        name: 'Time',
        id: 'time',
        cell: (row: CFBGameRow) => row.period_text,
        classNames: [''],
    },
    {
        name: 'Offense',
        id: 'offense',
        cell: (row: CFBGameRow) => row.offense_logo,
        classNames: [''],
    },
    {
        name: 'Play Description',
        id: 'play_description',
        selector: (row: CFBGameRow) => row.play_description,
        wrap: true,
        classNames: [''],
    },
    {
        name: 'EPA',
        id: 'epa',
        selector: (row: CFBGameRow) => roundNumber(parseFloat(row.expectedPoints.added.toString()), 2, 2),
        classNames: [''],
    },
    {
        name: 'WP%',
        id: 'wp_pct',
        selector: (row: CFBGameRow) => roundNumber(parseFloat(row.winProbability.before.toString()) * 100, 3, 1) + "%",
        classNames: [''],
    },
    {
        name: 'WPA',
        id: 'wpa',
        selector: (row: CFBGameRow) => roundNumber(parseFloat(row.winProbability.added.toString()) * 100, 4, 1) + "%",
        classNames: [''],
    },
];

// data provides access to your row data
const ExpandedComponent: React.FC<ExpanderComponentProps<CFBGameRow>> = ({ data }) => {
    let offense = (data.start.pos_team.id == data.homeTeamId) ? data.homeTeamId : data.awayTeamId;
    let defense = (data.start.pos_team.id == data.homeTeamId) ? data.awayTeamId : data.homeTeamId;
    let offenseLocation = (data.start.pos_team.id == data.homeTeamId) ? data.homeTeamName : data.awayTeamName;
    let offenseAbbrev = (data.start.pos_team.id == data.homeTeamId) ? data.homeTeamAbbrev : data.awayTeamAbbrev;
    let defenseAbbrev = (data.start.pos_team.id == data.homeTeamId) ? data.awayTeamAbbrev : data.homeTeamAbbrev;
    let fourthDownLink = `https://kazink.shinyapps.io/cfb_fourth_down/?team=${offenseLocation}&pos_score=${data.start.pos_team_score}&def_pos_score=${data.start.def_pos_team_score}&pos_timeouts=${data.start.posTeamTimeouts}&def_timeouts=${data.start.defTeamTimeouts}&distance=${data.start.distance}&yards_to_goal=${data.start.yardsToEndzone}&qtr=${data.period}&minutes=${data.clock.minutes}&seconds=${data.clock.seconds}&posteam_spread=${-1 * parseFloat(data.start.posTeamSpread.toString())}&vegas_ou=${data.overUnder}&season=${data.season}&pos_team_receives_2H_kickoff=${data.modelInputs.start.pos_team_receives_2H_kickoff}&is_home=${data.modelInputs.start.is_home}`;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
            <div className="grid grid-flow-row auto-rows-auto gap-2 p-2 align-center">
                <p className="text-align-center"><b>Play Type:</b> {data.type.text}</p>
                <p className="text-align-center"><b>{`Yards to End Zone (Before -> After):`}</b>
                    {` ${data.start.yardsToEndzone} -> ${data.end.yardsToEndzone}`}
                </p>
                <p className="text-align-center"><b>{`Started Drive at:`}</b>
                    {` ${formatYardline(data.drive_start, offenseAbbrev, defenseAbbrev)}`}
                </p>
                <p className="text-align-center"><b>{`ExpPts (After - Before = Added):`}</b>
                    {` ${roundNumber(parseFloat(data.expectedPoints.after.toString()), 2, 2)} - ${roundNumber(parseFloat(data.expectedPoints.before.toString()), 2, 2)} = ${roundNumber(parseFloat(data.expectedPoints.added.toString()), 2, 2)}`}
                </p>
                <p className="text-align-center"><b>{`Score Difference (Before):`}</b>
                    {` ${data.start.pos_score_diff} (${roundNumber(parseFloat(data.start.ExpScoreDiff.toString()), 2, 2)})`}
                </p>
                <p className="text-align-center"><b>{`Score Difference (Before):`}</b>
                    {` ${data.end.pos_score_diff} (${roundNumber(parseFloat(data.end.ExpScoreDiff.toString()), 2, 2)})`}
                </p>
                <p className="text-align-center"><b>{`Change of Possession:`}</b>{` ${data.change_of_poss}`}
                </p>
            </div>
            <div className="grid grid-flow-row auto-rows-auto gap-2 p-2 align-center">
                <p className="text-align-center"><b>Score:</b>
                    {` ${data.awayTeamAbbrev} ${data.awayScore}, ${data.homeTeamAbbrev} ${data.homeScore}`}
                </p>
                <p className="text-align-center"><b>Drive Summary:</b>
                    {` ${data.drive_play_index} plays, ${data.drive_total_yards} yards`}
                </p>
                <p className="text-align-center"><b>Win Probability (Before):</b>
                    {` ${roundNumber(parseFloat(data.winProbability.before.toString()) * 100, 3, 1)}`}
                </p>
                <p className="text-align-center"><b>Win Probability (After):</b>
                    {` ${roundNumber(parseFloat(data.winProbability.after.toString()) * 100, 3, 1)}`}
                </p>
                <p className="text-align-center">
                    <b>Away Score:</b> {` ${data.start.awayScore} (${data.awayScore})`}   <b>Home Score:</b> {` ${data.start.homeScore} (${data.homeScore})`}
                </p>
                <p className="text-align-center">
                    <b>{`Pos Team Timeouts:`}</b>{` ${data.end.posTeamTimeouts}`} <b>{`Def Pos Team Timeouts:`}</b>{` ${data.end.defPosTeamTimeouts}`}
                </p>
                {data.start.down === 4 ? <p className="text-align-center"><b>Fouth Down Decision Evaluation:</b> <Link href={fourthDownLink} >link</Link></p>: ""}
            </div>
            </div>
        </>
    )
};

interface CFBGameRow extends CFBGamePlay {
    period_text?: string;
    offense_logo?: JSX.Element;
    play_description?: JSX.Element;

}

const conditionalRowStyles = [
    {
      when: (row: CFBGameRow) => (turnover_vec.includes(row.type.text) || (row.text.includes("fumble") && row.change_of_poss == 1) || (row.start.down == 4 && parseFloat(row.statYardage.toString()) < parseFloat(row.start.distance.toString()) && !row.type.text.includes('Punt') && !row.type.text.includes('Timeout'))),
      classNames: ['table-danger'],
    },
    {
      when: (row: CFBGameRow) => row.scoringPlay == true,
      classNames: ['table-success'],
    },
    {
      when: (row: CFBGameRow) => row.text.toLocaleLowerCase().includes("penalty"),
      classNames: ['table-warning'],
    }
];

export default function CFBPlayTable({
    plays,
    title,
    homeTeam,
    awayTeam }: {
        plays: CFBGamePlay[],
        title: string,
        homeTeam: Competitor,
        awayTeam: Competitor }) {

    let localTheme: string;
    if (typeof window !== 'undefined') {
        localTheme = window.localStorage.getItem('theme') || 'light';
        console.log(localTheme)
    }

    // console.log("the theme is: "+ document.documentElement.getAttribute('data-theme')    )
    const newPlays: CFBGameRow[] = [...plays]
    newPlays.forEach((play) => {
        play.period_text = formatPeriod(play)
        play.offense_logo = formatOffenseLogo(play, homeTeam, awayTeam, localTheme)
        play.play_description = formatPlayDescription(play, homeTeam, awayTeam)

    })

    return (
        // @ts-ignore
        <DataTable
            title={title}
            noHeader
            // @ts-ignore
            columns={columns}
            data={newPlays}
            keyField={"game_play_number" || "id"}
            responsive
            expandableRows
            expandOnRowClicked
            expandableRowsHideExpander
            conditionalRowStyles={conditionalRowStyles}
            expandableRowsComponent={ExpandedComponent} />
    );
}