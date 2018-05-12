
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

const getCopyPaths = function(list){
  let copyConfig = [];
  list.forEach(function(name) {
    copyConfig.push({
      from: path.join(config.rootPath + '/node_modules/', name),
      to: path.join(config.output, '/js/libs/' + name),
      toType: 'dir',
      ignore: ['*.md', 'LICENSE', 'package.json', 'package-lock.json', 'gulpfile.js', 'composer.json', 'bower.json']
    });
  });

  return copyConfig;
};

let plugin = [
  new webpack.BannerPlugin(config.author),
  new ExtractTextPlugin({
    filename:  (getPath) => {
      return getPath('[name].css').replace('js', 'css');
    },
    allChunks: true
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
  new CopyWebpackPlugin(getCopyPaths(config.copyLibs)),
  new PurifyCSSPlugin({
    paths: config.purifyCssPaths,
  }),
  new OptimizeCssAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorOptions: { discardComments: { removeAll: true } },
    canPrint: true
  }),
];

module.exports = plugin;