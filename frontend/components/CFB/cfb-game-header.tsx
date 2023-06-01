
import { DateTime } from "luxon"
import { Competitor, Competition } from "@/lib/cfb/types"




export default function CFBGameHeader({ awayTeam, homeTeam, competitions }:
     { awayTeam: Competitor, homeTeam: Competitor, competitions: Competition }) {
    let statusDetail = competitions.status.type.detail;
    let statusText;
    if (competitions.status.type.completed == true || statusDetail.includes("Cancel") || statusDetail.includes("Postpone") || statusDetail.includes("Delay")) {
        statusText = statusDetail + " - " + DateTime.fromISO(competitions.date, {zone: 'utc'}).setZone("America/New_York").toLocaleString(DateTime.DATETIME_FULL);
    } else {
        statusText = "LIVE - " + statusDetail
    }

    const awayTeamLocation = awayTeam.id === '61' ? awayTeam.team.location.toLocaleLowerCase() : awayTeam.team.location
    const homeTeamLocation = homeTeam.id === '61' ? homeTeam.team.location.toLocaleLowerCase() : homeTeam.team.location
    return (
        <>
        <div className="grid grid-flow-row auto-rows-auto justify-center  ">
            <div className="flex px-2 py-2 justify-center items-center gap-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl justify-center font-chivo">
                    {awayTeamLocation + ' ' + awayTeam.score + ' @ ' + homeTeamLocation + ' ' + homeTeam.score }
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
