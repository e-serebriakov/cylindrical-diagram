const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { HOST, PORTS } = require('./config/config');

const isProd = process.env.NODE_ENV === 'prod';

function getDevtool() {
  let devtool = 'source-map';
  if (isProd) {
    devtool = false;
  }

  return devtool;
}

function getPlugins() {
  const plugins = [
    new CleanWebpackPlugin(['public'], {
      root: __dirname,
      verbose: true,
      dry: false,
    }),
    new webpack.DefinePlugin({
      HOST: JSON.stringify(HOST),
      SERVER_PORT: JSON.stringify(PORTS.SERVER),
      'process.env': {
        NODE_ENV: JSON.stringify(isProd ? 'production' : 'development'),
      },
    }),
    new ExtractTextPlugin('[name].css'),
  ];

  if (isProd) {
    plugins.push(new UglifyJSPlugin());
  }

  return plugins;
}

module.exports = {
  context: `${__dirname}/src/client`,

  entry: {
    index: './app.js',
  },

  output: {
    path: `${__dirname}/public`,
    filename: '[name].js',
    publicPath: '/public/',
  },

  resolve: {
    alias: {
      'babel-polyfill':
        path.join(__dirname, 'node_modules/babel-polyfill/dist/polyfill.js'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /\/node_modules\//,
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            { loader: 'postcss-loader', options: { sourceMap: true } },
            'stylus-loader',
          ],
        }),
        exclude: /\/node_modules\//,
      },
    ],
  },

  devServer: {
    host: HOST,
    port: PORTS.CLIENT,
    hot: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: true,
    },
  },

  stats: {
    children: false,
  },

  devtool: getDevtool(),

  plugins: getPlugins(),
};
