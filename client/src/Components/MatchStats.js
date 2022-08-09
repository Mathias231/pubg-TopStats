import React, { useState, useEffect } from 'react'
import axios from 'axios'

function MatchStats(props) {
  const [data] = useState(props.matches.slice(0, 5))
  
  useEffect(() => {
    const matchList = [];
    console.log(matchList)
    data.map((data) => {
      axios({
        method: 'get',
        url: 'https://api.pubg.com/shards/steam/matches/' + data.id,
        headers: {
            "Accept": 'application/vnd.api+json',
        },
    }).then(res => {
      matchList.push(res.data)
    });
      return true;
    })
  }, [data]);

  return (
    <div>MatchStats</div>
  )
}

export default MatchStats