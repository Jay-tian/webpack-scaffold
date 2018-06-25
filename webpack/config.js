const process = require('process');
const rootPath = process.cwd();
const tools = require('./tools.js');
const glob = require('glob');
const path = require('path');
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';

let defaultSetting = {
  entry: rootPath + '/src/js/',
  output: rootPath + '/dist/',
  alias: {
    libs: rootPath + '/src/js/libs/',
  },
  filename: 'production' == env ? '[name].[contenthash]' : '[name]',
  publicPath: '/dist/', //publicPath 本地开发，文件引用路径
  author: 'jay',
  rootPath: rootPath,
  env: env,
  purifyCssPaths: glob.sync(path.join(rootPath, '/*.html')),
  copyLibs: [
    'jquery/dist/jquery.min.js'
  ],
  serverPort: 8082,
  libs: rootPath + '/src/js/libs/',
  removePattern: /^css\/.*\.js?$/,
  mainJs: rootPath + '/src/js/app.js',
  lessPath: rootPath + '/src/less/',
  assetName: 'webpack.assets.js',
  assetJs: true,
};

let settingPath = rootPath + process.env.settingPath;

if (tools.fsExistsSync(settingPath)) {
  let setting = require(settingPath);
  defaultSetting = Object.assign(defaultSetting, setting);
}

module.exports = defaultSetting;