const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const DashboardPlugin = require('webpack-dashboard/plugin');

const GLOBALS = {
    'process.env': {
        NODE_ENV: JSON.stringify('production'),
        ENDPOINT: JSON.stringify('https://learn-react-newsfeed.herokuapp.com/api')
    },
    __DEV__: false
};

_8fa‍.d({
    devtool: 'source-map',
    entry: './src/index',
    target: 'web',
    output: {
        path: path.join(__dirname, '..', 'static'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new DashboardPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new WebpackMd5Hash(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveSplittingPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('styles.css')
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                loader: 'url-loader?name=[name].[ext]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]'
            },
            {
                test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]'
            },
            {
                test: /\.svg(\?v=\d+.\d+.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.ico$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /(\.css|\.scss)$/,
                loader: ExtractTextPlugin.extract(
                    'css-loader?sourceMap!postcss-loader!sass-loader?sourceMap'
                )
            }
        ]
    }
});
