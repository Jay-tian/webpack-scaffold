
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const RemoveWebpackPlugin = require('jay-remove-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path');
const tools = require('./tools.js');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 10 });

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
  new HappyPack({
    id: 'js',
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        presets: ['es2015'],
        plugins: ['transform-runtime']
      }
    }]
  }),
  new HappyPack({
    id: 'less',
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'less-loader',
    }]
  }),
  new HappyPack({
    id: 'css',
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'css-loader',
    }]
  }),
  new HappyPack({
    id: 'style',
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'style-loader',
    }]
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
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
  new StyleLintPlugin({
    context: config.lessPath,
    files: '**/*.(less|css|sass)',
  }),
  new ProgressBarPlugin(),
  new RemoveWebpackPlugin({
    filterPath: config.removePattern,
  }),
];

if ('production' == config.env) {
  plugin.push(new CleanWebpackPlugin([config.output], {
    root: config.rootPath
  }));

  plugin.push(new ParallelUglifyPlugin({
    cacheDir: path.join(config.rootPath,'webpack-cache'),
    workerCount: 5,
    uglifyJS:{
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    }
  }));
  // plugin.push(new BundleAnalyzerPlugin());
}

module.exports = plugin;