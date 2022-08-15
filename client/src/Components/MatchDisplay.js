import React, { useState, useEffect } from 'react'
import axios from 'axios'

function MatchDisplay(props) {
    let matchId = props.matchId
    const [matchData, setMatchData] = useState([])
    
    const fetchMatchData = (() => {
        axios({
            method: 'get',
            url: "https://api.pubg.com/shards/steam/matches/" + matchId,
            headers: {
                "Accept": 'application/vnd.api+json'
            },
        }).then(res => {
            setMatchData(res.data);
        });
    });

    useEffect(() => {
        fetchMatchData();
    }, [matchId])
    console.log(matchData)
    return (
        <div>
            <h1 className='text-center text-xl'>Match Data</h1>
        </div>
    )
}

export default MatchDisplay