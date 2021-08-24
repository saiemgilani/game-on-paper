import {useEffect, useState} from 'react';
import axios from 'axios';

import {pyApiOrigin} from '../utils/config';

function espnWnbaGameHeader(res) {
  return res.data.header.competitions[0].competitors
}
function useWNBAGameApi(gameId) {
  const [wnbaGameData, setWNBAGameData] = useState([]);
  const [wnbaGameCols, setWNBAGameCols] = useState([]);
  const [wnbaGameHeader, setWNBAGameHeader] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${pyApiOrigin}/${gameId}`;
      const res = await axios.get(baseUrl);
      const columns = [{Header: 'Stat', accessor: 'Stat'}];
      const tms = res.data.boxscore.teams.map(d => 
        columns.push({Header: d.team.location, accessor: d.team.location })
        );
      const boxData = [];
      const box = res.data.boxscore.teams.map(d => 
        d.statistics.map(e => boxData.push({Location: e.displayValue, Stat: e.label}))
      )
      const away = columns.map(d=>d.Header)[1]
      const home = columns.map(d=>d.Header)[2]
      const boxDA = boxData.slice(0,20)
      const boxDH = boxData.slice(20,40)
      boxDA.map(d=>d[away] = d.Location)
      boxDH.map(d=>d[home] = d.Location)
      boxDA.forEach((value,key)=> boxDA[key][home]=boxDH[key][home])
      boxDA.map(d=>delete d.Location)
      console.log(boxDA)
      setWNBAGameCols(columns)
      setWNBAGameData(boxDA);
      setWNBAGameHeader(espnWnbaGameHeader(res))
    };
    fetchData();
  }, [gameId]);

  return [wnbaGameData,wnbaGameCols,wnbaGameHeader];
}

export default useWNBAGameApi;
