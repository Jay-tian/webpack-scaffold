
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config.js');

let plugin = [
  new webpack.BannerPlugin(config.author),
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin('[name]_[chunkhash].css', {
    allChunks: true
  }),
  new webpack.optimize.SplitChunksPlugin({
    chunks: 'all',
    minSize: 20000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: true
  }),
  new webpack.ProvidePlugin({
    $: 'jquery', 
    jQuery: 'jquery', 
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
    Popper: ['popper.js', 'default'],
  }),
];

module.exports = plugin;