import {useEffect, useState} from 'react';
import axios from 'axios';

import {localPyApiOrigin} from '../utils/config';

function useMBBScoreboardApi(year,month,day) {
  const [mbbScoreboardData, setMBBScoreboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${localPyApiOrigin}/mbb/scoreboard`;
      console.log(year+month+day);
      const params = {
          dates: year+month+day
      }
      const res = await axios.get(baseUrl,{params});
    
      setMBBScoreboardData(res.data);

    };
    fetchData();
  }, [year,month,day]);

  return [mbbScoreboardData];
}

export default useMBBScoreboardApi;
