const { join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const GLOBALS = {
    __DEV__: true,
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.ENDPOINT': JSON.stringify('http://localhost:3500')
};

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true&path=http://localhost:3000/__webpack_hmr',
        './src/index'
    ],
    cache: true,
    target: 'web',
    output: {
        path: `${__dirname}/lib`,
        publicPath: 'http://localhost:3000/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin(GLOBALS),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            // Create HTML file that includes references to bundled CSS and JS.
            template: 'src/index.ejs',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            inject: true
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: join(__dirname, '../', 'src'),
                loader: 'babel-loader'
            },
            { test: /\.(jpe?g|png|gif)$/i, loaders: ['file-loader'] },
            { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.json$/, loader: 'json-loader' },
            {
                test: /(\.css|\.scss)$/,
                loaders: [
                    'style-loader',
                    'css-loader?sourceMap',
                    'sass-loader?sourceMap'
                ]
            }
        ]
    }
};
