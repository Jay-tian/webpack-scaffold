
const webpack = require('webpack');
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
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const happypack = require('./plugin/happypack.js');
const assetsPlugin = require('./plugin/assets.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getCopyPaths = function(list){
  let copyConfig = [];
  list.forEach(function(name) {
    copyConfig.push({
      from: path.join(config.rootPath + '/node_modules/', name),
      to: path.join(config.output, '/js/libs/' + tools.dirname(name)),
      toType: 'dir',
      ignore: ['test/*','tests/*','*.md', 'LICENSE', 'package.json', 'package-lock.json', 'gulpfile.js', 'composer.json', 'bower.json']
    });
  });

  return copyConfig;
};


let plugin = [
  new webpack.BannerPlugin(config.author),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new MiniCssExtractPlugin({
    filename: config.filename + '.css',
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
  new CopyWebpackPlugin(getCopyPaths(config.copyLibs)),
  new OptimizeCssAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorOptions: { discardComments: { removeAll: true }, safe: true},
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
  assetsPlugin,
];
plugin = plugin.concat(happypack);

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

  plugin.push(new PurifyCSSPlugin({
    paths: config.purifyCssPaths,
  }));

  plugin.push(new ImageminPlugin({
    test: /\.(jpe?g|png|gif|svg)$/i,
    pngquant: {
      quality: '95-100',
    },
    optipng: {
      optimizationLevel: 5
    }
  }));

  // plugin.push(new BundleAnalyzerPlugin());
}

module.exports = plugin;