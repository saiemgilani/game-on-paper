import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ScoreboardEvent } from "@/lib/types"
import Image, { ImageProps } from "next/image"
import Link from "next/link"
import { ConferenceMap, NetworkMap } from "@/lib/utils"



function dateTime(date: string) {
    let dt = new Date(date);
    let dtString = dt.toLocaleDateString()
    let hours = dt.getHours();
    let minutes = dt.getMinutes();
    let hrs = hours > 12 ? hours - 12 : (hours ===  0 ? hours + 12 : hours);
    let mins = minutes > 10 ? minutes  : '0' + minutes;
    let ampm = hours >= 12 ? 'PM' : 'AM';
    let timeString = hrs + ':' + mins + ampm;
    return dtString + ', ' + timeString;
  }

  function date(date: string) {
    let dt = new Date(date);
    let dtString = dt.toLocaleDateString()
    return dtString;
  }

function myLoader({ src  }: {src: string}) {
    return src
  }

type linescore = {
    value: string
}

function TeamRow({ team, teamAbbreviation, linescores, record, logo, darkLogo, gameStatus, score, showRecords }:
                 {  team: string,
                    teamAbbreviation: string,
                    linescores: linescore[],
                    record: string,
                    logo: string,
                    darkLogo: string,
                    gameStatus: string,
                    score: string,
                    showRecords: boolean }) {
    return (
      <div className="flex px-2 py-2 items-center">
        <div className="w-7/12 md:w-8/12 flex">
          <Image className="w-10 mr-2 self-center inline-block dark:hidden" src={logo} width={30} height={30} alt={team} />
          <Image className="w-10 mr-2 self-center hidden dark:inline-block" src={darkLogo} width={30} height={30} alt={team} />
          <div className="flex flex-col self-center">
            <p className="text-lg font-bold">{teamAbbreviation}</p>
            {showRecords ? <p className="block text-xs  text-gray-600 dark:text-gray-400">{record}</p>: ""}
          </div>
        </div>
        {/** Line Score */}
          {/* <div className="xs:hidden xs:w-5/12 lg:flex lg:w-5/12 justify-end items-center">
            {linescores.length > 0 ? linescores.map((linescore, index) => (
                <p key={index} className="w-8 px-1 text-center">{linescore.value}</p>
              )) : <p className="w-8 px-1 text-center">{""}</p>}
          </div> */}
        {/** Score */}
        <div className="w-4/12 px-2 text-lg sm:text-xl font-bold self-center text-right">
          {gameStatus === 'pre' ? "" : score }
        </div>
      </div>
    )
  }

export default function ScoreCard({ showRecords = true, props }: {showRecords: boolean, props: ScoreboardEvent}) {


    const gameDateTime = dateTime(props.date)

    const gameDate = date(props.date)
    const gameId = props.game_id
    const gameStatus = props.status_type_state
    const awayConferenceId = parseInt(props.away_conference_id)
    const awayConference = ConferenceMap[awayConferenceId] || "CONF"
    const awayRecord = props.away_records.length === 0 ? `(0-0, 0-0 ${awayConference})` : `(${props.away_records[0].summary || props.away_records[0].displayValue}, ${props.away_records[props.away_records.length-1].summary || props.away_records[props.away_records.length-1].displayValue} ${awayConference})`
    const awayLinescores = props.away_linescores
    const awayScore = `${props.away_score || props.away_score_value }`
    const homeConferenceId = parseInt(props.home_conference_id)
    const homeConference = ConferenceMap[homeConferenceId] || "CONF"
    const homeRecord = props.home_records.length === 0 ? `(0-0, 0-0 ${homeConference})` : `(${props.home_records[0].summary || props.home_records[0].displayValue}, ${props.home_records[props.home_records.length-1].summary || props.home_records[props.home_records.length-1].displayValue} ${homeConference})`
    const homeLinescores = props.home_linescores
    const homeScore = `${props.home_score || props.home_score_value }`
    const pbpAvailable = props.play_by_play_available || props.boxscore_available
    const broadcastName = props.broadcast_name || ""
    const broadcastUrl = NetworkMap[broadcastName]
    return (
        <div className="grid grid-flow-row auto-rows-auto">
          <div className="m-8 lg:m-6 xl:mg-4 my-4 max-w-3xl rounded-md overflow-hidden border hover:border-blue-100" >
            {/* Card Header */}
            <div className="flex px-2 py-2">
              <div className="xs:text-xs sm:text-sm xs:w-7/12 sm:w-7/12 lg:flex text-blue-500 text-left ">
                {gameStatus === 'pre' ? gameDateTime : props.status_type_detail + " - " + gameDate}
              </div>
              {/* Line Score */}

              {/* <div className="xs:hidden xs:w-5/12 lg:flex lg:w-5/12 items-center">
                  {(awayLinescores.length > 0 ? awayLinescores.map((linescore, index) => (
                      <p key={index} className="w-8 px-2 text-center">{index+1}</p>
                      )) : <p className="w-8 px-2 text-center">{""}</p>)}
              </div> */}
            </div>

            {/* Away Team */}
            <TeamRow
              key = {props.away_id}
              team={props.away_name}
              teamAbbreviation={props.away_abbreviation}
              linescores= {awayLinescores}
              record={awayRecord}
              logo={props.away_logo}
              darkLogo={props.away_dark_logo}
              gameStatus={gameStatus}
              score={awayScore}
              showRecords={showRecords} />
            {/* Home Team */}
            <TeamRow
              key = {props.home_id}
              team={props.home_name}
              teamAbbreviation={props.home_abbreviation}
              linescores= {homeLinescores}
              record={homeRecord}
              logo={props.home_logo}
              darkLogo={props.home_dark_logo}
              gameStatus={gameStatus}
              score={homeScore}
              showRecords={showRecords} />
            {/* Card Footer */}
            <div className="flex px-2 py-2 justify-between">
              {gameStatus === 'pre' ?
                <Button variant="outline" className="text-lg md:text-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-gray-100">
                  <Link href={`/cfb/game/${gameId}`}>Preview</Link>
                </Button> :  (pbpAvailable ?
                <Button variant="outline" className="text-lg md:text-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-gray-100">
                  <Link href={`/cfb/game/${gameId}`}>Stats</Link>
                </Button> :
                <Button variant="outline" className="text-lg md:text-lg disabled border-blue-200 text-blue-200  hover:bg-none">
                  Stats
                </Button>)}
              {broadcastName !== "" ?
                <Button variant="outline" className="text-lg md:text-lg border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-gray-100">
                  <Link href={`${broadcastUrl}`}>{broadcastName}</Link>
                </Button> : ""
              }
            </div>
          </div>
        </div>
    )
  }