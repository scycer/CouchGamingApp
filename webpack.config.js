const path = require('path');

/***********************
 * HTML Plugin
 **********************/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [HtmlWebpackPluginConfig],

   devServer: {
    //This is where the public assets are served from
    contentBase: path.join(__dirname, 'public'),

    // Shows errors in the browser window DOM
    overlay: true,

    // nothing is shown in CLI
    quiet: true
  },
}

