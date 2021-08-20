import {useEffect, useState} from 'react';
import axios from 'axios';

import {pyApiOrigin} from '../utils/config';

function useWBBScoreboardApi(year, month, day) {
  const [wbbScoreboardData, setWBBScoreboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${pyApiOrigin}/wbb/scoreboard`;
      // let stype = seasonType === 'Regular' ? '2' : '3';
      let dt = year+month+day
      console.log(year+month+day);
      const params = {
          dates: dt
      }
      const res = await axios.get(baseUrl,{params});
      setWBBScoreboardData(res.data);

    };
    fetchData();
  }, [year, month, day]);

  return [wbbScoreboardData];
}

export default useWBBScoreboardApi;
