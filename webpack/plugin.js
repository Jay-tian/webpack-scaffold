
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config.js');

let plugin = [
  new webpack.BannerPlugin(config.author),
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin('[name].css', {
    allChunks: true
  }),
  new webpack.optimize.CommonsChunkPlugin('common'),
  new webpack.ProvidePlugin({
    $: 'jquery', 
    jQuery: 'jquery', 
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
    Popper: ['popper.js', 'default'],
  }),
];

module.exports = plugin;