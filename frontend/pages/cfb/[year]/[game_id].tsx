import Link from 'next/link'
import { useTable } from 'react-table';

import useRequest from '../../../libs/useRequest'
const columns = {
  "EPA_plays" : "Total Plays",
  "scrimmage_plays" : "Scrimmage Plays",
  "EPA_overall_total" : "Total EPA",
  "EPA_passing_overall" : "&emsp;&emsp;Passing EPA",
  "EPA_rushing_overall" : "&emsp;&emsp;Rushing EPA",
  "EPA_per_play" : "EPA/Play",
  "EPA_passing_per_play" : "&emsp;&emsp;Pass EPA/Play",
  "EPA_rushing_per_play" : "&emsp;&emsp;Rush EPA/Play",
  "rushes" : "Rushes",
  "rushing_power_success" : "&emsp;&emsp;Power Success Runs",
  "rushing_stuff_rate" : "&emsp;&emsp;Stuffed Runs",
  "rushing_stopped_rate" : "&emsp;&emsp;Stopped Runs",
  "rushing_opportunity_rate" : "&emsp;&emsp;Opportunity Runs",
  "rushing_highlight_run" : "&emsp;&emsp;Highlight Runs",
  "havoc_total" : "Havoc Plays Allowed",
  "havoc_total_pass" : "&emsp;&emsp;Passing",
  "havoc_total_rush" : "&emsp;&emsp;Rushing",
  "EPA_penalty": "Penalty EPA",
  "special_teams_plays" : "Special Teams Plays",
  "EPA_sp" : "Special Teams EPA",
  "EPA_fg" : "&emsp;&emsp;Field Goal EPA",
  "EPA_punt" : "&emsp;&emsp;Punting EPA",
  "EPA_kickoff" : "&emsp;&emsp;Kickoff Return EPA",
  "TFL" : "TFLs Allowed",
  "TFL_pass" : "&emsp;&emsp;Passing",
  "TFL_rush" : "&emsp;&emsp;Rushing",
  "EPA_success" : "EPA Success Plays",
  "EPA_success_pass" : "&emsp;&emsp;Passing",
  "EPA_success_rush" : "&emsp;&emsp;Rushing",
  "EPA_success_standard_down" : "&emsp;&emsp;Standard Down",
  "EPA_success_passing_down": "&emsp;&emsp;Passing Down",
  "EPA_explosive" : "EPA Explosive Plays",
  "EPA_explosive_passing" : "&emsp;&emsp;Passing",
  "EPA_explosive_rushing" : "&emsp;&emsp;Rushing",
  "scoring_opps_opportunities" : "Scoring Opps",
  "scoring_opps_points" : "&emsp;&emsp;Total Points",
  "scoring_opps_pts_per_opp" : "&emsp;&emsp;Points per Opp",
  "field_pos_avg_start" : "Avg Starting FP",
  "field_pos_avg_starting_predicted_pts" : "&emsp;&emsp;Predicted Points"
}
export default function GamePage() {
  const id =
    typeof window !== 'undefined' ? window.location.pathname.slice(1) : ''
  const { data } = useRequest(
    id
      ? {
          url: '/api/sports',
          params: {
            id
          }
        }
      : null
  )
  return (
    <div style={{ textAlign: 'center' }}>

      {data ? (
          
        <><h1>
          <img width="35px" src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${data.gameInfo.competitors[1].team.id}.png`}/> {data.plays[0].awayTeamName}  @
          <img width="35px" src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${data.gameInfo.competitors[0].team.id}.png`}/> {data.plays[0].homeTeamName} </h1>
        <div>
          <p>Game Id: {data.plays[0].homeTeamName} </p>
        </div>
        <div>
            {data.boxscore.teams.team}
        </div>
        </>
      ) : (
        'loading...'
      )}
      <br />
      <br />
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  )
}
