import React from 'react'
import Gamepad from './gamepad.js'

class GamePadWrapper extends React.Component {
  // ****************************
  // *  React Inital State
  // ****************************
  constructor (props) {
    super(props)
  }

  // Stops the requestAnimationFrame and react re-render from conflicting
  shouldComponentUpdate () {
    return false
  }

  render () {
    const callback = this.props.callback
    const gamepad = new Gamepad()

    gamepad.on('press', 'button_1', e => {
      callback('A')
    })
    gamepad.on('press', 'button_2', e => {
      callback('B')
    })
    gamepad.on('press', 'button_3', e => {
      callback('X')
    })
    gamepad.on('press', 'button_4', e => {
      callback('Y')
    })
    gamepad.on('press', 'stick_axis_left', e => {
      const [xAxis, yAxis] = e.value

      xAxis > 0.3 && callback('Right')
      xAxis < -0.3 && callback('Left')
      yAxis < -0.3 && callback('Up')
      yAxis > 0.3 && callback('Down')
    })

    return <div />
  }
}

export default GamePadWrapper
