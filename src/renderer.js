import React from 'react'
import ReactDOM from 'react-dom'
import App from './ui/app'
const { ipcRenderer, webFrame } = require('electron')

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
