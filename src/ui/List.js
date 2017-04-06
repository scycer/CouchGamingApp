import React from 'react';

import styled, { keyframes } from 'styled-components';

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

const rotate360 = keyframes`
  from {
    top: -200px;
  }

  to {
    top: -113.5px;
  }
`;

    const ListItem1 = styled.div`
        position: absolute;
        top: -113.5px;
        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
        animation: ${rotate360} 500ms;
    `;

    return  (<div id='listbg'>
                <div id='list'>
                    {getGame(0) && <ListItem1><img src={getGame(0).listImg}/></ListItem1>}
                    {getGame(1) && <img id='list-item-2' src={getGame(1).listImg}/>}
                    {getGame(2) && <img id='list-item-active' src={getGame(2).listImg}/>}
                    {getGame(3) && <img id='list-item-4' src={getGame(3).listImg}/>}
                    {getGame(4) && <img id='list-item-5' src={getGame(4).listImg}/>}
                </div>
            </div>)
}

export default List