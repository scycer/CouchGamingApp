import React from 'react'

import List from './components/List'
import GameDetails from './components/GameDetails'
import ActionBar from './components/ActionBar'
import Overlay from './components/Overlay'

import GamePadWrapper from './GamePadWrapper'

import data from '../data/exampleData'

const aToZSort = (a, b) => a > b ? 1 : -1

const gameList = data.games

const filterOptions = [2, 3, 4, 5]

// nextEl :: Array -> Int -> Int
const nextEl = arr => idx => arr.length === idx + 1 ? 0 : idx + 1

// getNextFilter :: Int -> Int
const getNextFilter = nextEl(filterOptions)

// filterGamesList :: Int -> [Objects]
const filterGamesList = minPlayers =>
  gameList
    .filter(
      // Show game that have the min players
      game => game.players >= filterOptions[minPlayers]
    )
    .sort(aToZSort)

class App extends React.Component {
  // ****************************
  // *  React Inital State
  // ****************************
  constructor (props) {
    super(props)
    this.state = {
      activeGameId: 0,
      listDirection: 'Down',
      videoPlaying: false,
      loadingGame: false,
      windowFocus: true,
      minPlayers: 0
    }
  }

  handleExternalInput ({ action, payload }) {
    {
      windowFocus: this.setWindowFocusState(payload)
    }
    [action]
  }

  setWindowFocusState (isFocused) {
    this.setState({ windowFocus: isFocused, videoPlaying: isFocused })
  }

  handleGamepadInput (buttonPressed) {
    // Only handle input if the screen is active and not loading a game
    !this.state.loadingGame &&
      this.state.windowFocus &&
      this.updateStateFromGamepad(buttonPressed)
  }

  updateStateFromGamepad (buttonPressed) {
    // console.log(nextEl(filterOptions)(0))
    // Filter Button
    buttonPressed === 'Y' &&
      this.setState(prevState => ({
        minPlayers: getNextFilter(prevState.minPlayers),
        activeGameId: 0
      }))

    // Scrolling List
    buttonPressed === 'Up' &&
      this.state.activeGameId > 0 &&
      this.setState(prevState => ({
        activeGameId: prevState.activeGameId - 1,
        listDirection: 'Up'
      }))

    buttonPressed === 'Down' &&
      this.state.activeGameId <
        filterGamesList(this.state.minPlayers).length - 1 &&
      this.setState(prevState => ({
        activeGameId: prevState.activeGameId + 1,
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
        payload: gameList[this.state.activeGameId].fileLoc
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
      windowFocus,
      loadingGame,
      activeGameId,
      videoPlaying,
      listDirection,
      minPlayers
    } = this.state

    const filteredGamesList = filterGamesList(minPlayers)
    const activeGame = filteredGamesList[activeGameId]

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
            activeGame={activeGame}
          />}

        {/*

        {/*
        ****************************
        *  List of Games
        ****************************
        */}
        <List
          gameList={filteredGamesList}
          activeGameId={activeGameId}
          listDirection={listDirection}
        />
        }

        {/*
        ****************************
        *  Game Details
        ****************************
        */}
        <GameDetails videoPlaying={videoPlaying} activeGame={activeGame} />

        {/*
        ****************************
        *  Action Bar
        ****************************
        */}
        <ActionBar
          videoPlaying={videoPlaying}
          minPlayers={filterOptions[minPlayers]}
        />

        {/*
        ****************************
        *  Background Image
        ****************************
        */}
        <div id='bg'>
          <img
            id='bg-img'
            opacity='0.5'
            src={activeGame && activeGame.bgImg}
            height='1080'
            width='1920'
          />
        </div>

      </div>
    )
  }
}
export default App
