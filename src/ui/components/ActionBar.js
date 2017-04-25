import React from 'react'

const GameDetails = ({ videoPlaying, minPlayers }) => {
  return (
    <div id='bar'>

      <div className='btn-sec'>
        <div className='round-btn a'>
          <div className='round-btn-text'>A</div>
        </div>
        <div className='btn-label'>Play</div>
      </div>

      <div className='btn-sec'>
        <div className='round-btn b'>
          <div className='round-btn-text'>B</div>
        </div>
        <div className='btn-label'>
          {videoPlaying ? 'Pause Video' : 'Play Video'}
        </div>
      </div>

      <div className='btn-sec'>
        <div className='round-btn x'>
          <div className='round-btn-text'>X</div>
        </div>
        <div className='btn-label'>Random</div>
      </div>

      <div className='btn-sec'>
        <div className='round-btn y'>
          <div className='round-btn-text'>Y</div>
        </div>
        <div className='btn-label'>{minPlayers} players</div>
      </div>
    </div>
  )
}

export default GameDetails
