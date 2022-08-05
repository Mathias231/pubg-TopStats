import React, { useState, useLayoutEffect, useRef} from 'react'
import axios from 'axios'

function MatchStats(props) {
  // Get X data
  var data = useRef(props.matches.slice(0, 2));
  const [matchData, setMatchData] = useState([]);

  useLayoutEffect(() => {
    let matchId;
    let url;

    data.current.map((data) => {
      matchId = data.id;
      url = "https://api.pubg.com/shards/steam/matches/" + matchId;
      // MAke an array here and push data from .then into this THEN return this array at the bottom 

      axios({
        method: 'get',
        url: url,
        headers: {
            "Accept": 'application/vnd.api+json',
        },
      }).then(res => {
        console.log(res)
        console.log(matchId)
        setMatchData(res.data) // currently puts 1 data into useState hook ??? Why
      });

      return true;
    })
  }, [])

  if(matchData) {
    return(
      <div>Correct
      </div>
    )
  }

  return (
    <div>Error</div>
  )
}

export default MatchStats