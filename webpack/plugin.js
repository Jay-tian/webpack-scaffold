
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const removeWebpackPlugin = require('jay-remove-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path');
const tools = require('./tools.js');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const getCopyPaths = function(list){
  let copyConfig = [];
  list.forEach(function(name) {
    copyConfig.push({
      from: path.join(config.rootPath + '/node_modules/', name),
      to: path.join(config.output, '/js/libs/' + tools.dirname(name)),
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
  new removeWebpackPlugin({
    filterPath: config.removePattern,
  }),
  new StyleLintPlugin({
    context: config.lessPath,
    files: '**/*.(less|css|sass)',
  }),
  new ProgressBarPlugin(),
];

if ('production' == config.env) {
  plugin.push(new CleanWebpackPlugin([config.output], {
    root: config.rootPath
  }));

  // plugin.push(new BundleAnalyzerPlugin());
}

module.exports = plugin;