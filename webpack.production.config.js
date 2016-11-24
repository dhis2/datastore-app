var webpack = require('webpack');

var config = {
  entry: [
    'whatwg-fetch',
    __dirname + '/webapp/js/main.js'
  ],
  output: {
    path: __dirname + '/build/',
    filename: "app.bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel' /*, 'eslint'*/ ],
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
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  // eslint: {
  //   configFile: './.eslintrc'
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.AggressiveMergingPlugin(),

  ]
}

module.exports = config;
