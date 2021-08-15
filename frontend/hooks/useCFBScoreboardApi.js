import {useEffect, useState} from 'react';
import axios from 'axios';

import {localPyApiOrigin} from '../utils/config';

function useCFBScoreboardApi(dates,week) {
  const [cfbScoreboardData, setCFBScoreboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${localPyApiOrigin}/cfb/scoreboard`;
      const params = {
          dates: dates,
          week: week
      }
      const res = await axios.get(baseUrl,{params});
    console.log(res.data)
      setCFBScoreboardData(res.data);

    };
    fetchData();
  }, []);

  return [cfbScoreboardData];
}

export default useCFBScoreboardApi;
