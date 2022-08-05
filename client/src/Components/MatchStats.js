import React, { useLayoutEffect, useRef} from 'react'
import axios from 'axios'

function MatchStats(props) {
  // Get X data
  var data = useRef(props.matches.slice(0, 2));
  
  useLayoutEffect(() => {
    let matchId;
    let url;

    data.current.map((data) => {
      matchId = data.id;
      url = "https://api.pubg.com/shards/steam/matches/" + matchId;

      axios({
        method: 'get',
        url: url,
        headers: {
            "Accept": 'application/vnd.api+json',
        },
      }).then(res => {
        console.log(res)
      });


      return true;
    })
  }, [])

  return (
    <div>Error</div>
  )
}

export default MatchStats