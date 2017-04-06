import React from 'react';

import List from "./List"

import data from "../data/exampleData"

class App extends React.Component {
  // ****************************
  // *  React Inital State
  // ****************************
  constructor(props) {
    super(props)
    this.state = {
      activeGame: 2
    }
  }

  render() {

    const {games} = data

    const changeGame = () => this.setState({activeGame: 1})

    return (
      <div>
        <List gameList={games} activeGame={this.state.activeGame}/>

        {/*
        ****************************
        *  Game Details
        ****************************
        */}

        <div id='details'>
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

        </div>

        {/*
        ****************************
        *  Background Image
        ****************************
        */}

        <div id='bg-img'>
          <img src="bg.jpg" height="1080" width="1920"/>
        </div>

        {/*
        ****************************
        *  Action Bar
        ****************************
        */}
        <div id="bar">
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
            <div className='btn-label'>???????</div>
          </div>

          <div className='btn-sec'>
            <div className='round-btn x'>
              <div className='round-btn-text'>X</div>
            </div>
            <div className='btn-label'>???????</div>
          </div>

          <div className='btn-sec'>
              <div className='round-btn y'>
                  <div className='round-btn-text'>Y</div>
              </div>
              <div className='btn-label'>Filter</div>
              
          </div>
        </div>
      </div>
    )
  }
}

export default App