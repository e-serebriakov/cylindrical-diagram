const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV;
const isProd = process.env.NODE_ENV === 'prod';
const isDev = !isProd;

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
      WP_NODE_ENV: JSON.stringify(env),
      WP_IS_DEV: isDev,
      'process.env': {
        NODE_ENV: JSON.stringify(isProd ? 'production' : 'development'),
      },
    }),
    new ExtractTextPlugin('[name].css'),
  ];

  if (isProd) {
    plugins.push(
      new UglifyJSPlugin()
    );
  }

  return plugins;
}

module.exports = {
  context: __dirname + '/src',

  entry: {
    index: './app.js',
  },

  output: {
    path: __dirname + '/public',
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
      }
    ],
  },

  devServer: {
    port: 8080,
    inline: true,
  },

  stats: {
    children: false,
  },

  devtool: getDevtool(),

  plugins: getPlugins(),
};
