import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Home() {
    const url = "https://pubg.op.gg/api/users/59fe361a66d17500012db6bd/ranked-stats?season=pc-2018-18&queue_size=1&mode=fpp";
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(url)
        .then(res => {
            setData(res.data);
        })
    }, [url]);

    if(data) {
        return(
            <div>
                {console.log(data)}
            </div>
        )
    }

    return (
    <div>Home</div>
    )
}

export default Home