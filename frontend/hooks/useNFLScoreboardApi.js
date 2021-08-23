import {useEffect, useState} from 'react';
import axios from 'axios';

import {pyApiOrigin} from '../utils/config';

function useNFLScoreboardApi(season,week,seasonType) {
  const [nflScoreboardData, setNFLScoreboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(pyApiOrigin)
      const baseUrl = `${pyApiOrigin}/nfl/scoreboard`;
      console.log(baseUrl)
      let stype = week==='Bowls'? '3':(seasonType === '' ? '':(seasonType === 'Regular' ? '2' : '3') );
      let wk = week==='Bowls'? '1' : (seasonType==='Post'? '1':week)
      console.log(stype);
      const params = {
          dates: season,
          week: wk,
          seasontype: stype,
      }
      console.log(params)
      const res = await axios.get(baseUrl,{params});
    console.log(res.data)
      setNFLScoreboardData(res.data);

    };
    fetchData();
  }, [season,week,seasonType]);

  return [nflScoreboardData];
}

export default useNFLScoreboardApi;
