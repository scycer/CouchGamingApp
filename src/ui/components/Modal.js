import React from 'react'
import { OverlayBackground } from './Overlay.style'
import styled from 'styled-components'

export const ModalStyle = styled.div`
    width: 500px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);

`

export const Header = styled.div`
    padding: 20px 20px
    background-color: #607d8b;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2)

`

export const Settings = styled.div`
    background-color: white;
    color: #212121;
`

export const Results = styled.div`
    position: relative;
    bottom: 0px;
    background-color: #448aff;

`

const Modal = ({ selectedEl, minPlayers, genre, mode, results, gameCount }) => {
  return (
    <OverlayBackground>
      <ModalStyle>
        <Header>
          <h1>Filter</h1>
          <h2>{results} / {gameCount} games</h2>
        </Header>

        <Settings>
          <h1>{selectedEl === minPlayers && 'XXX'} Players: {minPlayers}</h1>
          <h1>{selectedEl === mode && 'XXX'} Mode: {mode}</h1>
          <h1>{selectedEl === genre && 'XXX'} Genre: {genre}</h1>
        </Settings>

      </ModalStyle>
    </OverlayBackground>
  )
}

export default Modal
