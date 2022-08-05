import React from 'react'
import axios from 'axios'

function MatchStats(props) {
  var items = props.matches.slice(0, 2);
  let url = ""


  items.map((items) => {
    url = items.id

    axios({
      method: 'get',
      url: "https://api.pubg.com/shards/steam/matches/" + url,
      headers: {
          "Accept": 'application/vnd.api+json',
      },
    }).then(res => {
        console.log(res)
    });
  })

  return (
    <div>
        <h1>w</h1>
    </div>
  )
}

export default MatchStats