const process = require('process');
const rootPath = process.cwd();

let setting = {
  entry: rootPath + '/src/js/',
  output: rootPath + '/dist/',
  publicPath: '/dist/', //publicPath 本地开发，文件引用路径
  author: 'tsj',
};

module.exports = setting;