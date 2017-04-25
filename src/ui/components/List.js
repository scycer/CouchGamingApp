import React from 'react'
import { ListItem } from './List.style'

const List = ({ gameList, activeGameId, listDirection }) => {
  const filteredGames = gameList
    // Display order - helps list items appear in right location on UI
    .map((game, idx) => ({
      ...game,
      displayOrder: idx - activeGameId + 4
    }))
    // //Get up to 2 games either side of the active game (reduces rendering offscreen)
    .filter((_, idx) => idx >= activeGameId - 3 && idx <= activeGameId + 3)

  return (
    <div id='listbg'>
      <div id='list'>

        {filteredGames.map(game => {
          return (
            <ListItem
              num={game.displayOrder}
              // The random val ensures the scroll animation is applied each time
              key={Math.random()}
              direction={listDirection}
              active={game.displayOrder === 4}
            >
              <img src={game.listImg} />
            </ListItem>
          )
        })}
      </div>
    </div>
  )
}

export default List
