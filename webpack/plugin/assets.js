const config = require('../config.js');
const AssetsPlugin = require('assets-webpack-plugin');

const assetConfig = {
  filename: config.assetPath
};

if (config.assetJs) {
  assetConfig.processOutput = function (assets) {
    return 'window.staticMap = ' + JSON.stringify(assets);
  };
}

module.exports = new AssetsPlugin(assetConfig);