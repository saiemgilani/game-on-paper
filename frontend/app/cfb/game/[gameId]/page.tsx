import {pyApiOrigin} from '@/lib/urlConfig';
import PageTop from '@/components/page-top';
import ScoreCard from '@/components/score-card';
import { CFBGame, Header } from '@/lib/cfb/types';
import CFBGameHeader from '@/components/cfb-game-header';
import CFBPlayTableRdt from '@/components/cfb-play-table-rdt';
import CFBPlayTable from '@/components/cfb-play-table';
import CFBPlayerStatsTable from '@/components/cfb-player-stats-table';
import CFBPlayerStatsHeader from '@/components/cfb-player-stats-header';
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="justify-around px-2 py-2">

                {data && data.advBoxScore ? (
                    <CFBPlayerStatsHeader team={awayTeam} season={season}>
                        <CFBPlayerStatsTable
                        title={"Big Plays"}
                        advBoxScore={data?.advBoxScore ?? []}
                        team={awayTeam} />
                    </CFBPlayerStatsHeader> ) : ("")}

                </div>
                <div className="justify-around px-2 py-2">
                {data && data.advBoxScore ? (
                    <CFBPlayerStatsHeader team={homeTeam} season={season}>
                        <CFBPlayerStatsTable
                        title={"Big Plays"}
                        advBoxScore={data?.advBoxScore ?? []}
                        team={homeTeam} />
                    </CFBPlayerStatsHeader> ) : ("")}

                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 justify-around py-2">
                <div className="justify-around px-2 py-2">
                    <h2 className="text-2xl font-bold text-left px-2 m-2">Big Plays (orig)</h2>
                        {data && data.bigPlays ? (
                            <CFBPlayTable
                                plays={data?.bigPlays ?? []}
                                prefix={'big'}
                                expandable={true}
                                errorMsg={'No big plays found.'}
                                showGuide={false}
                                expandingRowCallback={true}
                                homeTeam={homeTeam}
                                awayTeam={awayTeam} />
                        ) : ("")}
                </div>
                <div className="justify-around px-2 py-2">
                    <h2 className="text-2xl font-bold text-left px-2 m-2">Most Important Plays (orig)</h2>
                        {data && data.mostImportantPlays ? (
                            <CFBPlayTable
                                plays={data?.mostImportantPlays ?? []}
                                prefix={'mip'}
                                expandable={true}
                                errorMsg={'No most important plays found.'}
                                showGuide={false}
                                expandingRowCallback={true}
                                homeTeam={homeTeam}
                                awayTeam={awayTeam} />
                        ) : ("")}
                </div>
            </div>
            <h2 className="text-2xl font-bold text-left px-2 m-2">Scoring Plays (orig)</h2>
            <div className="flex flex-auto justify-around px-2 py-2">
                {data && data.scoringPlays ? (
                    <CFBPlayTable
                        plays={data?.scoringPlays ?? []}
                        prefix={'scoring'}
                        expandable={true}
                        errorMsg={'No scoring plays found.'}
                        showGuide={false}
                        expandingRowCallback={true}
                        homeTeam={homeTeam}
                        awayTeam={awayTeam} />
                ) : ("")}
            </div>
            <h2 className="text-2xl font-bold text-left px-2 m-2">All Plays (orig)</h2>
            <div className="flex flex-auto justify-around px-2 py-2">
                {data && data.plays ? (
                    <CFBPlayTable
                        plays={data?.plays ?? []}
                        prefix={'all'}
                        expandable={true}
                        errorMsg={'No plays found.'}
                        showGuide={false}
                        expandingRowCallback={true}
                        homeTeam={homeTeam}
                        awayTeam={awayTeam} />
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