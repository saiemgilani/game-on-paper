import Link from 'next/link'
import { useTable } from 'react-table';

import useRequest from '../../libs/useRequest'

export default function gamePage() {
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
      <h1>Away: {data.plays[0].awayTeamName}  Home: {data.plays[0].homeTeamName} </h1>
      {data ? (
        <div>
          <p>Game Id: {data.gameId} </p>
        </div>
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
