import {useEffect, useState} from 'react';
import axios from 'axios';

import {localPyApiOrigin} from '../utils/config';

function useMBBScoreboardApi(year, month, day) {
  const [mbbScoreboardData, setMBBScoreboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${localPyApiOrigin}/mbb/scoreboard`;
      // let stype = seasonType === 'Regular' ? '2' : '3';
      let dt = year+month+day
      console.log(year+month+day);
      const params = {
          dates: dt
      }
      const res = await axios.get(baseUrl,{params});
      setMBBScoreboardData(res.data);

    };
    fetchData();
  }, [year, month, day]);

  return [mbbScoreboardData];
}

export default useMBBScoreboardApi;
