import React from 'react'

function PlayerStats(props) {
    const username = props.matches.attributes.name;
    const platform = props.matches.attributes.shardId;


  return (
    <div className='ml-2 mr-2'>
        <h1 className="text-2xl">{username}</h1>
        <h3 className='text-base'>Platform: {platform}</h3>
    </div>
  )
}

export default PlayerStats