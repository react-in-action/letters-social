const webpack = require('webpack');
const path = require('path');
const uuid = require('uuid/v4');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('config');

const GLOBALS = {
    'process.env': {
        NODE_ENV: JSON.stringify(config.get('NODE_ENV')),
        ENDPOINT: JSON.stringify(config.get('ENDPOINT')),
        RIA_SENTRY_APP: JSON.stringify(config.get('RIA_SENTRY_APP')),
        GOOGLE_API_KEY: JSON.stringify(config.get('GOOGLE_API_KEY')),
        FIREBASE_AUTH_DOMAIN: JSON.stringify(config.get('FIREBASE_AUTH_DOMAIN')),
        MAPBOX_API_TOKEN: JSON.stringify(config.get('MAPBOX_API_TOKEN'))
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
        new webpack.DefinePlugin(GLOBALS),
        new WebpackMd5Hash({
            seed: {
                revision: uuid()
            }
        }),
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
        new ExtractTextPlugin('styles.css'),
        new ManifestPlugin(),
        new SWPrecacheWebpackPlugin({
            cacheId: 'letters',
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            minify: true,
            navigateFallback: '/index.html',
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
        }),
        process.env.ANALYZE ? new BundleAnalyzerPlugin() : function() {}
    ],
    module: {
        rules: [
            {
                test: /\.(eot|svg|woff|woff2|otf|ttf)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },
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
