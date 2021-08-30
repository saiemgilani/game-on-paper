import {useEffect, useState} from 'react';
import axios from 'axios';
import Router from 'next/router'

import {pyApiOrigin} from '../utils/config';

function useMBBScoreboardApi(year, month, day, seasonType) {
  const [mbbScoreboardData, setMBBScoreboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = new URL(pyApiOrigin);
      const baseUrl = `${endpoint}/mbb/scoreboard`;
      const stype = seasonType === '' ? '':(seasonType === 'Regular' ? '2' : '3');
      const dt = year+month+day
      console.log(year+month+day);
      const params = {
          dates: dt,
          seasontype: stype,
      }
      Router.push({
        pathname: '/mbb/scoreboard',
        query: params,
      })
      const res = await axios.get(baseUrl,{params});
      setMBBScoreboardData(res.data);

    };
    fetchData();
  }, [year, month, day, seasonType]);

  return [mbbScoreboardData];
}

export default useMBBScoreboardApi;
