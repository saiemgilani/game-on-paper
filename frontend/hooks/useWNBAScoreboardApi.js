import {useEffect, useState} from 'react';
import axios from 'axios';

import {localPyApiOrigin} from '../utils/config';

function useWNBAScoreboardApi(year, month, day) {
  const [wnbaScoreboardData, setWNBAScoreboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${localPyApiOrigin}/nba/scoreboard`;
      console.log(year+month+day);
      const params = {
          dates: year+month+day
      }
      const res = await axios.get(baseUrl,{params});

      setWNBAScoreboardData(res.data);

    };
    fetchData();
  }, [year, month, day]);

  return [wnbaScoreboardData];
}

export default useWNBAScoreboardApi;
