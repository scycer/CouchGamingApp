import React from 'react'
import { ListItem } from './List.style'

const List = ({ gameList, activeGameId, listDirection }) => {
  const games = gameList
    // Display order - helps list items appear in right location on UI
    .map((game, idx) => ({
      ...game,
      displayOrder: idx - activeGameId + 4
    }))

  return (
    <div id='listbg'>
      <div id='list'>

        {games.map((game, idx) => {
          return (
            <ListItem
              num={game.displayOrder}
              direction={listDirection}
              active={game.displayOrder === 4}
              key={idx}
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
