import {useEffect, useState} from 'react';
import axios from 'axios';

import {pyApiOrigin} from '../utils/config';
function espnCfbTeamBox(res) {
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
  const boxDA = boxData.slice(0,15)
  const boxDH = boxData.slice(15,30)
  boxDA.map(d=>d[away] = d.Location)
  boxDH.map(d=>d[home] = d.Location)
  boxDA.forEach((value,key)=> boxDA[key][home]=boxDH[key][home])
  boxDA.map(d=>delete d.Location)
  // console.log(boxDA)
  return [columns,boxDA]
}

function espnCfbPlayerBox(res) {
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

function useCFBGameApi(gameId) {
  const [cfbGameData, setCFBGameData] = useState([]);
  const [cfbGameCols, setCFBGameCols] = useState([]);
  const [cfbPlayerData, setCFBPlayerData] = useState([]);
  const [cfbPlayerCols, setCFBPlayerCols] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${pyApiOrigin}/${gameId}`;
      const res = await axios.get(baseUrl);

      const espnTBox = espnCfbTeamBox(res)
      setCFBGameCols(espnTBox[0])
      setCFBGameData(espnTBox[1]);
      const espnPBox = espnCfbPlayerBox(res)
      setCFBPlayerCols(espnPBox[0])
      setCFBPlayerData(espnPBox[1]);

    };
    fetchData();
  }, [gameId]);

  return [cfbGameData,cfbGameCols,cfbPlayerData,cfbPlayerCols];
}

export default useCFBGameApi;
