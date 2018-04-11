const process = require('process');
const rootPath = process.cwd();
const util = require('./util.js');


let defaultSetting = {
  entry: rootPath + '/src/js/',
  output: rootPath + '/dist/',
  publicPath: '/dist/', //publicPath 本地开发，文件引用路径
  author: 'tsj',
  rootPath: process.cwd(),
  env: process.env.NODE_ENV,
};

let settingPath = rootPath + process.env.settingPath;

if (util.fsExistsSync(settingPath)) {
  let setting = require(settingPath);
  defaultSetting = Object.assign(defaultSetting, setting);
}

module.exports = defaultSetting;