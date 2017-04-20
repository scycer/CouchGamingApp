import React from 'react'
import ReactDOM from 'react-dom'
import App from './ui/app'

// ****************************
// *  React Renderer
// ****************************
let appComponent

ReactDOM.render(
  <App
    passActionToMain={x => sendMsgToMain(x)}
    ref={ref => appComponent = ref}
  />,
  document.getElementById('app')
)

// ****************************
// *  Communicating Main.js <-> Renderer.js
// ****************************
const { ipcRenderer } = require('electron')

// Handle incoming reply from Main
ipcRenderer.on('asynchronous-reply', (event, arg) => {})

// Handle incoming message from Main
ipcRenderer.on('asynchronous-message', (event, arg) => {
  appComponent.handleExternalInput(arg)
  event.sender.send('asynchronous-reply', 'RENDERER: Received Message')
})
// Send messages to Main
const sendMsgToMain = message =>
  ipcRenderer.send('asynchronous-message', message)
