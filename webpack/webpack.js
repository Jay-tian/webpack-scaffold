const entries = require('./entries.js');
const loader = require('./loader.js');
const plugin = require('./plugin.js');
const config = require('./config.js');

let webpackConfig = {
  mode: config.env,
  entry: entries,
  resolve: {
    alias: config.alias,
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: config.output, 
    filename: config.filename + '.js',
    publicPath: config.publicPath,
  },
  devServer: {
    // 设置服务器访问的基本目录
    contentBase: config.rootPath, //最好设置成绝对路径
    host:'127.0.0.1',
    port: config.serverPort,
    disableHostCheck: true,
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