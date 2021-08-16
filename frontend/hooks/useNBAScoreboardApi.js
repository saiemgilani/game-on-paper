import {useEffect, useState} from 'react';
import axios from 'axios';

import {localPyApiOrigin} from '../utils/config';

function useNBAScoreboardApi(dates,week) {
  const [nbaScoreboardData, setNBAScoreboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${localPyApiOrigin}/nba/scoreboard`;
      const params = {
          dates: dates
      }
      const res = await axios.get(baseUrl,params);

      setNBAScoreboardData(res.data);

    };
    fetchData();
  }, []);

  return [nbaScoreboardData];
}

export default useNBAScoreboardApi;
