import {pyApiOrigin} from '@/lib/urlConfig';
import PageTop from '@/components/page-top';
import ScoreCard from '@/components/score-card';
import { CFBGame, Header } from '@/lib/cfb/types';
import CFBGameHeader from '@/components/cfb-game-header';
import CFBTable from '@/components/cfb-table';
async function getCFBGame(params: any) {
    // console.log(pyApiOrigin+'/cfb/scoreboard')

    const endpoint = new URL(pyApiOrigin+'/cfb/game/'+params.gameId);
    console.log(endpoint)
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
        <div>
            <CFBGameHeader awayTeam={awayTeam} homeTeam={homeTeam} competitions={competitions} />
            <div className="flex flex-auto justify-around px-4">
                {data && data.scoringPlays ? (
                    <CFBTable
                        title={"Scoring Plays"}
                        plays={data?.scoringPlays ?? []}
                        homeTeam={homeTeam}
                        awayTeam={awayTeam} />
                ) : ("")}
            </div>
            <div className="flex flex-auto justify-around px-4">
                {data && data.plays ? (
                    <CFBTable
                        title={"Play by Play"}
                        plays={data?.plays ?? []}
                        homeTeam={homeTeam}
                        awayTeam={awayTeam} />
                ) : ("")}
            </div>
        </div>
        </>
    )
}