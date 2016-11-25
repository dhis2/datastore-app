var webpack = require('webpack');

var config = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8081',
        'webpack/hot/only-dev-server',
        'whatwg-fetch',
        'react-bootstrap',
        __dirname + '/webapp/js/main.js',
    ],
    output: {
        path: __dirname + '/build/',
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
    // eslint: {
    //   configFile: './.eslintrc'
    // },
    devtool: 'inline-sourcemap',
    devServer: {
        contentBase: __dirname + '/webapp/',
        port: 8081,
        inline: true,
        hot: true,
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
