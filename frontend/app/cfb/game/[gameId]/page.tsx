
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import { DateTime } from "luxon"
import {pyApiOrigin} from '@/lib/urlConfig';
import PageTop from '@/components/page-top';
import { CFBGame, Header, Competitor, Breakdown, Away, TeamData } from '@/lib/cfb/types';
import CFBGameHeader from '@/components/CFB/cfb-game-header';
import CFBPlayTable from '@/components/CFB/cfb-play-table';
import CFBPlayTableHeader from '@/components/CFB/cfb-play-table-header';
import CFBPlayerStatsTable from '@/components/CFB/cfb-player-stats-table';
import CFBPlayerStatsHeader from '@/components/CFB/cfb-player-stats-header';
import CFBTeamStatsTable from '@/components/CFB/cfb-team-stats-table';
import CFBTeamStatsHeader from '@/components/CFB/cfb-team-stats-header';
import CFBTeamStatsOverallTable from '@/components/CFB/cfb-team-stats-overall-table';
import CFBWinProbChartClass from '@/components/CFB/cfb-win-prob-chart-class';
import CFBEpaChartClass from '@/components/CFB/cfb-epa-chart-class';
import CFBSummaryPlayerCard from '@/components/CFB/cfb-summary-player-card';
import CFBSummaryTeamCard from '@/components/CFB/cfb-summary-team-card';
import CFBSummaryTeamStatsTable from '@/components/CFB/cfb-summary-team-stats-table';
import CFBSummaryPlayerStatsTable from '@/components/CFB/cfb-summary-player-stats-table';


async function getCFBGame(params: any) {
    const endpoint = new URL(pyApiOrigin+'/cfb/game/'+params.gameId);

    const data = await fetch(endpoint, { cache: 'no-store' ,
        headers: { 'Content-Type': 'application/json' }}).then((res) => res.json());
    return data;
}

export async function generateMetadata(
    { params }: { params: { gameId: string } },
    parent: ResolvingMetadata,
  ): Promise<Metadata> {
    // read route params
    const gameId = params.gameId;

    // fetch data
    const endpoint = new URL(pyApiOrigin+'/cfb/game/'+ params.gameId);

    const data = await fetch(endpoint, { cache: 'no-store' ,
                                          headers: { 'Content-Type': 'application/json' }}).then((res) => res.json());


    // optionally access and extend (rather than replace) parent metadata
    var title = ""
    var subtitle = ""
    if (data.header.competitions[0].status.type.completed == true || data.header.competitions[0].status.type.name.includes("STATUS_IN_PROGRESS")) {
        title = `Game: ${cleanName(data.header.competitions[0].competitors[1].team)} ${data.header.competitions[0].competitors[1].score}, ${cleanName(data.header.competitions[0].competitors[0].team)} ${data.header.competitions[0].competitors[0].score} | the Game on Paper`
    } else {
        title = `Game: ${cleanName(data.header.competitions[0].competitors[1].team)} vs ${cleanName(data.header.competitions[0].competitors[0].team)} | the Game on Paper`
    }
    subtitle = `${cleanName(data.header.competitions[0].competitors[1].team)} vs ${cleanName(data.header.competitions[0].competitors[0].team)}`;
    let statusDetail = data.header.competitions[0].status.type.detail;
    let statusText;
    let statusActive: boolean = false;
    if (data.header.competitions[0].status.type.completed == true || statusDetail.includes("Cancel") || statusDetail.includes("Postpone") || statusDetail.includes("Delay")) {
        statusText = statusDetail + " - " + DateTime.fromISO(data.header.competitions[0].date, {zone: 'utc'}).setZone("America/New_York").toLocaleString(DateTime.DATETIME_FULL);
    } else if (data.header.competitions[0].status.type.state !== 'pre'){
        statusText = "LIVE - " + statusDetail
        statusActive = true
    } else if (data.header.competitions[0].status.type.state === 'pre') {
        statusText = "Pre-game - " + statusDetail
        statusActive = false
    }

    return {
        title: title,
        description: `Advanced stats for ${subtitle} - ${statusText}`,
        metadataBase: new URL('https://thegameonpaper.com/'),
        referrer: 'origin-when-cross-origin',
        viewport: {
            width: 'device-width',
            initialScale: 1.0,
            maximumScale: 1.0,
            userScalable: false,
        },
        authors: [{ name: 'Akshay Easwaran' }, { name: 'Saiem Gilani'}],
        creator: 'Akshay Easwaran'+', '+'Saiem Gilani',
        themeColor: [
            { media: "(prefers-color-scheme: light)", color: "white" },
            { media: "(prefers-color-scheme: dark)", color: "black" },
        ],
        twitter: {
            card: 'summary',
            creator: '@SportsDataverse',
            title: title,
            description: `Advanced stats for ${subtitle} - ${statusText}`,
            images: {
                url: `https://s.espncdn.com/stitcher/sports/football/college-football/events/${params.gameId}.png?templateId=espn.com.share.1`,
                alt: title,
            },
        },
        openGraph: {
            title: title,
            description: `Advanced stats for ${subtitle} - ${statusText}`,
            url: `https://thegameonpaper.com/cfb/game/${params.gameId}`,
            siteName: 'theGameOnPaper.com',
            images: [
                {
                    url: `https://s.espncdn.com/stitcher/sports/football/college-football/events/${params.gameId}.png?templateId=espn.com.share.1`,
                    width: 1200,
                    height: 630,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        other: {
            medium: 'website',
        }
    };
}


function getTeamInfo(header: Header) {
    const homeTeam = header.competitions[0].competitors[0].homeAway === 'home' ? header.competitions[0].competitors[0] : header.competitions[0].competitors[1];
    const awayTeam = header.competitions[0].competitors[0].homeAway === 'away' ? header.competitions[0].competitors[0] : header.competitions[0].competitors[1];
    const competitions = header.competitions[0];
    const season = header.season?.year

    return { homeTeam, awayTeam, competitions, season }
}
function date(date: string) {
    let dt = new Date(date);
    let dtString = dt.toLocaleDateString()
    return dtString;
}

const CLEAN_LIST = [61]
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

function parseSummary(content: Breakdown[]){
    let result = [];
    for (const item of content) {
        const team: {} = {
            season: item.season,
            teamId: item.team_id,
            team: item.pos_team,
            offensive: {
                overall: {
                    totalPlays: item.plays_off,
                    playsPerGame: item.playsgame_off,
                    totalEPA: item.TEPA_off,
                    epaPerPlay: item.EPAplay_off,
                    epaPerGame: item.EPAgame_off,
                    successRate: item.success_off,
                    startingFP: item.start_position_off,

                    yards: item.yards_off,
                    yardsPerPlay: item.yardsplay_off,
                    yardsPerGame: item.yardsgame_off,

                    playsPerGameRank: item.playsgame_off_rank,
                    totalEPARank: item.TEPA_off_rank,
                    epaPerPlayRank: item.EPAplay_off_rank,
                    epaPerGameRank: item.EPAgame_off_rank,
                    successRateRank: item.success_off_rank,
                    startingFPRank: item.start_position_off_rank,

                    yardsRank: item.yards_off_rank,
                    yardsPerPlayRank: item.yardsplay_off_rank,
                    yardsPerGameRank: item.yardsgame_off_rank,

                    totalAvailableYards: item.total_available_yards_off,
                    totalGainedYards: item.total_gained_yards_off,
                    availableYardsPct: item.available_yards_pct_off,

                    // totalAvailableYardsRank: item.total_available_yards_off_rank,
                    // totalGainedYardsRank: item.total_gained_yards_off_rank,
                    // availableYardsPctRank: item.available_yards_pct_off_rank,

                    stuffedPlayRate: item.play_stuffed_off,
                    stuffedPlayRateRank: item.play_stuffed_off_rank,
                    redZoneSuccessRate: item.red_zone_success_off,
                    redZoneSuccessRateRank: item.red_zone_success_off_rank,
                    thirdDownSuccessRate: item.third_down_success_off,
                    thirdDownSuccessRateRank: item.third_down_success_off_rank,

                    explosiveRate: item.explosive_off,
                    explosiveRateRank: item.explosive_off_rank,
                    havocRate: item.havoc_off,
                    havocRateRank: item.havoc_off_rank,
                },
                passing: {
                    totalPlays: item.plays_off_pass,
                    playsPerGame: item.playsgame_off_pass,
                    totalEPA: item.TEPA_off_pass,
                    epaPerPlay: item.EPAplay_off_pass,
                    epaPerGame: item.EPAgame_off_pass,
                    successRate: item.success_off_pass,
                    // startingFP: item.start_position_off_pass,

                    playsPerGameRank: item.playsgame_off_pass_rank,
                    totalEPARank: item.TEPA_off_pass_rank,
                    epaPerPlayRank: item.EPAplay_off_pass_rank,
                    epaPerGameRank: item.EPAgame_off_pass_rank,
                    successRateRank: item.success_off_pass_rank,
                    // startingFPRank: item.start_position_off_pass_rank,

                    yards: item.yards_off_pass,
                    yardsPerPlay: item.yardsplay_off_pass,
                    yardsPerGame: item.yardsgame_off_pass,

                    yardsRank: item.yards_off_pass_rank,
                    yardsPerPlayRank: item.yardsplay_off_pass_rank,
                    yardsPerGameRank: item.yardsgame_off_pass_rank,

                    stuffedPlayRate: item.play_stuffed_off_pass,
                    stuffedPlayRateRank: item.play_stuffed_off_pass_rank,
                    redZoneSuccessRate: item.red_zone_success_off_pass,
                    redZoneSuccessRateRank: item.red_zone_success_off_pass_rank,
                    thirdDownSuccessRate: item.third_down_success_off_pass,
                    thirdDownSuccessRateRank: item.third_down_success_off_pass_rank,

                    explosiveRate: item.explosive_off_pass,
                    explosiveRateRank: item.explosive_off_pass_rank,
                    havocRate: item.havoc_off_pass,
                    havocRateRank: item.havoc_off_pass_rank,
                },
                rushing: {
                    totalPlays: item.plays_off_rush,
                    playsPerGame: item.playsgame_off_rush,
                    totalEPA: item.TEPA_off_rush,
                    epaPerPlay: item.EPAplay_off_rush,
                    epaPerGame: item.EPAgame_off_rush,
                    successRate: item.success_off_rush,
                    // startingFP: item.start_position_off_rush,

                    playsPerGameRank: item.playsgame_off_rush_rank,
                    totalEPARank: item.TEPA_off_rush_rank,
                    epaPerPlayRank: item.EPAplay_off_rush_rank,
                    epaPerGameRank: item.EPAgame_off_rush_rank,
                    successRateRank: item.success_off_rush_rank,
                    // startingFPRank: item.start_position_off_rush_rank,

                    yards: item.yards_off_rush,
                    yardsPerPlay: item.yardsplay_off_rush,
                    yardsPerGame: item.yardsgame_off_rush,

                    yardsRank: item.yards_off_rush_rank,
                    yardsPerPlayRank: item.yardsplay_off_rush_rank,
                    yardsPerGameRank: item.yardsgame_off_rush_rank,

                    stuffedPlayRate: item.play_stuffed_off_rush,
                    stuffedPlayRateRank: item.play_stuffed_off_rush_rank,
                    redZoneSuccessRate: item.red_zone_success_off_rush,
                    redZoneSuccessRateRank: item.red_zone_success_off_rush_rank,
                    thirdDownSuccessRate: item.third_down_success_off_rush,
                    thirdDownSuccessRateRank: item.third_down_success_off_rush_rank,

                    explosiveRate: item.explosive_off_rush,
                    explosiveRateRank: item.explosive_off_rush_rank,
                    havocRate: item.havoc_off_rush,
                    havocRateRank: item.havoc_off_rush_rank,
                }
            },
            defensive: {
                overall: {
                    totalPlays: item.plays_def,
                    playsPerGame: item.playsgame_def,
                    totalEPA: item.TEPA_def,
                    epaPerPlay: item.EPAplay_def,
                    epaPerGame: item.EPAgame_def,
                    successRate: item.success_def,
                    startingFP: item.start_position_def,

                    playsPerGameRank: item.playsgame_def_rank,
                    totalEPARank: item.TEPA_def_rank,
                    epaPerPlayRank: item.EPAplay_def_rank,
                    epaPerGameRank: item.EPAgame_def_rank,
                    successRateRank: item.success_def_rank,
                    startingFPRank: item.start_position_def_rank,

                    yards: item.yards_def,
                    yardsPerPlay: item.yardsplay_def,
                    yardsPerGame: item.yardsgame_def,

                    yardsRank: item.yards_def_rank,
                    yardsPerPlayRank: item.yardsplay_def_rank,
                    yardsPerGameRank: item.yardsgame_def_rank,

                    totalAvailableYards: item.total_available_yards_def,
                    totalGainedYards: item.total_gained_yards_def,
                    availableYardsPct: item.available_yards_pct_def,

                    // totalAvailableYardsRank: item.total_available_yards_def_rank,
                    // totalGainedYardsRank: item.total_gained_yards_def_rank,
                    // availableYardsPctRank: item.available_yards_pct_def_rank,

                    stuffedPlayRate: item.play_stuffed_def,
                    stuffedPlayRateRank: item.play_stuffed_def_rank,
                    redZoneSuccessRate: item.red_zone_success_def,
                    redZoneSuccessRateRank: item.red_zone_success_def_rank,
                    thirdDownSuccessRate: item.third_down_success_def,
                    thirdDownSuccessRateRank: item.third_down_success_def_rank,

                    explosiveRate: item.explosive_def,
                    explosiveRateRank: item.explosive_def_rank,
                    havocRate: item.havoc_def,
                    havocRateRank: item.havoc_def_rank,
                },
                passing: {
                    totalPlays: item.plays_def_pass,
                    playsPerGame: item.playsgame_def_pass,
                    totalEPA: item.TEPA_def_pass,
                    epaPerPlay: item.EPAplay_def_pass,
                    epaPerGame: item.EPAgame_def_pass,
                    successRate: item.success_def_pass,
                    // startingFP: item.start_position_def_pass,

                    playsPerGameRank: item.playsgame_def_pass_rank,
                    totalEPARank: item.TEPA_def_pass_rank,
                    epaPerPlayRank: item.EPAplay_def_pass_rank,
                    epaPerGameRank: item.EPAgame_def_pass_rank,
                    successRateRank: item.success_def_pass_rank,
                    // startingFPRank: item.start_position_def_pass_rank,

                    yards: item.yards_def_pass,
                    yardsPerPlay: item.yardsplay_def_pass,
                    yardsPerGame: item.yardsgame_def_pass,

                    yardsRank: item.yards_def_pass_rank,
                    yardsPerPlayRank: item.yardsplay_def_pass_rank,
                    yardsPerGameRank: item.yardsgame_def_pass_rank,

                    stuffedPlayRate: item.play_stuffed_def_pass,
                    stuffedPlayRateRank: item.play_stuffed_def_pass_rank,
                    redZoneSuccessRate: item.red_zone_success_def_pass,
                    redZoneSuccessRateRank: item.red_zone_success_def_pass_rank,
                    thirdDownSuccessRate: item.third_down_success_def_pass,
                    thirdDownSuccessRateRank: item.third_down_success_def_pass_rank,

                    explosiveRate: item.explosive_def_pass,
                    explosiveRateRank: item.explosive_def_pass_rank,
                    havocRate: item.havoc_def_pass,
                    havocRateRank: item.havoc_def_pass_rank,
                },
                rushing: {
                    totalPlays: item.plays_def_rush,
                    playsPerGame: item.playsgame_def_rush,
                    totalEPA: item.TEPA_def_rush,
                    epaPerPlay: item.EPAplay_def_rush,
                    epaPerGame: item.EPAgame_def_rush,
                    successRate: item.success_def_rush,
                    // startingFP: item.start_position_def_rush,

                    playsPerGameRank: item.playsgame_def_rush_rank,
                    totalEPARank: item.TEPA_def_rush_rank,
                    epaPerPlayRank: item.EPAplay_def_rush_rank,
                    epaPerGameRank: item.EPAgame_def_rush_rank,
                    successRateRank: item.success_def_rush_rank,
                    // startingFPRank: item.start_position_def_rush_rank,

                    yards: item.yards_def_rush,
                    yardsPerPlay: item.yardsplay_def_rush,
                    yardsPerGame: item.yardsgame_def_rush,

                    yardsRank: item.yards_def_rush_rank,
                    yardsPerPlayRank: item.yardsplay_def_rush_rank,
                    yardsPerGameRank: item.yardsgame_def_rush_rank,

                    stuffedPlayRate: item.play_stuffed_def_rush,
                    stuffedPlayRateRank: item.play_stuffed_def_rush_rank,
                    redZoneSuccessRate: item.red_zone_success_def_rush,
                    redZoneSuccessRateRank: item.red_zone_success_def_rush_rank,
                    thirdDownSuccessRate: item.third_down_success_def_rush,
                    thirdDownSuccessRateRank: item.third_down_success_def_rush_rank,

                    explosiveRate: item.explosive_def_rush,
                    explosiveRateRank: item.explosive_def_rush_rank,
                    havocRate: item.havoc_def_rush,
                    havocRateRank: item.havoc_def_rush_rank,
                }
            },
            differential: {
                overall: {
                    totalEPA: item.TEPA_margin,
                    epaPerPlay: item.EPAplay_margin,
                    epaPerGame: item.EPAgame_margin,
                    successRate: item.success_margin,
                    startingFP: item.start_position_margin,

                    totalEPARank: item.TEPA_margin_rank,
                    epaPerPlayRank: item.EPAplay_margin_rank,
                    epaPerGameRank: item.EPAgame_margin_rank,
                    successRateRank: item.success_margin_rank,
                    startingFPRank: item.start_position_margin_rank,

                    // yards: item.yards_margin,
                    yardsPerPlay: item.yardsplay_margin,
                    // yardsPerGame: item.yardsgame_margin,

                    // yardsRank: item.yards_margin_rank,
                    yardsPerPlayRank: item.yardsplay_margin_rank,
                    // yardsPerGameRank: item.yardsgame_margin_rank,

                    totalAvailableYards: item.total_available_yards_margin,
                    totalGainedYards: item.total_gained_yards_margin,
                    availableYardsPct: item.available_yards_pct_margin,

                    totalAvailableYardsRank: item.total_available_yards_margin_rank,
                    totalGainedYardsRank: item.total_gained_yards_margin_rank,
                    availableYardsPctRank: item.available_yards_pct_margin_rank
                },
                passing: {
                    totalEPA: item.TEPA_margin_pass,
                    epaPerPlay: item.EPAplay_margin_pass,
                    epaPerGame: item.EPAgame_margin_pass,
                    successRate: item.success_margin_pass,
                    // startingFP: item.start_position_margin_pass,

                    totalEPARank: item.TEPA_margin_pass_rank,
                    epaPerPlayRank: item.EPAplay_margin_pass_rank,
                    epaPerGameRank: item.EPAgame_margin_pass_rank,
                    successRateRank: item.success_margin_pass_rank,
                    // startingFPRank: item.start_position_margin_pass_rank,

                    // yards: item.yards_margin_pass,
                    yardsPerPlay: item.yardsplay_margin_pass,
                    // yardsPerGame: item.yardsgame_margin_pass,

                    // yardsRank: item.yards_margin_pass_rank,
                    yardsPerPlayRank: item.yardsplay_margin_pass_rank,
                    // yardsPerGameRank: item.yardsgame_margin_pass_rank
                },
                rushing: {
                    totalEPA: item.TEPA_margin_rush,
                    epaPerPlay: item.EPAplay_margin_rush,
                    epaPerGame: item.EPAgame_margin_rush,
                    successRate: item.success_margin_rush,
                    // startingFP: item.start_position_margin_rush,

                    totalEPARank: item.TEPA_margin_rush_rank,
                    epaPerPlayRank: item.EPAplay_margin_rush_rank,
                    epaPerGameRank: item.EPAgame_margin_rush_rank,
                    successRateRank: item.success_margin_rush_rank,
                    // startingFPRank: item.start_position_margin_rush_rank,

                    // yards: item.yards_margin_rush,
                    yardsPerPlay: item.yardsplay_margin_rush,
                    // yardsPerGame: item.yardsgame_margin_rush,

                    // yardsRank: item.yards_margin_rush_rank,
                    yardsPerPlayRank: item.yardsplay_margin_rush_rank,
                    // yardsPerGameRank: item.yardsgame_margin_rush_rank
                }
            }
        };
        result.push(team);
    }
    return result;
}

export default async function CFBGamePage({ params }: {
                                         params: {
                                            gameId: number
                                        }
                                    }) {

    const data = await getCFBGame(params);
    const { homeTeam, awayTeam, competitions, season } = getTeamInfo(data.header);
    let statusDetail = data.header.competitions[0].status.type.detail;
    let statusText;
    let statusActive: boolean = false;
    if (data.header.competitions[0].status.type.completed == true || statusDetail.includes("Cancel") || statusDetail.includes("Postpone") || statusDetail.includes("Delay")) {
        statusText = statusDetail + " - " + DateTime.fromISO(data.header.competitions[0].date, {zone: 'utc'}).setZone("America/New_York").toLocaleString(DateTime.DATETIME_FULL);
    } else if (data.header.competitions[0].status.type.state !== 'pre'){
        statusText = "LIVE - " + statusDetail
        statusActive = true
    } else if (data.header.competitions[0].status.type.state === 'pre') {
        statusText = "Pre-game - " + statusDetail
        statusActive = false
    }

    if (data.header.competitions[0].status.type.completed == true || statusActive === true){
        return (
            <>
                <CFBGameHeader awayTeam={awayTeam} homeTeam={homeTeam} competitions={competitions} showScores={true} statusText={statusText || ""}/>
                <div className="nav-scroller py-1 mb-3">
                    <nav className="nav flex border justify-between">
                        <a href="#wpChart" className="p-2 link-secondary">WP Chart</a>
                        <a href="#epChart" className="p-2 link-secondary">EPA Chart</a>
                        <a href="#team-stats" className="p-2 link-secondary">Team Stats</a>
                        <a href="#player-stats" className="p-2 link-secondary">Player Stats</a>
                        <a href="#big-plays" className="p-2 link-secondary">Big Plays</a>
                        <a href="#most-imp-plays" className="p-2 link-secondary">Most Important Plays</a>
                        <a href="#scoring-plays" className="p-2 link-secondary">Scoring Plays</a>
                        <a href="#all-plays" className="p-2 link-secondary">All Plays</a>
                        <a href={`https://www.espn.com/college-football/game/_/gameId/${data.id}`} className="p-2 link-secondary">Gamecast</a>
                    </nav>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="px-2 py-2">

                        <CFBWinProbChartClass plays = {data?.plays ?? []}
                                            awayTeam = {awayTeam}
                                            homeTeam = {homeTeam}
                                            competitions={data.header.competitions}
                                            homeTeamSpread={data.homeTeamSpread}
                                            overUnder={data.overUnder}
                                            gei={data.gei}
                        />
                    </div>
                    <div className="px-2 py-2">

                        <CFBEpaChartClass plays = {data?.plays ?? []}
                                            awayTeam = {awayTeam}
                                            homeTeam = {homeTeam}
                                            competitions={data.header.competitions}
                        />
                    </div>
                </div>
                <div className="px-2 py-2">
                    {data && data.advBoxScore ? (
                        <CFBTeamStatsHeader title={"Team Stats "} href={`cfb/game/${params.gameId}#team-stats`}>
                        <div className="grid grid-cols-1 lg:grid-cols-3  justify-around gap-2">
                            <div className=" justify-around">
                                    <CFBTeamStatsOverallTable
                                        advBoxScore={data?.advBoxScore ?? []}
                                        percentiles = {data?.percentiles ?? []}
                                        title={"Overall"}
                                        awayTeam={awayTeam}
                                        homeTeam={homeTeam}
                                        season={season} />
                                    <CFBTeamStatsTable
                                        advBoxScore={data?.advBoxScore ?? []}
                                        title={"Expected Points"}
                                        awayTeam={awayTeam}
                                        homeTeam={homeTeam}
                                        season={season} />
                                    <CFBTeamStatsTable
                                        advBoxScore={data?.advBoxScore ?? []}
                                        title={"Production"}
                                        awayTeam={awayTeam}
                                        homeTeam={homeTeam}
                                        season={season} />
                                    <CFBTeamStatsTable
                                        advBoxScore={data?.advBoxScore ?? []}
                                        title={"Rushing"}
                                        awayTeam={awayTeam}
                                        homeTeam={homeTeam}
                                        season={season} />
                            </div>
                            <div className=" justify-around">
                                    <CFBTeamStatsTable
                                        advBoxScore={data?.advBoxScore ?? []}
                                        title={"Explosiveness"}
                                        awayTeam={awayTeam}
                                        homeTeam={homeTeam}
                                        season={season} />
                                    <CFBTeamStatsTable
                                        advBoxScore={data?.advBoxScore ?? []}
                                        title={"Situational"}
                                        awayTeam={awayTeam}
                                        homeTeam={homeTeam}
                                        season={season} />
                            </div>
                            <div className=" justify-around">
                                    <CFBTeamStatsTable
                                        advBoxScore={data?.advBoxScore ?? []}
                                        title={"Drives"}
                                        awayTeam={awayTeam}
                                        homeTeam={homeTeam}
                                        season={season} />
                                    <CFBTeamStatsTable
                                        advBoxScore={data?.advBoxScore ?? []}
                                        title={"Defensive"}
                                        awayTeam={awayTeam}
                                        homeTeam={homeTeam}
                                        season={season} />
                                    <CFBTeamStatsTable
                                        advBoxScore={data?.advBoxScore ?? []}
                                        title={"Turnovers"}
                                        awayTeam={awayTeam}
                                        homeTeam={homeTeam}
                                        season={season} />
                                    <CFBTeamStatsTable
                                        advBoxScore={data?.advBoxScore ?? []}
                                        title={"Special Teams"}
                                        awayTeam={awayTeam}
                                        homeTeam={homeTeam}
                                        season={season} />
                            </div>
                        </div>
                        </CFBTeamStatsHeader>
                    )  : ("")}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="px-2 py-2">

                    {data && data.advBoxScore ? (
                        <CFBPlayerStatsHeader team={awayTeam} season={season} href={`cfb/game/${params.gameId}#awayTeamCollapse`}>
                            <CFBPlayerStatsTable
                            title={"Big Plays"}
                            advBoxScore={data?.advBoxScore ?? []}
                            team={awayTeam} />
                        </CFBPlayerStatsHeader> ) : ("")}

                    </div>
                    <div className="justify-around px-2 py-2">
                    {data && data.advBoxScore ? (
                        <CFBPlayerStatsHeader team={homeTeam} season={season} href={`cfb/game/${params.gameId}#homeTeamCollapse`}>
                            <CFBPlayerStatsTable
                            title={"Big Plays"}
                            advBoxScore={data?.advBoxScore ?? []}
                            team={homeTeam} />
                        </CFBPlayerStatsHeader> ) : ("")}

                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 justify-around py-2">
                    <div className="justify-around px-2 py-2">
                        {data && data.bigPlays ? (
                            <CFBPlayTableHeader title ={'Big Plays '} href={`cfb/game/${params.gameId}#big-plays`} >
                                <CFBPlayTable
                                    plays={data?.bigPlays ?? []}
                                    prefix={'big'}
                                    expandable={true}
                                    errorMsg={'No big plays found.'}
                                    showGuide={false}
                                    expandingRowCallback={true}
                                    homeTeam={homeTeam}
                                    awayTeam={awayTeam}
                                    reversed={false} />
                            </CFBPlayTableHeader>
                        ) : ("")}
                    </div>
                    <div className="justify-around px-2 py-2">
                        {data && data.mostImportantPlays ? (
                            <CFBPlayTableHeader title ={'Most Important Plays '}  href={`cfb/game/${params.gameId}#most-imp-plays`} >
                                <CFBPlayTable
                                    plays={data?.mostImportantPlays ?? []}
                                    prefix={'mip'}
                                    expandable={true}
                                    errorMsg={'No most important plays found.'}
                                    showGuide={false}
                                    expandingRowCallback={true}
                                    homeTeam={homeTeam}
                                    awayTeam={awayTeam}
                                    reversed={false} />
                            </CFBPlayTableHeader>
                        ) : ("")}
                    </div>
                </div>
                <div className="justify-around px-2 py-2">
                    {data && data.scoringPlays ? (
                        <CFBPlayTableHeader title ={'Scoring Plays '} href={`cfb/game/${params.gameId}#scoring-plays`} >
                            <CFBPlayTable
                                plays={data?.scoringPlays ?? []}
                                prefix={'scoring'}
                                expandable={true}
                                errorMsg={'No scoring plays found.'}
                                showGuide={false}
                                expandingRowCallback={true}
                                homeTeam={homeTeam}
                                awayTeam={awayTeam}
                                reversed={false} />
                        </CFBPlayTableHeader>
                    ) : ("")}
                </div>
                <div className="justify-around px-2 py-2">
                    {data && data.plays ? (
                        <CFBPlayTableHeader title ={'All Plays '} href={`cfb/game/${params.gameId}#all-plays`} >
                            <CFBPlayTable
                                plays={data?.plays ?? []}
                                prefix={'all'}
                                expandable={true}
                                errorMsg={'No plays found.'}
                                showGuide={false}
                                expandingRowCallback={true}
                                homeTeam={homeTeam}
                                awayTeam={awayTeam}
                                reversed={statusActive} />
                        </CFBPlayTableHeader>
                    ) : ("")}
                </div>
            </>
        )
    } else if (data.header.competitions[0].status.type.state === 'pre'){
        const awayTeamBreakdown = parseSummary(data.awayTeamMatchup.breakdown);
        // console.log(breakdown)
        const awayTeamPassing = data.awayTeamMatchup.players.passing;
        const awayTeamRushing = data.awayTeamMatchup.players.rushing;
        const awayTeamReceiving = data.awayTeamMatchup.players.receiving;

        const homeTeamBreakdown = parseSummary(data.homeTeamMatchup.breakdown);
        // console.log(breakdown)
        const homeTeamPassing = data.homeTeamMatchup.players.passing;
        const homeTeamRushing = data.homeTeamMatchup.players.rushing;
        const homeTeamReceiving = data.homeTeamMatchup.players.receiving;

        return (
            <>
            <div>

            <CFBGameHeader awayTeam={awayTeam} homeTeam={homeTeam} competitions={competitions} showScores={false} statusText={statusText || ""} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mb-2">
                <div className="col-span-1 min-w-[90%]">
                    <CFBSummaryTeamCard
                        breakdown={awayTeamBreakdown}
                        season = {data.season}
                        team={data.awayTeamMatchup.teamData}
                        />
                </div>
                <div className="col-span-1 min-w-[90%]">
                    <CFBSummaryTeamCard
                            breakdown={homeTeamBreakdown}
                            season = {data.season}
                            team={data.homeTeamMatchup.teamData}
                            />
                </div>
            </div>
            <div className="px-2 py-2">
                <CFBTeamStatsHeader title={"Breakdown"} href={`cfb/game/${params.gameId}#breakdown`}>
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 mb-4">
                    <CFBSummaryTeamStatsTable
                        breakdown={awayTeamBreakdown}
                        awayBreakdown={awayTeamBreakdown}
                        homeBreakdown={homeTeamBreakdown}
                        title={"Offensive"}
                        target={"offensive"}
                        situation={"overall"}
                        team = {data.awayTeamMatchup.teamData}
                        awayTeam = {data.awayTeamMatchup.teamData}
                        homeTeam = {data.homeTeamMatchup.teamData}
                        showTeamLogos={true}
                        season = {data.season} />
                    <CFBSummaryTeamStatsTable
                        breakdown={awayTeamBreakdown}
                        awayBreakdown={awayTeamBreakdown}
                        homeBreakdown={homeTeamBreakdown}
                        title={"When Passing"}
                        target={"offensive"}
                        situation={"passing"}
                        team = {data.awayTeamMatchup.teamData}
                        awayTeam = {data.awayTeamMatchup.teamData}
                        homeTeam = {data.homeTeamMatchup.teamData}
                        showTeamLogos={true}
                        season = {data.season} />
                    <CFBSummaryTeamStatsTable
                        breakdown={awayTeamBreakdown}
                        awayBreakdown={awayTeamBreakdown}
                        homeBreakdown={homeTeamBreakdown}
                        title={"When Rushing"}
                        target={"offensive"}
                        situation={"rushing"}
                        team = {data.awayTeamMatchup.teamData}
                        awayTeam = {data.awayTeamMatchup.teamData}
                        homeTeam = {data.homeTeamMatchup.teamData}
                        showTeamLogos={true}
                        season = {data.season} />

                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 mb-4">

                    <CFBSummaryTeamStatsTable
                        breakdown={awayTeamBreakdown}
                        awayBreakdown={awayTeamBreakdown}
                        homeBreakdown={homeTeamBreakdown}
                        title={"Defensive"}
                        target={"defensive"}
                        situation={"overall"}
                        team = {data.awayTeamMatchup.teamData}
                        awayTeam = {data.awayTeamMatchup.teamData}
                        homeTeam = {data.homeTeamMatchup.teamData}
                        showTeamLogos={true}
                        season = {data.season} />
                    <CFBSummaryTeamStatsTable
                        breakdown={awayTeamBreakdown}
                        awayBreakdown={awayTeamBreakdown}
                        homeBreakdown={homeTeamBreakdown}
                        title={"Against the Pass"}
                        target={"defensive"}
                        situation={"passing"}
                        team = {data.awayTeamMatchup.teamData}
                        awayTeam = {data.awayTeamMatchup.teamData}
                        homeTeam = {data.homeTeamMatchup.teamData}
                        showTeamLogos={true}
                        season = {data.season} />
                    <CFBSummaryTeamStatsTable
                        breakdown={awayTeamBreakdown}
                        awayBreakdown={awayTeamBreakdown}
                        homeBreakdown={homeTeamBreakdown}
                        title={"Against the Rush"}
                        target={"defensive"}
                        situation={"rushing"}
                        team = {data.awayTeamMatchup.teamData}
                        awayTeam = {data.awayTeamMatchup.teamData}
                        homeTeam = {data.homeTeamMatchup.teamData}
                        showTeamLogos={true}
                        season = {data.season} />


                    </div>
                </CFBTeamStatsHeader>
            </div>
            </div>
            </>
        )
    }
}