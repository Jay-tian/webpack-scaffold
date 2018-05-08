
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./config.js');
// const PurifyPlugin = require('purifycss-webpack');

let plugin = [
  new webpack.BannerPlugin(config.author),
  new webpack.HotModuleReplacementPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  }),
  new webpack.optimize.SplitChunksPlugin({
    chunks: 'all',
    minSize: 20000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: true
  }),
  // new PurifyPlugin({
  //   moduleExtensions: [
  //     '.html',
  //     '.pug',
  //     '.js',
  //     '.jsx',
  //     '.ts',
  //     '.tsx',
  //   ],
  //   paths: config.htmlPaths,
  //   purifyOptions: {
  //     info: true,
  //     minify: true,
  //     rejected: false,
  //   },
  //   styleExtensions: [
  //     '.css',
  //     '.less',
  //     '.sass',
  //     '.scss',
  //     '.styl',
  //   ],
  // }),
  new webpack.ProvidePlugin({
    $: 'jquery', 
    jQuery: 'jquery', 
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
    Popper: ['popper.js', 'default'],
  }),
];

module.exports = plugin;