# CouchGamingApp
A fullscreen windows app for selecting PC games with a focus on local multiplayer games (couch games)

----------

## Problem
Choosing what couch game to play with friends who may not know what each game is from the icon/banner image.

I had tried Steam 'Big Picture Mode' but it lacked any videos and was too generic. I also tried Launchbox with BigBox mode and though it had videos it was still too generic so i decided to create something specific to couch gaming.

## Requirements

### Main app
- Simple, intuitive UI to scroll through games
- Focus on Couch Games
- Show how many people can play ('? players')
- Show genre and game modes ('VS' and/or 'CO-OP')
- Show video of the game
- Launch games from the app
- Filter games by minimum amount of players

----------

## Launching game
Once you clone the repo, there is a shortcut under the dist folder called "CouchGames" that will launch the app

----------

## Project Architecture
- React UI
- Gamepad is the only input device currently
- Windows only (can be for other platforms if you add the binaries)
- Webpack build system
- Used prettier.js for code formmating
- ESlint also used
- Yarn

----------

## Folder/File Layout
- **src**
    - **data** - this is where the json data is kept for media urls and game executable locations
    - **ui** - React UI for the app
        - **App.js** -  core react component that manages the state
        - **components** - presentational components
    - **main.js** - the 'system' side of the electron app
    - **renderer.js** - the 'ui' side of the electron app, mounts react app, links comms from gamepad and main.js
    - **gamepad.js** - js library imported to handle gamepad inputs


- **dist** - contains windows binaries for electron app
    - **resources/app** - dist files from the src folder
    
----------
[Todo List is located on Trello](https://trello.com/b/HfMqzzpz/couch-gaming-app)

