var webpack = require('webpack');

var config = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    'whatwg-fetch',
    'react-bootstrap',
    __dirname + '/webapp/js/app.js'
  ],
  output: {
    path: __dirname + '/build/',
    filename: "app.bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|woff2|woff|ttf|svg)$/,
        loader: 'url'
      }
    ]
  },
  devtool: "inline-sourcemap",
  devServer: {
    contentBase: __dirname + '/webapp/',
    port: 8080,
    inline: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = config;
