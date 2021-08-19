import {useEffect, useState} from 'react';
import axios from 'axios';

import {localPyApiOrigin} from '../utils/config';

function useCFBScoreboardApi(season,week,seasonType) {
  const [cfbScoreboardData, setCFBScoreboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${localPyApiOrigin}/cfb/scoreboard`;
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
      setCFBScoreboardData(res.data);

    };
    fetchData();
  }, [season,week,seasonType]);

  return [cfbScoreboardData];
}

export default useCFBScoreboardApi;
