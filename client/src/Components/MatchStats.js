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
  }, [data])

  // Run async function
  useEffect(() => {
    nut();
  }, [nut])

  return (
    <div>MatchStats
      {matchList.map((data) => (
        <h1 key={data.data.id}>www</h1>
      ))}

    </div>
  )
}

export default MatchStats