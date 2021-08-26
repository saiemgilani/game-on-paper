import {useEffect, useState} from 'react';
import axios from 'axios';
import Router from 'next/router'

import {pyApiOrigin} from '../utils/config';

function useCFBScoreboardApi(season,week,seasonType) {
  const [cfbScoreboardData, setCFBScoreboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      const endpoint = new URL(pyApiOrigin);
      const baseUrl = `${endpoint}/cfb/scoreboard`;
      console.log(baseUrl)
      let stype = week==='Bowls'? '3':(seasonType === '' ? '':(seasonType === 'Regular' ? '2' : '3') );
      let wk = week==='Bowls'? '1' : (seasonType==='Post'? '1':week)
      console.log(stype);
      const params = {
          dates: season,
          week: wk,
          seasontype: stype,
      }
      Router.push({
        pathname: '/cfb/scoreboard',
        query: params,
      })
      const res = await axios.get(baseUrl,{params});

      setCFBScoreboardData(res.data);

    };
    fetchData();
  }, [season,week,seasonType]);

  return [cfbScoreboardData];
}

export default useCFBScoreboardApi;
