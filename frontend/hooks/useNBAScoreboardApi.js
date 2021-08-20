import {useEffect, useState} from 'react';
import axios from 'axios';

import {pyApiOrigin} from '../utils/config';

function useNBAScoreboardApi(year, month, day) {
  const [nbaScoreboardData, setNBAScoreboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${pyApiOrigin}/nba/scoreboard`;
      console.log(year+month+day);
      const params = {
          dates: year+month+day
      }
      const res = await axios.get(baseUrl,{params});

      setNBAScoreboardData(res.data);

    };
    fetchData();
  }, [year, month, day]);

  return [nbaScoreboardData];
}

export default useNBAScoreboardApi;
