import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

function MatchStats(props) {
  // Data from parent script and slice all down to 4
  const [data] = useState(props.matches.slice(0, 11));
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
            <div><button key={data.data.id} onClick={() => props.changeData(data.data.id)} className='rounded-md p-1 bg-indigo-500 text-white hover:bg-indigo-400'>More match info</button></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MatchStats