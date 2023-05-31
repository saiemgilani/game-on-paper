
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import { DateTime } from "luxon"
import {pyApiOrigin} from '@/lib/urlConfig';
import PageTop from '@/components/page-top';
import { CFBGame, Header, Competitor, Away } from '@/lib/cfb/types';
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

async function getCFBGame(params: any) {
    const endpoint = new URL(pyApiOrigin+'/cfb/game/'+params.gameId);

    const data = await fetch(endpoint, { cache: 'no-store' ,
        headers: { 'Content-Type': 'application/json' }}).then((res) => res.json());
    return data;
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
    if (data.header.competitions[0].status.type.completed == true || statusDetail.includes("Cancel") || statusDetail.includes("Postpone") || statusDetail.includes("Delay")) {
        statusText = statusDetail + " - " + DateTime.fromISO(data.header.competitions[0].date, {zone: 'utc'}).setZone("America/New_York").toLocaleString(DateTime.DATETIME_FULL);
    } else {
        statusText = "LIVE - " + statusDetail
    }

    return {
        title: title,
        description: `Advanced stats for ${subtitle} - ${statusText}`,
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
        icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon-16x16.png",
            apple: "/apple-touch-icon.png",
        },
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
export default async function CFBGamePage({ params }: {
                                         params: {
                                            gameId: number
                                        }
                                    }) {

    const data: CFBGame = await getCFBGame(params);
    const { homeTeam, awayTeam, competitions, season } = getTeamInfo(data.header);
    let statusDetail = data.header.competitions[0].status.type.detail;
    let statusText;
    let statusActive: boolean = false;
    if (data.header.competitions[0].status.type.completed == true || statusDetail.includes("Cancel") || statusDetail.includes("Postpone") || statusDetail.includes("Delay")) {
        statusText = statusDetail + " - " + DateTime.fromISO(data.header.competitions[0].date, {zone: 'utc'}).setZone("America/New_York").toLocaleString(DateTime.DATETIME_FULL);
    } else {
        statusText = "LIVE - " + statusDetail
        statusActive = true
    }
    return (
        <>
            <CFBGameHeader awayTeam={awayTeam} homeTeam={homeTeam} competitions={competitions} />
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
}