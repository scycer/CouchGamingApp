import React from "react";

const GameDetails = ({ activeGame, videoPlaying }) => {
  const { name, genres, players, modes, descipt, video, listImg } = activeGame;

  console.log(videoPlaying);

  const concatStrArr = arr => arr.reduce((a, b) => `${a} & ${b}`);

  const genresStr = concatStrArr(genres);
  const modesStr = concatStrArr(modes);

  const isVideoPlaying = videoPlaying;

  return (
    <div id="details">
      <div id="videoDiv">
        {/*Random used to force a reload of the video (only source changes)*/}
        <video id="video" key={Math.random()} autoPlay={isVideoPlaying}>
          <source src={video} type="video/webm" />
        </video>
      </div>

      <div id="game-types">
        <div className="gameDetail">{players} Players</div>
        <div className="gameDetail"> {genresStr} </div>
        <div className="gameDetail"> {modesStr} </div>
      </div>

      <div id="game-descript">
        {descipt}
      </div>
    </div>
  );
};

export default GameDetails;
