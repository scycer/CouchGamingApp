import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/app';

import Gamepad from './gamepad.js'

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

const gamepad = new Gamepad()

gamepad.on('press', 'button_1', (e) => {
    console.log('A pressed');
});

gamepad.on('press', 'button_2', (e) => {
    console.log('B pressed');
});

gamepad.on('press', 'button_3', (e) => {
    console.log('X pressed');
});

gamepad.on('press', 'button_4', (e) => {
    console.log('Y pressed');
});

gamepad.on('press', 'stick_axis_left', (e) => {
    const xAxis = e.value[0]
    const yAxis = e.value[1]

    xAxis > 0.3 && console.log('Right')
    xAxis < -0.3 && console.log('Left')

    yAxis < -0.3 && console.log('Up')
    yAxis > 0.3 && console.log('Down')
});

gamepad.on('press', 'd_pad_up', (e) => {
    console.log('Up')
});