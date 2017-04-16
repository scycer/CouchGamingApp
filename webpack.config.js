const path = require('path')

/***********************
 * Webpack Settings
 **********************/
module.exports = {
  // JS file to start with
  entry: {
    entry: './src/renderer.js',
    main: './src/main.js'
  },

  // Where to output the bundle
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },

  // How to transpile the ES6
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },

  // // Build for electron
  target: 'electron-main',

  /***********************
   * Dev Server
   **********************/
  devServer: {
    // This is where the public assets are served from
    contentBase: path.join(__dirname, 'public'),

    // Shows errors in the browser window DOM
    overlay: true,

    // nothing is shown in CLI
    quiet: true
  }
}
