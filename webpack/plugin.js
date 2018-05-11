
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./config.js');
const util = require('./util.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const PurifyCSSPlugin = require('purifycss-webpack');

let plugin = [
  new webpack.BannerPlugin(config.author),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  }),
  new webpack.optimize.SplitChunksPlugin({
    chunks: 'async',
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  }),
  new CopyWebpackPlugin(util.handleCopyConfig(config.copyLibs)),
  // new PurifyCSSPlugin({
  //   paths: config.purifyCssPaths,
  // })
];

module.exports = plugin;