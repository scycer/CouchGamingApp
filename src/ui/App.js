import React from 'react'

import List from './components/List'
import GameDetails from './components/GameDetails'
import ActionBar from './components/ActionBar'
import Overlay from './components/Overlay'
import Modal from './components/Modal'

import GamePadWrapper from './GamePadWrapper'

import data from '../data/exampleData'

const gameList = data.games
  // Alphabetical sort
  .sort((gameA, gameB) => gameA.name > gameB.name ? 1 : -1)

class App extends React.Component {
  // ****************************
  // *  React Inital State
  // ****************************
  constructor (props) {
    super(props)
    this.state = {
      activeGame: 0,
      listDirection: 'Down',
      videoPlaying: true,
      loadingGame: false,
      windowFocus: true,
      filterModal: false,
      filter: {
        selected: 'minPlayers',
        minPlayers: 0,
        mode: 'all',
        genre: 'all'
      }
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
    this.setState({ windowFocus: isFocused, videoPlaying: isFocused })
  }

  handleGamepadInput (buttonPressed) {
    // Only handle input if the screen is active and not loading a game
    !this.state.loadingGame &&
      this.state.windowFocus &&
      this.updateStateFromGamepad(buttonPressed)
  }

  updateStateFromGamepad (buttonPressed) {
    buttonPressed === 'Y' &&
      this.setState(prevState => ({
        filterModal: !prevState.filterModal
      }))

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

    setTimeout(() => this.setLoadingGame(false), 30000)
  }

  setLoadingGame (isGameLoading) {
    this.setState({
      loadingGame: isGameLoading,
      videoPlaying: false
    })
  }

  render () {
    const {
      filter,
      windowFocus,
      loadingGame,
      activeGame,
      videoPlaying,
      listDirection,
      filterModal
    } = this.state

    const filteredGamesList = gameList.filter(game => {
      // Check if it has min players
      return game.players >= filter.minPlayers &&
        // Check if it meets the game mode
        (filter.mode === 'all' ? true : game.modes.includes(filter.mode)) &&
        // Check if it meets the genres
        (filter.genre === 'all' ? true : game.genres.includes(filter.genre))
    })

    return (
      <div>
        <GamePadWrapper callback={x => this.handleGamepadInput(x)} />

        {/*
        ****************************
        *  Loading / Focus Overlay
        ****************************
        */}
        {(loadingGame || !windowFocus) &&
          <Overlay
            loadingGame={loadingGame}
            windowFocus={windowFocus}
            activeGame={filteredGamesList[activeGame]}
          />}

        {/*
        ****************************
        *  Filter Modal
        ****************************
        */}
        {filterModal &&
          <Modal
            selectedEl={this.state.filter.selected}
            minPlayers={this.state.filter.minPlayers}
            genre={this.state.filter.genre}
            mode={this.state.filter.mode}
            gameCount={gameList.length}
            results={filteredGamesList.length}
          />}

        {/*
        ****************************
        *  List of Games
        ****************************
        */}
        <List
          gameList={filteredGamesList}
          activeGame={activeGame}
          listDirection={listDirection}
        />
        }

        {/*
        ****************************
        *  Game Details
        ****************************
        */}
        <GameDetails
          videoPlaying={videoPlaying}
          activeGame={filteredGamesList[activeGame]}
        />

        {/*
        ****************************
        *  Action Bar
        ****************************
        */}
        <ActionBar videoPlaying={videoPlaying} />

        {/*
        ****************************
        *  Background Image
        ****************************
        */}
        <div id='bg'>
          <img
            id='bg-img'
            opacity='0.5'
            src={
              filteredGamesList[activeGame] &&
                filteredGamesList[activeGame].bgImg
            }
            height='1080'
            width='1920'
          />
        </div>

      </div>
    )
  }
}

export default App
