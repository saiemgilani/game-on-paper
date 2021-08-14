import {useEffect, useState} from 'react';
import axios from 'axios';

import {localPyApiOrigin} from '../utils/config';

function useMBBScoreboardApi(dates,week) {
  const [mbbScoreboardData, setMBBScoreboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${localPyApiOrigin}/mbb/scoreboard`;
      const params = {
          dates: dates,
          week: week
      }
      const res = await axios.get(baseUrl,params);
    
      setMBBScoreboardData(res.data);

    };
    fetchData();
  }, []);

  return [mbbScoreboardData];
}

export default useMBBScoreboardApi;
