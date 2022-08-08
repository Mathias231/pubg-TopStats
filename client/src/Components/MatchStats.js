import React from 'react'

function MatchStats(props) {
  // Get X data
console.log(props)
  const username = props.matches.attributes.name;
  console.log(username)

  return (
    <div className='grid grid-cols-3 mt-1'>
      <div className="bg-slate-200">{username} </div>
      <div className="bg-slate-200">Match</div>
      <div className="bg-slate-200">03</div>
    </div>
  )
}

export default MatchStats