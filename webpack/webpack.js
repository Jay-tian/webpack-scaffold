const entries = require('./entries.js');
const loader = require('./loader.js');
const plugin = require('./plugin.js');
const process = require('process');
const config = require('./config.js');

let webpackConfig = {
  entry: entries,
  output: {
    path: config.output, 
    filename: '[name]_[hash].js',
    publicPath: config.publicPath,
  },
  module: {
    rules: loader,
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