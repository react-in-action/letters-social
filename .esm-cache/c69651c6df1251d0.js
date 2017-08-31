let webpack;_df1‍.w('webpack',[["default",function(v){webpack=v}]]);let webpackHotMiddleware;_df1‍.w('webpack-hot-middleware',[["default",function(v){webpackHotMiddleware=v}]]);let webpackDevMiddleware;_df1‍.w('webpack-dev-middleware',[["default",function(v){webpackDevMiddleware=v}]]);let historyApiFallback;_df1‍.w('connect-history-api-fallback',[["default",function(v){historyApiFallback=v}]]);let browserSync;_df1‍.w('browser-sync',[["default",function(v){browserSync=v}]]);let config;_df1‍.w('../build/webpack.config.js',[["default",function(v){config=v}]]);






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
