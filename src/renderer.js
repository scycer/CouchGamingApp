import React from 'react'
import ReactDOM from 'react-dom'
import App from './ui/app'
const { ipcRenderer, webFrame } = require('electron')
import Gamepad from './gamepad.js'

// 2k monitor
// webFrame.setZoomFactor(1.333333333333333)

// ****************************
// *  React Renderer
// ****************************
let appComponent = {}

// Send messages to Main
const sendMsgToMain = message =>
  ipcRenderer.send('asynchronous-message', message)

ReactDOM.render(
  <App
    passActionToMain={x => sendMsgToMain(x)}
    ref={ref => {
      appComponent = ref
    }}
  />,
  document.getElementById('app')
)

// ****************************
// *  Communicating Main.js <-> Renderer.js
// ****************************

// Handle incoming reply from Main
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(event, arg)
})

// Handle incoming message from Main
ipcRenderer.on('asynchronous-message', (event, arg) => {
  appComponent.handleExternalInput(arg)
  event.sender.send('asynchronous-reply', 'RENDERER: Received Message')
})

// ****************************
// *  Gamepad Input
// ****************************
const passControllerInputToApp = button =>
  appComponent.handleExternalInput({ action: 'gamepadInput', payload: button })

const gamepad = new Gamepad()

const gamepadStickDeadzone = 0.3

gamepad.on('press', 'button_1', e => {
  passControllerInputToApp('A')
})
gamepad.on('press', 'button_2', e => {
  passControllerInputToApp('B')
})
gamepad.on('press', 'button_3', e => {
  passControllerInputToApp('X')
})
gamepad.on('press', 'button_4', e => {
  passControllerInputToApp('Y')
})
gamepad.on('press', 'stick_axis_left', e => {
  const [xAxis, yAxis] = e.value

  xAxis > gamepadStickDeadzone && passControllerInputToApp('Right')
  xAxis < -gamepadStickDeadzone && passControllerInputToApp('Left')
  yAxis < -gamepadStickDeadzone && passControllerInputToApp('Up')
  yAxis > gamepadStickDeadzone && passControllerInputToApp('Down')
})
