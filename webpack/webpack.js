const entries = require('./entries.js');
const loader = require('./loader.js');
const plugin = require('./plugin.js');
const config = require('./config.js');

let webpackConfig = {
  entry: entries,
  output: {
    path: config.output, 
    filename: '[name].js',
    publicPath: config.publicPath,
  },
  externals: {
    jquery: 'jQuery',
  },
  module: {
    rules: loader,
  },
  plugins: plugin,
};

module.exports = webpackConfig;