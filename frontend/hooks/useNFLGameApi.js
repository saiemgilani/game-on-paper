import {useEffect, useState} from 'react';
import axios from 'axios';

import {pyApiOrigin} from '../utils/config';
function espnNflTeamBox(res) {
  const columns = [{Header: 'Stat', accessor: 'Stat'}];

  res.data.boxScore.teams.forEach(d =>
    columns.push({Header: d.team.location, accessor: d.team.location })
  );
  const boxData = [];
  res.data.boxScore.teams.forEach(d =>
    d.statistics.forEach(e => boxData.push({Location: e.displayValue, Stat: e.label}))
  )
  const away = columns.map(d=>d.Header)[1]
  const home = columns.map(d=>d.Header)[2]
  const boxDA = boxData.slice(0,25)
  const boxDH = boxData.slice(25,50)
  boxDA.map(d=>d[away] = d.Location)
  boxDH.map(d=>d[home] = d.Location)
  boxDA.forEach((value,key)=> boxDA[key][home]=boxDH[key][home])
  boxDA.map(d=>delete d.Location)
  // console.log(boxDA)
  return [columns,boxDA]
}

function espnNflPlayerBox(res) {
  const plyrColumns = [{Header: 'Athlete', accessor: 'Athlete'}];

  res.data.boxScore.players.forEach(d =>
    plyrColumns.push({Header: d.team.location, accessor: d.team.location })
    );
  // console.log(plyrColumns)
  const boxPlyrData = [];
  res.data.boxScore.players.forEach(d =>
    d.statistics.forEach(e => boxPlyrData.push(e))
  )
  console.log(boxPlyrData)

  return res.data.boxScore.players
}

function espnNflGameHeader(res) {
  return res.data.header.competitions[0].competitors
}
function useNFLGameApi(gameId) {
  const [nflGameData, setNFLGameData] = useState([]);
  const [nflGameCols, setNFLGameCols] = useState([]);
  // const [nflPlayerData, setNFLPlayerData] = useState([]);
  // const [nflPlayerCols, setNFLPlayerCols] = useState([]);
  const [nflGameHeader, setNFLGameHeader] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${pyApiOrigin}/${gameId}`;
      const res = await axios.get(baseUrl);

      const espnTBox = espnNflTeamBox(res)
      setNFLGameCols(espnTBox[0])
      setNFLGameData(espnTBox[1]);
      setNFLGameHeader(espnNflGameHeader(res))
    };
    fetchData();
  }, [gameId]);

  return [nflGameData,nflGameCols,nflGameHeader];
}

export default useNFLGameApi;
