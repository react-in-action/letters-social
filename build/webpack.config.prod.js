const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const uuid = require('uuid/v4');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const GLOBALS = {
    'process.env': {
        NODE_ENV: JSON.stringify('production'),
        ENDPOINT: JSON.stringify('https://social.react.sh/api'),
        RIA_SENTRY_APP: JSON.stringify('https://23f0e00b78a24ac88450c8261b59ed7c@sentry.io/212515'),
        GOOGLE_API_KEY: JSON.stringify('AIzaSyDBosKGKi-BI9Z8vftAwkBRQlSDDNE8PvM'),
        FIREBASE_AUTH_DOMAIN: JSON.stringify('letters-social.firebaseapp.com'),
        MAP_SCRIPT_ID: JSON.stringify(uuid()),
        MAPBOX_API_TOKEN: JSON.stringify(
            'pk.eyJ1IjoibWFya3RoZXRob21hcyIsImEiOiJHa3JyZFFjIn0.MwCj8OA5q4dqdll1s2kMiw'
        )
    }
};

module.exports = {
    entry: './src/index',
    output: {
        path: path.join(__dirname, '..', 'static'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new SWPrecacheWebpackPlugin({
            cacheId: 'letters',
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            minify: true,
            navigateFallback: '/index.html',
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
        }),
        new webpack.DefinePlugin(GLOBALS),
        new WebpackMd5Hash(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                comparisons: false
            },
            output: {
                comments: false,
                ascii_only: true
            },
            sourceMap: false
        }),
        new ExtractTextPlugin('styles.css')
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: 'url-loader?name=[name].[ext]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]'
            },
            {
                test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]'
            },
            {
                test: /\.svg(\?v=\d+.\d+.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.ico$/,
                use: 'file-loader?name=[name].[ext]'
            }
        ]
    }
};
