import entries from './entries.js';
import loader from './loader.js';
import plugin from './plugin.js';
import process from 'process';
import config from './env.js';

let webpackConfig = {
  entry: entries,
  output: {
    path: config.setting.output, 
    filename: '[name].js',
    publicPath: config.setting.publicPath,
  },
  module: {
    loaders: loader,
  },
  plugins: plugin,
};

if ('development' ===  config.env) {
  webpackConfig.devtool = 'eval-source-map';
  webpackConfig.devServer = {
    contentBase: process.cwd(),
    port: 3032,
    inline: false,
    historyApiFallback: false,
    hot: true,
    stats: 'normal',
  };
}

module.exports = webpackConfig;