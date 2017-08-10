var webpack = require('webpack');
var path = require('path');


var config = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8081',
        'babel-polyfill',
        'webpack/hot/only-dev-server',
        'whatwg-fetch',
        __dirname.concat('/webapp/js/main.js'),
    ],
    output: {
        path: __dirname.concat('/build/'),
        filename: 'app.bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|woff2|woff|ttf|svg)$/,
                loader: 'url',
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
        ],
    },
    resolve: {
        root: [
            path.resolve('./webapp/js'),
        ],
    },
    devtool: 'inline-sourcemap',
    devServer: {
        contentBase: __dirname.concat('/webapp/'),
        port: 8081,
        inline: true,
        hot: true,
        host: '0.0.0.0'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
    ],
};

module.exports = config;
