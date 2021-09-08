import {useEffect, useState} from 'react';
import axios from 'axios';

import {pyApiOrigin} from '../utils/config';
function espnCfbTeamBox(res) {
  const columns = [{Header: 'Stat', accessor: 'Stat'}];

  res.data.boxScore.teams.forEach(d =>
    columns.push({Header: d.team.location, accessor: d.team.location })
  );
  const boxData = [];
  res.data.boxScore.teams.forEach(d =>
    d.statistics.forEach(e => boxData.push({Location: e.displayValue, Stat: e.label}))
  )
  const away = columns.map(d=>d.Header)[1]
  const home = columns.map(d=>d.Header)[2]
  const boxDA = boxData.slice(0,15)
  const boxDH = boxData.slice(15,30)
  boxDA.map(d=>d[away] = d.Location)
  boxDH.map(d=>d[home] = d.Location)
  boxDA.forEach((value,key)=> boxDA[key][home]=boxDH[key][home])
  boxDA.map(d=>delete d.Location)
  // console.log(boxDA)
  return [columns,boxDA]
}

function espnCfbPlayerBox(res) {
  const plyrColumns = [{Header: 'Athlete', accessor: 'Athlete'}];

  res.data.boxScore.players.forEach(d =>
    plyrColumns.push({Header: d.team.location, accessor: d.team.location })
    );
  // console.log(plyrColumns)
  const boxPlyrData = [];
  res.data.boxScore.players.forEach(d =>
    d.statistics.forEach(e => boxPlyrData.push(e))
  )
  console.log(boxPlyrData)

  return res.data.boxScore.players
}

function espnCfbGameHeader(res) {
  return res.data.header.competitions[0].competitors
}
function useCFBGameApi(gameId) {
  const [cfbGameData, setCFBGameData] = useState([]);
  const [cfbHomePassBox, setCFBHomePassBox] = useState([]);
  const [cfbAwayPassBox, setCFBAwayPassBox] = useState([]);
  const [cfbHomeRushBox, setCFBHomeRushBox] = useState([]);
  const [cfbAwayRushBox, setCFBAwayRushBox] = useState([]);
  const [cfbHomeRecBox, setCFBHomeRecBox] = useState([]);
  const [cfbAwayRecBox, setCFBAwayRecBox] = useState([]);
  // const [cfbGameCols, setCFBGameCols] = useState([]);
  const [cfbTeamBoxData, setCFBTeamBoxData] = useState([]);
  const [cfbTeamBoxCols, setCFBTeamBoxCols] = useState([]);
  const [cfbPlayerData, setCFBPlayerData] = useState([]);
  const [cfbPlayerCols, setCFBPlayerCols] = useState([]);
  const [cfbGameHeader, setCFBGameHeader] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = `${pyApiOrigin}/${gameId}`;
      const res = await axios.get(baseUrl);
      setCFBGameData(res.data);
      console.log(res.data.box_score.pass)
      const homeTeamId = res.data.homeTeamId
      const awayTeamId = res.data.awayTeamId
      const homePassBox = res.data.box_score.pass.filter(function(itm){
        return homeTeamId.indexOf(itm.pos_team) > -1
      })
      const awayPassBox = res.data.box_score.pass.filter(function(itm){
        return awayTeamId.indexOf(itm.pos_team) > -1
      })
      
      const homeRushBox = res.data.box_score.rush.filter(function(itm){
        return homeTeamId.indexOf(itm.pos_team) > -1
      })
      const awayRushBox = res.data.box_score.rush.filter(function(itm){
        return awayTeamId.indexOf(itm.pos_team) > -1
      })
      const homeRecBox = res.data.box_score.receiver.filter(function(itm){
        return homeTeamId.indexOf(itm.pos_team) > -1
      })
      const awayRecBox = res.data.box_score.receiver.filter(function(itm){
        return awayTeamId.indexOf(itm.pos_team) > -1
      })
      setCFBHomePassBox(homePassBox)
      setCFBAwayPassBox(awayPassBox)
      setCFBHomeRushBox(homeRushBox)
      setCFBAwayRushBox(awayRushBox)
      setCFBHomeRecBox(homeRecBox)
      setCFBAwayRecBox(awayRecBox)
      const espnTBox = espnCfbTeamBox(res)
      setCFBTeamBoxCols(espnTBox[0])
      setCFBTeamBoxData(espnTBox[1]);
      const espnPBox = espnCfbPlayerBox(res)
      setCFBPlayerCols(espnPBox[0])
      setCFBPlayerData(espnPBox[1]);
      const espnGameHeader = espnCfbGameHeader(res)
      console.log(res.data['header']['competitions'][0]['competitors'])
      setCFBGameHeader(espnGameHeader)
    };
    fetchData();
  }, [gameId]);

  return [cfbGameData, 
          cfbHomePassBox, cfbAwayPassBox,
          cfbHomeRushBox, cfbAwayRushBox,
          cfbHomeRecBox, cfbAwayRecBox,
          cfbTeamBoxData, cfbTeamBoxCols,
          cfbPlayerData, cfbPlayerCols, 
          cfbGameHeader];
}

export default useCFBGameApi;
