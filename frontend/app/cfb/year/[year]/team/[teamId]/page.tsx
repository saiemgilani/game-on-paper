import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import { DateTime } from "luxon"
import {pyApiOrigin} from '@/lib/urlConfig';
import CFBSummaryPlayerCard from '@/components/CFB/cfb-summary-player-card';
import CFBSummaryTeamCard from '@/components/CFB/cfb-summary-team-card';
import CFBSummaryTeamStatsTable from '@/components/CFB/cfb-summary-team-stats-table';
import CFBSummaryPlayerStatsTable from '@/components/CFB/cfb-summary-player-stats-table';
import CFBTeamStatsHeader from '@/components/CFB/cfb-team-stats-header';
import ScoreCard from '@/components/score-card';
import { Competitor, Breakdown, Away } from '@/lib/cfb/types';


async function getCFBTeamYear(params: any) {

    const endpoint = new URL(pyApiOrigin+'/cfb/percentiles/'+params.year+'/'+params.teamId);

    const data = await fetch(endpoint, { cache: 'no-store' ,
        headers: { 'Content-Type': 'application/json' }}).then((res) => res.json());
    return data;
}

export async function generateMetadata(
    { params }: { params: { year: string, teamId: string } },
    parent: ResolvingMetadata,
  ): Promise<Metadata> {
    // read route params
    const year = params.year;

    // fetch data
    const endpoint = new URL(pyApiOrigin+'/cfb/percentiles/'+params.year+'/'+params.teamId);

    const data = await fetch(endpoint, { cache: 'no-store' ,
                                          headers: { 'Content-Type': 'application/json' }}).then((res) => res.json());


    // optionally access and extend (rather than replace) parent metadata
    var title = "Team season stats summary for " + data.teamData.location
    var subtitle = params.year + "Season"

    return {
        title: title,
        description: `Advanced stats for ${subtitle}`,
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
            description: `Advanced stats for ${subtitle}`,
            images: {
                url: `${data.teamData.logos[0].href}`,
                alt: title,
            },
        },
        openGraph: {
            title: title,
            description: `Advanced stats for ${subtitle}`,
            url: `https://thegameonpaper.com/cfb/year/${params.year}/team/${params.teamId}`,
            siteName: 'theGameOnPaper.com',
            images: [
                {
                    url: '/gameonpapertext.png',
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

export default async function CFBYearTeamPage({ params }: { params: { year: number, teamId: string } }) {
    const data = await getCFBTeamYear(params);
    const teamData = data.teamData;
    // console.log(teamData)
    const breakdown = parseSummary(data.breakdown);
    // console.log(breakdown)
    const passing = data.players.passing;
    const rushing = data.players.rushing;
    const receiving = data.players.receiving;

    const filtered = teamData.events?.filter((x: any) => ( x.status_type_name !== 'STATUS_CANCELED' && x.status_type_name !== 'STATUS_POSTPONED') )
    return (
        <>
            {/* <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item" aria-current="page">Seasons</li>
                    <li className="breadcrumb-item" aria-current="page"><a href={`/cfb/year/${params.year}`}>{params.year}</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{cleanLocation(teamData.team)}</li>
                    </ol>
                </nav>
            </div> */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-2">
                <div className="col-span-1 min-w-[90%]">
                    <CFBSummaryTeamCard
                        breakdown={breakdown}
                        season = {params.year}
                        team={teamData}
                        />
                </div>
                <div className="col-span-2 min-w-[90%]">
                    <CFBSummaryPlayerCard
                        breakdown={breakdown}
                        players={data.players}
                        season = {params.year}
                        team={teamData}
                        />
                </div>
            </div>
            <div className="px-2 py-2">
                <CFBTeamStatsHeader title={"Breakdown"} href={`cfb/year/${params.year}/team/${params.teamId}#breakdown`}>
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 mb-4">
                    <CFBSummaryTeamStatsTable
                        breakdown={breakdown}
                        title={"Offensive"}
                        target={"offensive"}
                        situation={"overall"}
                        team = {teamData.team}
                        showTeamLogos={false}
                        season = {params.year} />
                    <CFBSummaryTeamStatsTable
                        breakdown={breakdown}
                        title={"When Passing"}
                        target={"offensive"}
                        situation={"passing"}
                        team = {teamData.team}
                        showTeamLogos={false}
                        season = {params.year} />
                    <CFBSummaryTeamStatsTable
                        breakdown={breakdown}
                        title={"When Rushing"}
                        target={"offensive"}
                        situation={"rushing"}
                        team = {teamData.team}
                        showTeamLogos={false}
                        season = {params.year} />

                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 mb-4">

                    <CFBSummaryTeamStatsTable
                        breakdown={breakdown}
                        title={"Defensive"}
                        target={"defensive"}
                        situation={"overall"}
                        team = {teamData.team}
                        showTeamLogos={false}
                        season = {params.year} />
                    <CFBSummaryTeamStatsTable
                        breakdown={breakdown}
                        title={"Against the Pass"}
                        target={"defensive"}
                        situation={"passing"}
                        team = {teamData.team}
                        showTeamLogos={false}
                        season = {params.year} />
                    <CFBSummaryTeamStatsTable
                        breakdown={breakdown}
                        title={"Against the Rush"}
                        target={"defensive"}
                        situation={"rushing"}
                        team = {teamData.team}
                        showTeamLogos={false}
                        season = {params.year} />


                    </div>
                </CFBTeamStatsHeader>
            </div>
            <div className="px-2 py-2">
                <CFBTeamStatsHeader title={"Passing"} href={`cfb/year/${params.year}/team/${params.teamId}#passing`}>
                    <CFBSummaryPlayerStatsTable players={passing} type = {"passing"}/>
                </CFBTeamStatsHeader>
                <CFBTeamStatsHeader title={"Rushing"} href={`cfb/year/${params.year}/team/${params.teamId}#rushing`}>
                    <CFBSummaryPlayerStatsTable players={rushing} type={"rushing"}/>
                </CFBTeamStatsHeader>
                <CFBTeamStatsHeader title={"Receiving"} href={`cfb/year/${params.year}/team/${params.teamId}#receiving`}>
                    <CFBSummaryPlayerStatsTable players={receiving} type={"receiving"}/>
                </CFBTeamStatsHeader>
            </div>

            <div className="px-2 py-2">
            <CFBTeamStatsHeader title={"Schedule"} href={`cfb/year/${params.year}/team/${params.teamId}#schedule`}>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
                {filtered?.map((score: any, i: number) => (
                    <ScoreCard key={i} showRecords={false} props={score} />
                ))}
                </div>
            </CFBTeamStatsHeader>
            </div>
        </>
    )
}