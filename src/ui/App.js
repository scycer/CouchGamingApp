import React from "react";
import Gamepad from "./gamepad.js";

import List from "./components/List";
import GameDetails from "./components/GameDetails";
import ActionBar from "./components/ActionBar";

import GamePadWrapper from "./GamePadWrapper";

import data from "../data/exampleData";

const gameList = data.games;

class App extends React.Component {
  // ****************************
  // *  React Inital State
  // ****************************
  constructor(props) {
    super(props);
    this.state = {
      activeGame: 2,
      listDirection: "Down"
    };
  }

  handleGamepadInput(buttonPressed) {
    buttonPressed === "Up" &&
      this.state.activeGame > 0 &&
      this.setState(prevState => ({
        activeGame: prevState.activeGame - 1,
        listDirection: "Up"
      }));
    buttonPressed === "Down" &&
      this.state.activeGame < gameList.length - 1 &&
      this.setState(prevState => ({
        activeGame: prevState.activeGame + 1,
        listDirection: "Down"
      }));
  }

  render() {
    return (
      <div>
        <GamePadWrapper callback={x => this.handleGamepadInput(x)} />
        <List
          gameList={gameList}
          activeGame={this.state.activeGame}
          listDirection={this.state.listDirection}
        />
        <GameDetails />
        <ActionBar />

        {/*
        ****************************
        *  Background Image
        ****************************
        */}
        <div id="bg-img">
          <img src="bg.jpg" height="1080" width="1920" />
        </div>

      </div>
    );
  }
}

export default App;
