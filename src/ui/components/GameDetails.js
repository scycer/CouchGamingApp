import React from 'react'

const GameDetails = ({ activeGame, videoPlaying }) => {
  const { genres, players, modes, descipt, video, bgImg } = activeGame
  const concatStrArr = arr => arr.reduce((a, b) => `${a} & ${b}`)

  const genresStr = concatStrArr(genres)
  const modesStr = concatStrArr(modes)

  const gameDetailsLayout = () => {
    return (
      <div id='details'>
        <div id='videoDiv'>
          {video
            ? <video
              id='video'
                // Math.Random used to force a reload of the video
                // (only source changes and doesn't reload)
              key={Math.random()}
              autoPlay={videoPlaying}
              src={video}
              />
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

  const noGames = () => <div id='no-games'><h1> No Games </h1></div>

  return activeGame ? gameDetailsLayout() : noGames()
}

export default GameDetails
