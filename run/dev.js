const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const browserSync = require('browser-sync');
const config = require('../build/webpack.config.js');

const bundler = webpack(config);

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
    open: false,
    server: {
        baseDir: 'src',

        middleware: [
            historyApiFallback(),
            webpackDevMiddleware(bundler, {
                hot: true,
                historyApiFallback: true,
                publicPath: config.output.publicPath,
                stats: {
                    assets: false,
                    colors: true,
                    version: false,
                    hash: false,
                    timings: false,
                    chunks: false,
                    chunkModules: false
                }
            }),
            // same bundler for both
            webpackHotMiddleware(bundler)
        ]
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: ['src/*.ejs']
});
