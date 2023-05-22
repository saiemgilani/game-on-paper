import {pyApiOrigin} from '@/lib/urlConfig';
import PageTop from '@/components/page-top';
import ScoreCard from '@/components/score-card';
import { CFBGame, Header } from '@/lib/cfb/types';
import CFBGameHeader from '@/components/cfb-game-header';
import CFBPlayTable from '@/components/cfb-play-table';
import CFBPlayerStatsTable from '@/components/cfb-player-stats-table';
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

    return { homeTeam, awayTeam, competitions }
}

export default async function CFBGamePage({ params }: {
                                         params: {
                                            gameId: number
                                        }
                                    }) {

    const data: CFBGame = await getCFBGame(params);
    const { homeTeam, awayTeam, competitions } = getTeamInfo(data.header);

    return (
        <>
            <CFBGameHeader awayTeam={awayTeam} homeTeam={homeTeam} competitions={competitions} />
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="grid grid-flow-row auto-rows-auto mx-4">
                <h2 className="text-2xl font-bold text-left justify-around py-2">{awayTeam.team.location}</h2>
                    {data && data.advBoxScore ? (
                        <CFBPlayerStatsTable
                            title={"Big Plays"}
                            advBoxScore={data?.advBoxScore ?? []}
                            team={awayTeam} />
                    ) : ("")}
                </div>
                <div className="grid grid-flow-row auto-rows-auto mx-4">
                <h2 className="text-2xl font-bold text-left justify-around py-2">{homeTeam.team.location}</h2>
                    {data && data.advBoxScore ? (
                        <CFBPlayerStatsTable
                            title={"Big Plays"}
                            advBoxScore={data?.advBoxScore ?? []}
                            team={homeTeam} />
                    ) : ("")}
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                <div className="grid grid-flow-row auto-rows-auto mx-4">
                    <h2 className="text-2xl font-bold text-left px-2 m-2">Big Plays</h2>
                        {data && data.bigPlays ? (
                            <CFBPlayTable
                                title={"Big Plays"}
                                plays={data?.bigPlays ?? []}
                                homeTeam={homeTeam}
                                awayTeam={awayTeam} />
                        ) : ("")}
                </div>
                <div className="grid grid-flow-row auto-rows-auto mx-4">
                    <h2 className="text-2xl font-bold text-left px-2 m-2">Most Important Plays</h2>
                        {data && data.mostImportantPlays ? (
                            <CFBPlayTable
                                title={"Most Important Plays"}
                                plays={data?.mostImportantPlays ?? []}
                                homeTeam={homeTeam}
                                awayTeam={awayTeam} />
                        ) : ("")}
                </div>
            </div>
            <h2 className="text-2xl font-bold text-left px-2 m-2">Scoring Plays</h2>
            <div className="flex flex-auto justify-around px-4 py-2">
                {data && data.scoringPlays ? (
                    <CFBPlayTable
                        title={"Scoring Plays"}
                        plays={data?.scoringPlays ?? []}
                        homeTeam={homeTeam}
                        awayTeam={awayTeam} />
                ) : ("")}
            </div>
            <h2 className="text-2xl font-bold text-left px-2 m-2">All Plays</h2>
            <div className="flex flex-auto justify-around px-4 py-2">
                {data && data.plays ? (
                    <CFBPlayTable
                        title={"Play by Play"}
                        plays={data?.plays ?? []}
                        homeTeam={homeTeam}
                        awayTeam={awayTeam} />
                ) : ("")}
            </div>
        </>
    )
}