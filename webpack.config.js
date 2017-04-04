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
    // rules: [
    //       {
    //         test: /\.css$/,
    //         use: [ 'style-loader', 'css-loader' ]
    //       }
    //     ],

    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [HtmlWebpackPluginConfig],

   devServer: {
    contentBase: path.join(__dirname, 'public'), 
  },
}

