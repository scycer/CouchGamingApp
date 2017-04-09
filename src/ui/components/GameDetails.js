import React from 'react';

const GameDetails = () => {
    return (<div id='details'>
          <video id="video" >
            <source src="http://cdn.akamai.steamstatic.com/steam/apps/256661185/movie480.webm?t=1456932057" type="video/webm"/>
          </video>

          <div id='game-types'>
            <div className='gameDetail'>2 Players</div>
            <div className='gameDetail'>RPG</div>
            <div className='gameDetail'>Co-op</div>
          </div>

          <div id='game-descript'>
              Enter the Gungeon is a bullet hell dungeon crawler 
              following a band of misfits seeking to shoot, loot, 
              dodge roll and table-flip their way to personal absolution 
              by reaching the legendary Gungeon’s ultimate treasure: 
              the gun that can kill the past.
          </div>
        </div>)
}

export default GameDetails