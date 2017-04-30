import React from 'react'

import List from './components/List'
import GameDetails from './components/GameDetails'
import ActionBar from './components/ActionBar'
import Overlay from './components/Overlay'

import data from '../data/exampleData'

const aToZSort = (a, b) => a > b ? 1 : -1

const gameList = data.games

// ****************************
// *  Filter functions
// ****************************
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

// ****************************
// *  Random functions
// ****************************

const randomIntZeroToX = max => Math.round(Math.random() * max)

// ****************************
// *  React App
// ****************************
class App extends React.Component {
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
    action === 'windowFocus' && this.setWindowFocusState(payload)
    action === 'gamepadInput' && this.handleGamepadInput(payload)
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
    const scrollList = direction => {
      const incDecIdx = direction === 'Up' ? -1 : 1

      this.setState(prevState => ({
        activeGameId: prevState.activeGameId + incDecIdx,
        listDirection: direction
      }))
    }

    const isEndOfList = this.state.activeGameId >=
      filterGamesList(this.state.minPlayers).length - 1

    const isStartOfList = this.state.activeGameId <= 0

    const playPauseVideo = () =>
      this.setState(prevState => ({
        videoPlaying: !prevState.videoPlaying
      }))

    const filterOnPlayers = () =>
      this.setState(prevState => ({
        minPlayers: getNextFilter(prevState.minPlayers),
        activeGameId: 0
      }))

    const randomGame = () =>
      this.setState({
        activeGameId: randomIntZeroToX(
          filterGamesList(this.state.minPlayers).length - 1
        )
      })

    // Scrolling List
    buttonPressed === 'Up' && !isStartOfList && scrollList('Up')
    buttonPressed === 'Down' && !isEndOfList && scrollList('Down')

    // Play/Pause video
    buttonPressed === 'B' && playPauseVideo()

    // Play Game
    buttonPressed === 'A' && this.launchGame()

    // Filter Button
    buttonPressed === 'Y' && filterOnPlayers()

    // Random Button
    buttonPressed === 'X' && randomGame()
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

    // Stop 'Game Loading' after 30 seconds
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
