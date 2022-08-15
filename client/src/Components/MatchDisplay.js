import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

function MatchDisplay(props) {
    let matchId = props.matchId
    const [matchData, setMatchData] = useState([])
    
    const fetchMatchData = useCallback(async () => {
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
        <div>MatchDisplay: {matchId}</div>
    )
}

export default MatchDisplay