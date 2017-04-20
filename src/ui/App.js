import React from 'react'
import Gamepad from './gamepad.js'

import List from './components/List'
import GameDetails from './components/GameDetails'
import ActionBar from './components/ActionBar'
import Overlay from './components/Overlay'

import GamePadWrapper from './GamePadWrapper'

import data from '../data/exampleData'

const gameList = data.games

class App extends React.Component {
  // ****************************
  // *  React Inital State
  // ****************************
  constructor (props) {
    super(props)
    this.state = {
      activeGame: 2,
      listDirection: 'Down',
      videoPlaying: true,
      loadingGame: false,
      windowFocus: true
    }
  }

  handleExternalInput ({ action, payload }) {
    console.log('Input from Main:', action, payload)
    {
      windowFocus: this.setWindowFocusState(payload)
    }
    [action]
  }

  setWindowFocusState (isFocused) {
    console.log('Window focus: ' + isFocused)
    this.setState({ windowFocus: isFocused })
  }

  handleGamepadInput (buttonPressed) {
    this.updateStateFromGamepad(buttonPressed)
  }

  updateStateFromGamepad (buttonPressed) {
    // Scrolling
    buttonPressed === 'Up' &&
      this.state.activeGame > 0 &&
      this.setState(prevState => ({
        activeGame: prevState.activeGame - 1,
        listDirection: 'Up'
      }))

    buttonPressed === 'Down' &&
      this.state.activeGame < gameList.length - 1 &&
      this.setState(prevState => ({
        activeGame: prevState.activeGame + 1,
        listDirection: 'Down'
      }))

    // Play/Pause video
    buttonPressed === 'B' &&
      this.setState(prevState => ({
        videoPlaying: !prevState.videoPlaying
      }))
    // Play Game
    buttonPressed === 'A' && this.launchGame()
  }

  launchGame () {
    if (!this.state.loadingGame) {
      // Set UI to loading
      this.setLoadingGame(true)

      // Call main to launch game
      this.props.passActionToMain({
        action: 'launchGame',
        payload: gameList[this.state.activeGame].fileLoc
      })
    }
  }

  setLoadingGame (isGameLoading) {
    this.setState({
      loadingGame: isGameLoading,
      videoPlaying: false
    })
  }

  render () {
    return (
      <div>
        <GamePadWrapper callback={x => this.handleGamepadInput(x)} />

        {(this.state.loadingGame || !this.state.windowFocus) &&
          <Overlay
            loadingGame={this.state.loadingGame}
            windowFocus={this.state.windowFocus}
            activeGame={gameList[this.state.activeGame]}
          />}

        <List
          gameList={gameList}
          activeGame={this.state.activeGame}
          listDirection={this.state.listDirection}
        />
        <GameDetails
          videoPlaying={this.state.videoPlaying}
          activeGame={gameList[this.state.activeGame]}
        />
        <ActionBar videoPlaying={this.state.videoPlaying} />

        {/*
        ****************************
        *  Background Image
        ****************************
        */}
        <div id='bg-img'>
          <img
            src={gameList[this.state.activeGame].bgImg}
            height='1080'
            width='1920'
          />
        </div>

      </div>
    )
  }
}

export default App
