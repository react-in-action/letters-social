import webpack from 'webpack';
import path from 'path';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false,
  endpoint: 'https://learn-react-newsfeed.herokuapp.com',
};

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: true,
  entry: './src/index',
  target: 'web',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    }),
    new webpack.DefinePlugin(GLOBALS),
  ],
  module: {
    loaders: [{
      test: /\.(js)$/,
      exclude: /node_modules/,
      loaders: [
        'babel-loader',
      ],
    },
    // TODO: fix any webpack 2 stuff below
    {
      test: /(\.css|\.scss)$/,
      loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
    }, {
      test: /\.eot(\?v=\d+.\d+.\d+)?$/,
      loader: 'file',
    }, {
      test: /\.(woff|woff2)$/,
      loader: 'file-loader?prefix=font/&limit=5000',
    }, {
      test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
      loader: 'file-loader?limit=10000&mimetype=application/octet-stream',
    }, {
      test: /\.svg(\?v=\d+.\d+.\d+)?$/,
      loader: 'file-loader?limit=10000&mimetype=image/svg+xml',
    }, {
      test: /\.(jpe?g|png|gif)$/i,
      loaders: ['file'],
    }, {
      test: /\.ico$/,
      loader: 'file-loader?name=[name].[ext]',
    }, {
      test: /(\.css|\.scss)$/,
      include: path.join(__dirname, 'src'),
    }],
  },
};
