import React from "react";
import { ListItem } from "./List.style";

class List extends React.Component {
  // ****************************
  // *  React Inital State
  // ****************************
  constructor(props) {
    super(props);
  }

  render() {
    const { gameList, activeGame, listDirection } = this.props;

    const filteredGames = gameList
      // Display order - list item appear in right location on UI
      .map((game, idx) => ({
        ...game,
        displayOrder: idx - activeGame + 4
      }))
      // //Get 2 games either side of the active game (reduces rendering offscreen)
      .filter((_, idx) => idx >= activeGame - 3 && idx <= activeGame + 3);

    const getGame = gameOrder =>
      filteredGames.find(game => game.displayOrder === gameOrder);
    return (
      <div id="listbg">
        <div id="list">

          {filteredGames.map(game => {
            return (
              <ListItem
                num={game.displayOrder}
                //The random val ensures the scroll animation is applied each time
                key={Math.random()}
                direction={listDirection}
                active={game.displayOrder === 4}
              >
                <img src={game.listImg} />
              </ListItem>
            );
          })}
        </div>
      </div>
    );
  }
}

export default List;
