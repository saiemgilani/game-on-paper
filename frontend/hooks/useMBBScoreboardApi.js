import {useEffect, useState} from 'react';
import axios from 'axios';

import {localPyApiOrigin} from '../utils/config';

function useMBBScoreboardApi(year, month, day, seasonType) {
  const [mbbScoreboardData, setMBBScoreboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${localPyApiOrigin}/mbb/scoreboard`;
      console.log(year+month+day);
      const params = {
          dates: year+month+day,
          seasontype: seasonType
      }
      const res = await axios.get(baseUrl,{params});
      setMBBScoreboardData(res.data);

    };
    fetchData();
  }, [year, month, day, seasonType]);

  return [mbbScoreboardData];
}

export default useMBBScoreboardApi;
