import React from 'react';

import {ListItem} from './ListStyles'

const List = ({gameList, activeGame}) => {

    const orderedGameList = gameList.map((game, idx) => ({...game, order: idx}))

    console.log(orderedGameList, activeGame)

    const filteredGames = 
        //Get 2 games either side of the active game
        orderedGameList.filter(game => game.order >= activeGame - 2 && game.order <= activeGame + 2) 

        // Display order is 0 - 5
        .map(game => ({...game, displayOrder: game.order - activeGame + 2})) 

    const getGame = (gameOrder) => filteredGames.find(game => game.displayOrder === gameOrder)

    // console.log(isValidgetGame(0))


    return  (<div id='listbg'>
                <div id='list'>
                    {getGame(0) && <ListItem num={1}><img src={getGame(0).listImg}/></ListItem>}
                    {getGame(1) && <ListItem num={2}><img src={getGame(1).listImg}/></ListItem>}
                    {getGame(2) && <ListItem num={3}><img id='list-item-active' src={getGame(2).listImg}/></ListItem>}
                    {getGame(3) && <ListItem num={4}><img src={getGame(3).listImg}/></ListItem>}
                    {getGame(4) && <ListItem num={5}><img src={getGame(4).listImg}/></ListItem>}
                </div>
            </div>)
}

export default List