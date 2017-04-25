import React from 'react'

const ActionBar = ({ videoPlaying, minPlayers }) => {
  const actionButton = (button, label) => (
    <div className='btn-sec'>
      <div className={'round-btn ' + button}>
        <div className='round-btn-text'>{button.toUpperCase()}</div>
      </div>
      <div className='btn-label'>{label}</div>
    </div>
  )

  return (
    <div id='bar'>
      {actionButton('a', 'Play')}
      {actionButton('b', videoPlaying ? 'Pause Video' : 'Play Video')}
      {actionButton('x', 'Random')}
      {actionButton('y', `${minPlayers} players`)}
    </div>
  )
}

export default ActionBar
