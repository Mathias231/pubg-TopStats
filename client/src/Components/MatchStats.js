import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function MatchStats(props) {
  // Variables
  const [data] = useState(props.matches.slice(0, 8));
  const [matchList, setMatchList] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(<></>);
  const [killsSelected, setKillsSelected] = useState(true);
  const [tableData, setTableData] = useState(<></>);
  let i = 0;

  const nut = useCallback(async () => {
    // Creates an empty array
    let matchData = [];

    // Fetching latest matches
    for (let match of data) {
      await axios({
        method: 'get',
        url: 'https://api.pubg.com/shards/steam/matches/' + match.id,
        headers: {
          Accept: 'application/vnd.api+json',
        },
      }).then((res) => {
        // Pushing response data into matchData array
        matchData.push(res.data);
      });
    }
    // Updates matchList with matchData
    setMatchList(matchData);
  }, [data]);

  // Run async nut function
  useEffect(() => {
    nut();
  }, [nut]);

  // Display match data
  const displayMatchData = async (event) => {
    let id = event.target.id;
    let match = matchList[id];
    let attributes = match.data.attributes;
    let players = match.included;

    // Finding player in array
    let player = players.find((player) => {
      if (
        player &&
        player.attributes &&
        typeof player.attributes.stats === 'object' &&
        typeof player.attributes.stats.name == 'string'
      ) {
        // Returning player "username"
        return player.attributes.stats.name.toLowerCase() === 'bakern999';
      }
    });

    let topKills = (match, kills) => {
      let { included } = match;
      let filteredIncluded = [];
      setKillsSelected(kills);

      if (kills === true) {
        filteredIncluded = included
          .filter((included) => included.type === 'participant')
          .sort((a, b) => b.attributes.stats.kills - a.attributes.stats.kills);
        console.log('trueeee');
      } else {
        filteredIncluded = included
          .filter((included) => included.type === 'participant')
          .sort(
            (a, b) =>
              b.attributes.stats.damageDealt - a.attributes.stats.damageDealt,
          );
        console.log('damage dealt');
      }

      let top10 = filteredIncluded.slice(0, 10);
      console.log(top10);

      setTableData();
    };

    let playerAttr = player.attributes.stats;
    console.log(playerAttr);
    setSelectedMatch(
      <div className="matchData">
        <h1 className="text-center text-xl">Match Data</h1>
        <div className="grid grid-cols-4 mt-2">
          <div>
            <h3 className="font-bold bg-slate-400">
              Date: {attributes.createdAt.slice(0, 10)}
            </h3>
          </div>
          <div>
            <h3 className="font-bold bg-slate-400">
              Map: {attributes.mapName}
            </h3>
          </div>
          <div>
            <h3 className="font-bold bg-slate-400">
              Gamemode: {attributes.gameMode}
            </h3>
          </div>
          <div>
            <h3 className="font-bold bg-slate-400">
              Match: {attributes.matchType}
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-2">
          <div className="grid border grid-cols-3">
            <div className="text-center">
              <h1>Kills</h1>
              {playerAttr.kills}
            </div>
            <div className="text-center">
              <h1>Assists</h1>
              {playerAttr.assists}
            </div>
            <div className="text-center">
              <h1>DMG Dealt</h1>
              {playerAttr.damageDealt}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <button
              id={id}
              className={`w-42 font-bold border ${
                killsSelected === true ? 'bg-slate-300' : ''
              }`}
              onClick={() => topKills(match, true)}
            >
              Kills
            </button>
            <button
              id={id}
              className={`w-42 font-bold border ${
                killsSelected === false ? 'bg-slate-300' : ''
              }`}
              onClick={() => topKills(match, false)}
            >
              DMG
            </button>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  {killsSelected ? <th>Kills </th> : <th>DMG dealt</th>}
                </tr>
              </thead>
            </table>
            {topKills(match, killsSelected)}
          </div>
        </div>
      </div>,
    );
  };

  //Logging MatchList
  // console.log(matchList);

  return (
    <div className="grid grid-cols-2 mt-1 space-x-4">
      <div className="">
        <div className="space-y-2">
          <h1 className="text-center text-xl">Latest Matches</h1>
          <div className="grid grid-cols-4">
            <div>
              <h3 className="font-bold bg-slate-400">Date</h3>
            </div>
            <div>
              <h3 className="font-bold bg-slate-400">Map</h3>
            </div>
            <div>
              <h3 className="font-bold bg-slate-400">Gamemode</h3>
            </div>
            <div>
              <h3 className="font-bold bg-slate-400">More info</h3>
            </div>
          </div>

          {/* Data */}
          {matchList.map((data) => (
            <div
              className="border shadow-md p-2 bg-neutral-100 border-indigo-500 "
              key={data.data.id}
            >
              <div className="grid grid-cols-4 ">
                <div>
                  <h3 className="font-bold">
                    {data.data.attributes.createdAt.slice(0, 10)}
                  </h3>
                </div>
                <div>
                  <h3 className="font-bold">{data.data.attributes.mapName}</h3>
                </div>
                <div>
                  <h3 className="font-bold">{data.data.attributes.gameMode}</h3>
                </div>
                <div>
                  <button
                    key={data.data.id}
                    id={i}
                    {...i++}
                    onClick={displayMatchData}
                    className="rounded-md p-1 bg-indigo-500 text-white hover:bg-indigo-400 focus:ring focus:ring-lime-500"
                  >
                    More match info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedMatch}
    </div>
  );
}

export default MatchStats;
