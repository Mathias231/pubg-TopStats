import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

function MatchStats(props) {
  // Data from parent script and slice all down to 4
  const [data] = useState(props.matches.slice(0, 10));
  const [matchList, setMatchList] = useState([]);

  const nut = useCallback(async () => {
    // Creates an empty array
    let matchData = [];

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

  // Run async function
  useEffect(() => {
    nut();
  }, [nut]);
      
  //Logging MatchList
  console.log(matchList);

  return (
    <div className='space-y-2'>
      <h1 className='text-center text-xl'>MatchStats</h1>
      {matchList.map((data) => (
        <div className='border border-indigo-500 shadow-md' key={data.data.id}>
          <h3 className='font-bold'>Time: {data.data.attributes.createdAt.slice(0, 10)}</h3>
          <h3 className='font-bold' key={data.data.id}>Map: {data.data.attributes.mapName}</h3>
          <h3 className='font-bold'>Gamemode: {data.data.attributes.gameMode}</h3>
        </div>
      ))}
    </div>
  )
}

export default MatchStats