import React from 'react'

const GameDetails = ({ activeGame, videoPlaying }) => {
  const gameDetailsLayout = () => {
    const { genres, players, modes, descipt, video, bgImg } = activeGame
    const concatStrArr = arr => arr.reduce((a, b) => `${a} & ${b}`)

    const genresStr = concatStrArr(genres)
    const modesStr = concatStrArr(modes)

    const isVideoPlaying = videoPlaying

    return (
      <div id='details'>
        <div id='videoDiv'>
          {/* Random used to force a reload of the video (only source changes) */}
          {video
            ? <video id='video' key={Math.random()} autoPlay={isVideoPlaying}>
              <source src={video} type='video/webm' />
            </video>
            : <img id='video' src={bgImg} />}

        </div>

        <div id='game-types'>
          <div className='gameDetail'>{players} Players</div>
          <div className='gameDetail'> {genresStr} </div>
          <div className='gameDetail'> {modesStr} </div>
        </div>

        <div id='game-descript'>
          {descipt}
        </div>
      </div>
    )
  }

  const noGames = <div id='no-games'><h1> No Games </h1></div>

  return activeGame ? gameDetailsLayout() : noGames
}

export default GameDetails
