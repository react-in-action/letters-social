let join;_0bc‍.w('path',[["join",function(v){join=v}]]);let webpack;_0bc‍.w('webpack',[["default",function(v){webpack=v}]]);let HtmlWebpackPlugin;_0bc‍.w('html-webpack-plugin',[["default",function(v){HtmlWebpackPlugin=v}]]);let DashboardPlugin;_0bc‍.w('webpack-dashboard/plugin',[["default",function(v){DashboardPlugin=v}]]);




const GLOBALS = {
    __DEV__: true,
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.ENDPOINT': JSON.stringify('http://localhost:3500')
};

_0bc‍.d({
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
        new DashboardPlugin(),
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
                loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
            }
        ]
    }
});
