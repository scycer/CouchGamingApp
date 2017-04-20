import React from 'react'
import { OverlayBackground } from './Overlay.style'

const Overlay = ({ loadingGame, windowFocus, activeGame }) => {
  const { listImg } = activeGame
  return (
    <OverlayBackground>
      <div>
        <img src={listImg} />
        <h1>Loading...</h1>
      </div>
    </OverlayBackground>
  )
}

export default Overlay
