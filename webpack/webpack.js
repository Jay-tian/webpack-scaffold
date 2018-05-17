const entries = require('./entries.js');
const loader = require('./loader.js');
const plugin = require('./plugin.js');
const config = require('./config.js');

let webpackConfig = {
  mode: config.env,
  entry: entries,
  output: {
    path: config.output, 
    filename: '[name].js',
    publicPath: config.publicPath,
  },
  devServer: {
    // 设置服务器访问的基本目录
    contentBase: config.rootPath, //最好设置成绝对路径
    host:'127.0.0.1',
    port: 8080,
    open: true
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