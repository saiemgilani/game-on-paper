import {useEffect, useState} from 'react';
import axios from 'axios';

import {localPyApiOrigin} from '../utils/config';

function useNBAScoreboardApi(year, month, day, seasonType) {
  const [nbaScoreboardData, setNBAScoreboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${localPyApiOrigin}/nba/scoreboard`;
      console.log(year+month+day);
      const params = {
          dates: year+month+day
      }
      const res = await axios.get(baseUrl,{params});

      setNBAScoreboardData(res.data);

    };
    fetchData();
  }, [year, month, day, seasonType]);

  return [nbaScoreboardData];
}

export default useNBAScoreboardApi;
