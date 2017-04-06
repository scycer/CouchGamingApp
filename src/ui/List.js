import React from 'react';

const List = ({gameList, activeGame}) => {

    const orderedGameList = gameList.map((game, idx) => ({...game, order: idx}))

    console.log(orderedGameList, activeGame)

    const filteredGames = 
        orderedGameList
        .filter(game => game.order >= activeGame - 2 && game.order <= activeGame + 2)
        .map(game => ({...game, displayOrder: game.order - activeGame + 2})) // Display order is 0 - 5

    const getGame = (gameOrder) => filteredGames.find(game => game.displayOrder === gameOrder)

    // console.log(isValidgetGame(0))

    return  (<div id='listbg'>
                <div id='list'>
                    {getGame(0) && <img id='list-item-1' src={getGame(0).listImg}/>}
                    {getGame(1) && <img id='list-item-2' src={getGame(1).listImg}/>}
                    {getGame(2) && <img id='list-item-active' src={getGame(2).listImg}/>}
                    {getGame(3) && <img id='list-item-4' src={getGame(3).listImg}/>}
                    {getGame(4) && <img id='list-item-5' src={getGame(4).listImg}/>}
                </div>
            </div>)
}

export default List