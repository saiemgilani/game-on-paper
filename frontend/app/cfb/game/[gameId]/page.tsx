import {pyApiOrigin} from '@/lib/urlConfig';
import PageTop from '@/components/page-top';
import ScoreCard from '@/components/score-card';
import { CFBGame, Header } from '@/lib/cfb/types';
import CFBGameHeader from '@/components/cfb-game-header';
import CFBPlayTableRdt from '@/components/cfb-play-table-rdt';
import CFBPlayTable from '@/components/cfb-play-table';
import CFBPlayTableHeader from '@/components/cfb-play-table-header';
import CFBPlayerStatsTable from '@/components/cfb-player-stats-table';
import CFBPlayerStatsHeader from '@/components/cfb-player-stats-header';
import CFBTeamStatsTable from '@/components/cfb-team-stats-table';
import CFBTeamStatsOverallTable from '@/components/cfb-team-stats-overall-table';
async function getCFBGame(params: any) {
    const endpoint = new URL(pyApiOrigin+'/cfb/game/'+params.gameId);
    try{
    const res = await fetch(endpoint , {
        cache: 'no-store' ,
        headers: { 'Content-Type': 'application/json' },
    });
    const resp = res.json()
    return resp;
    } catch (e) {
        console.log(e)
    }
}

 function getTeamInfo(header: Header) {
    const homeTeam = header.competitions[0].competitors[0].homeAway === 'home' ? header.competitions[0].competitors[0] : header.competitions[0].competitors[1];
    const awayTeam = header.competitions[0].competitors[0].homeAway === 'away' ? header.competitions[0].competitors[0] : header.competitions[0].competitors[1];
    const competitions = header.competitions[0];
    const season = header.season?.year

    return { homeTeam, awayTeam, competitions, season }
}

export default async function CFBGamePage({ params }: {
                                         params: {
                                            gameId: number
                                        }
                                    }) {

    const data: CFBGame = await getCFBGame(params);
    const { homeTeam, awayTeam, competitions, season } = getTeamInfo(data.header);

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
                    <a className="p-2 link-secondary" href={`https://www.espn.com/college-football/game/_/gameId/${data.id}`}>Gamecast</a>
                </nav>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 mx-2">
                <div className="grid grid-rows-1 w-1/3 mx-2">
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
                <div className="grid grid-rows-1 w-1/3 mx-2">
                    <div>
                        <CFBTeamStatsTable
                            advBoxScore={data?.advBoxScore ?? []}
                            title={"Explosiveness"}
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            season={season} />
                    </div>
                    <div>
                        <CFBTeamStatsTable
                            advBoxScore={data?.advBoxScore ?? []}
                            title={"Situational"}
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            season={season} />
                    </div>
                </div>
                <div className="grid grid-rows-1 w-1/3 mx-2">

                    <div>
                        <CFBTeamStatsTable
                            advBoxScore={data?.advBoxScore ?? []}
                            title={"Drives"}
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            season={season} />
                    </div>
                    <div>
                        <CFBTeamStatsTable
                            advBoxScore={data?.advBoxScore ?? []}
                            title={"Defensive"}
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            season={season} />
                    </div>
                    <div className="py-2">
                        <CFBTeamStatsTable
                            advBoxScore={data?.advBoxScore ?? []}
                            title={"Turnovers"}
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            season={season} />
                    </div>
                    <div className="py-2">
                        <CFBTeamStatsTable
                            advBoxScore={data?.advBoxScore ?? []}
                            title={"Special Teams"}
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            season={season} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="px-2 py-2">

                {data && data.advBoxScore ? (
                    <CFBPlayerStatsHeader team={awayTeam} season={season} href={'#awayTeamCollapse'}>
                        <CFBPlayerStatsTable
                        title={"Big Plays"}
                        advBoxScore={data?.advBoxScore ?? []}
                        team={awayTeam} />
                    </CFBPlayerStatsHeader> ) : ("")}

                </div>
                <div className="justify-around px-2 py-2">
                {data && data.advBoxScore ? (
                    <CFBPlayerStatsHeader team={homeTeam} season={season} href={'#homeTeamCollapse'}>
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
                        <CFBPlayTableHeader title ={'Big Plays '} href={'#big-plays'} >
                            <CFBPlayTable
                                plays={data?.bigPlays ?? []}
                                prefix={'big'}
                                expandable={true}
                                errorMsg={'No big plays found.'}
                                showGuide={false}
                                expandingRowCallback={true}
                                homeTeam={homeTeam}
                                awayTeam={awayTeam} />
                        </CFBPlayTableHeader>
                    ) : ("")}
                </div>
                <div className="justify-around px-2 py-2">
                    {data && data.mostImportantPlays ? (
                        <CFBPlayTableHeader title ={'Most Important Plays '}  href={'#mip-plays'} >
                            <CFBPlayTable
                                plays={data?.mostImportantPlays ?? []}
                                prefix={'mip'}
                                expandable={true}
                                errorMsg={'No most important plays found.'}
                                showGuide={false}
                                expandingRowCallback={true}
                                homeTeam={homeTeam}
                                awayTeam={awayTeam} />
                        </CFBPlayTableHeader>
                    ) : ("")}
                </div>
            </div>
            <div className="justify-around px-2 py-2">
                {data && data.scoringPlays ? (
                    <CFBPlayTableHeader title ={'Scoring Plays '} href={'#scoring-plays'} >
                        <CFBPlayTable
                            plays={data?.scoringPlays ?? []}
                            prefix={'scoring'}
                            expandable={true}
                            errorMsg={'No scoring plays found.'}
                            showGuide={false}
                            expandingRowCallback={true}
                            homeTeam={homeTeam}
                            awayTeam={awayTeam} />
                    </CFBPlayTableHeader>
                ) : ("")}
            </div>
            <div className="justify-around px-2 py-2">
                {data && data.plays ? (
                    <CFBPlayTableHeader title ={'All Plays '} href={'#all-plays'} >
                        <CFBPlayTable
                            plays={data?.plays ?? []}
                            prefix={'all'}
                            expandable={true}
                            errorMsg={'No plays found.'}
                            showGuide={false}
                            expandingRowCallback={true}
                            homeTeam={homeTeam}
                            awayTeam={awayTeam} />
                    </CFBPlayTableHeader>
                ) : ("")}
            </div>
            {/* new RDT table style */}
            {/*
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

                <div className="grid grid-flow-row auto-rows-auto mx-4">
                    <h2 className="text-2xl font-bold text-left px-2 m-2">Big Plays</h2>
                    <div className="flex flex-auto justify-around px-4 py-2">
                        {data && data.bigPlays ? (
                            <CFBPlayTableRdt
                                title={"Big Plays"}
                                plays={data?.bigPlays ?? []}
                                homeTeam={homeTeam}
                                awayTeam={awayTeam} />
                        ) : ("")}
                    </div>
                </div>
                <div className="grid grid-flow-row auto-rows-auto mx-4">
                    <h2 className="text-2xl font-bold text-left px-2 m-2">Most Important Plays</h2>
                    <div className="flex flex-auto justify-around px-4 py-2">
                        {data && data.mostImportantPlays ? (
                            <CFBPlayTableRdt
                                title={"Most Important Plays"}
                                plays={data?.mostImportantPlays ?? []}
                                homeTeam={homeTeam}
                                awayTeam={awayTeam} />
                        ) : ("")}
                    </div>
                </div>
            </div>
            <h2 className="text-2xl font-bold text-left px-2 m-2">Scoring Plays</h2>
            <div className="flex flex-auto justify-around px-4 py-2">
                {data && data.scoringPlays ? (
                    <CFBPlayTableRdt
                        title={"Scoring Plays"}
                        plays={data?.scoringPlays ?? []}
                        homeTeam={homeTeam}
                        awayTeam={awayTeam} />
                ) : ("")}
            </div>
            <h2 className="text-2xl font-bold text-left px-2 m-2">All Plays</h2>
            <div className="flex flex-auto justify-around px-4 py-2">
                {data && data.plays ? (
                    <CFBPlayTableRdt
                        title={"Play by Play"}
                        plays={data?.plays ?? []}
                        homeTeam={homeTeam}
                        awayTeam={awayTeam} />
                ) : ("")}
            </div> */}
        </>
    )
}