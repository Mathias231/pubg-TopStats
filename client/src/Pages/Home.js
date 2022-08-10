import React, { useState, useEffect } from 'react'
import axios from 'axios';

import PlayerStats from '../Components/PlayerStats';
import MatchStats from '../Components/MatchStats';

function Home() {
    const [user, setUser] = useState(null);

    const url = "https://api.pubg.com/shards/steam/players?filter[playerNames]=Bakern999";
    const auth = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4NzdlMTFmMC1mNWVlLTAxM2EtY2ZmMy0wODM2YzIwNWY4NzgiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjU5NTk1MzQ3LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii0wNGYyZTljYy1kZmVhLTRhMWYtOWJkZi1lYjE1OGE2M2M0YjcifQ.zBEjFzJ1SRpv0EoM-ut44oqJbm37dPcwTBwFvFRbwro";

    useEffect(() => {
        axios({
            method: 'get',
            url: url,
            headers: {
                "Accept": 'application/vnd.api+json',
                "Authorization": auth,
            },
        }).then(res => {
            setUser(res.data);
        });
    }, [url]);

    if(user) {
        return(
            <div className='container mx-auto'>
                <div className='grid grid-cols-3 mt-1'>
                    <div className="bg-slate-200">
                        <PlayerStats matches={user.data[0]} />
                    </div>
                    <div className="bg-slate-200">
                        <MatchStats matches={user.data[0].relationships.matches.data} />
                    </div>
                    <div className="bg-slate-200">03</div>
                </div>
            </div>
        )
    }

    return (
    <div>Home</div>
    )
}

export default Home