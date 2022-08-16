import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

function MatchStats(props) {
  // Variables
  const [data] = useState(props.matches.slice(0, 8));
  const [matchList, setMatchList] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(<></>);
  let i = 0;

  const nut = useCallback(async () => {
    // Creates an empty array
    let matchData = [];

    // Fetching latest matches
    for(let match of data) {
      await axios({
        method: 'get',
        url: 'https://api.pubg.com/shards/steam/matches/' + match.id,
        headers: {
            "Accept": 'application/vnd.api+json',
        },
      }).then(res => {
        // Pushing response data into matchData array
        matchData.push(res.data);
      });
    }
    // Updates matchList with matchData
    setMatchList(matchData)
  }, [data]);

  // Run async nut function
  useEffect(() => {
    nut();
  }, [nut]);

  const displayMatchData = async (event) => {
    let id = event.target.id;
    let match = matchList[id];
    let attributes = match.data.attributes;
    let players = match.included;
    
    // Finding player in array
    let player = players.find((player) => {
      if(player && player.attributes && typeof player.attributes.stats === "object" && typeof player.attributes.stats.name == "string") {
        // Returning player "username"
        return player.attributes.stats.name.toLowerCase() === "bakern999";
      }
    })

    let playerAttr = player.attributes.stats;
    console.log(playerAttr)
    setSelectedMatch(
      <div className="matchData">
        <h1 className='text-center text-xl'>Match Data</h1>
        <div className='grid grid-cols-4 mt-2'>
            <div>
                <h3 className='font-bold bg-slate-400'>Date: {attributes.createdAt.slice(0, 10)}</h3>
            </div>
            <div>
                <h3 className='font-bold bg-slate-400'>Map: {attributes.mapName}</h3>
            </div>
            <div>
                <h3 className='font-bold bg-slate-400'>Gamemode: {attributes.gameMode}</h3>
            </div>
            <div>
                <h3 className='font-bold bg-slate-400'>Match: {attributes.matchType}</h3>
            </div>
        </div>
        <div className='grid grid-cols-2 mt-2'>
          <div>
            {playerAttr.heals + " heals"}
            {/* Player stats  */}
          </div>
          <div>
            {/* table */}
          </div>
        </div>
    </div>
    )
  }

  //Logging MatchList
  // console.log(matchList);
 
  return (
  <div className='grid grid-cols-2 mt-1 space-x-4'>
    <div className="">
      <div className='space-y-2'>
        <h1 className='text-center text-xl'>Latest Matches</h1>
        <div className='grid grid-cols-4'>
              <div><h3 className='font-bold bg-slate-400'>Date</h3></div>
              <div><h3 className='font-bold bg-slate-400'>Map</h3></div>
              <div><h3 className='font-bold bg-slate-400'>Gamemode</h3></div>
              <div><h3 className='font-bold bg-slate-400'>More info</h3></div>
        </div>

        {/* Data */}
        {matchList.map((data) => (
          <div className='border shadow-md p-2 bg-neutral-100 border-indigo-500 ' key={data.data.id}>
            <div className='grid grid-cols-4 '>
              <div><h3 className='font-bold'>{data.data.attributes.createdAt.slice(0, 10)}</h3></div>
              <div><h3 className='font-bold'>{data.data.attributes.mapName}</h3></div>
              <div><h3 className='font-bold'>{data.data.attributes.gameMode}</h3></div>
              <div><button 
              key={data.data.id} id={i}{...i++} 
              onClick={displayMatchData} 
              className='rounded-md p-1 bg-indigo-500 text-white hover:bg-indigo-400 focus:ring focus:ring-lime-500'>More match info</button></div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {selectedMatch}
  </div>

  )
}

export default MatchStats