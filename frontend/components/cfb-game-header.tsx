import Image from "next/image"
import Link from "next/link"
import { DateTime } from "luxon"
import { Competitor, Competition } from "@/lib/cfb/types"




export default function CFBGameHeader({ awayTeam, homeTeam, competitions }:
     { awayTeam: Competitor, homeTeam: Competitor, competitions: Competition }) {
    let statusDetail = competitions.status.type.detail;
    let statusText;
    if (competitions.status.type.completed == true || statusDetail.includes("Cancel") || statusDetail.includes("Postpone") || statusDetail.includes("Delay")) {
        statusText = statusDetail + " - " + DateTime.fromISO(competitions.date, {zone: 'utc'}).toLocaleString(DateTime.DATETIME_FULL);
    } else {
        statusText = "LIVE - " + statusDetail
    }
    return (
        <>
        <div className="grid grid-flow-row auto-rows-auto justify-center  ">
            <div className="flex px-2 py-2 justify-center items-center gap-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl justify-center font-chivo">
                    {awayTeam.team.location + ' ' + awayTeam.score + ' @ ' + homeTeam.team.location + ' ' + homeTeam.score }
                </h2>
            </div>
            <div className="flex px-2 py-2 justify-center ">
            <p className="flex text-md sm:text-md md:text-md text-gray-700 dark:text-gray-300">
                {statusText}
            </p>
            </div>

        </div>
        </>
    )
}
