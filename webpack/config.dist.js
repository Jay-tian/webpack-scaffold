const process = require('process');
const glob = require('glob');
const path = require('path');
const rootPath = process.cwd();

let purifyCssPaths = glob.sync(path.join(rootPath, '/src/server/view/**/*.twig'));
purifyCssPaths = purifyCssPaths.concat(glob.sync(path.join(rootPath, '/src/client/js/**/*.js')));

let setting = {
  entry: rootPath + '/src/client/js/',
  output: rootPath + '/public/dist/',
  mainJs: rootPath + '/src/client/js/app.js',
  lessPath: rootPath + '/src/client/less/pages',
  publicPath: '/public/',
  author: 'tianshengjie',
  libs: rootPath + '/src/js/libs/',
  purifyCssPaths: purifyCssPaths,
  serverPort: 8082,
  copyLibs: [
    'validator/', 
    'swiper/dist',
    'jquery/dist'
  ],
  alias: {
    libs: rootPath + '/src/js/libs/',
  },
  assetName: 'webpack.assets.js',
  assetJs: true,
};

module.exports = setting;