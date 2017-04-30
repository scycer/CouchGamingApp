const path = require('path')

var CopyWebpackPlugin = require('copy-webpack-plugin')

/***********************
 * Webpack Settings
 **********************/
module.exports = {
  // JS file to start with
  entry: {
    renderer: './src/renderer.js'
    // main: './src/main.js'
  },

  // Where to output the bundle
  output: {
    path: path.join(__dirname, 'dist/resources/app'),
    filename: '[name].bundle.js'
  },

  // How to transpile the ES6
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },

  plugins: [
    new CopyWebpackPlugin(
      // Move index.html to dist folder
      [
        { from: './src/index.html', to: './' },
        { from: './src/main.js', to: './main.bundle.js' }
      ]
    )
  ],

  // // Build for electron
  target: 'electron-renderer',

  /***********************
   * Dev Server
   **********************/
  devServer: {
    // This is where the public assets are served from
    contentBase: path.join(__dirname, 'public'),

    // Shows errors in the browser window DOM
    overlay: true,

    // nothing is shown in CLI
    quiet: false
  }
}
