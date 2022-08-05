import React from 'react'
import axios from 'axios'

function MatchStats(props) {
  var items = props.matches.slice(0, 8);
  var matchId;
  var data = [];
  console.log(items)

  items.map((items) => {
    matchId = items.id

    axios({
      method: 'get',
      url: "https://api.pubg.com/shards/steam/matches/" + matchId,
      headers: {
          "Accept": 'application/vnd.api+json',
      },
    }).then(res => {
      data.push(res)
    });
    
    return data;
  })
  
  console.log(data)

  return (
    <div>
        <h1></h1>
    </div>
  )
}

export default MatchStats