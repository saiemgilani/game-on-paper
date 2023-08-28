
import { DateTime } from "luxon"
import { Competitor, Competition } from "@/lib/cfb/types"




export default function CFBGameHeader({ awayTeam, homeTeam, competitions, showScores, statusText }:
     { awayTeam: Competitor, homeTeam: Competitor, competitions: Competition, showScores: boolean, statusText: string }) {


    const awayTeamLocation = awayTeam.id === '61' ? awayTeam.team.location.toLocaleLowerCase() : awayTeam.team.location
    const homeTeamLocation = homeTeam.id === '61' ? homeTeam.team.location.toLocaleLowerCase() : homeTeam.team.location
    return (
        <>
        <div className="grid grid-flow-row auto-rows-auto justify-center  ">
            <div className="flex px-2 py-2 justify-center items-center gap-3">
                <h2 className="text-md sm:text-xl md:text-2xl justify-center font-chivo">
                    {showScores ? (awayTeamLocation + ' ' + awayTeam.score + ' @ ' + homeTeamLocation + ' ' + homeTeam.score):
                      (awayTeamLocation + ' @ ' + homeTeamLocation )}
                </h2>
            </div>
            <div className="flex px-2 justify-center ">
            <p className="flex text-sm sm:text-sm md:text-md text-gray-700 dark:text-gray-300">
                {statusText}
            </p>
            </div>

        </div>
        </>
    )
}
