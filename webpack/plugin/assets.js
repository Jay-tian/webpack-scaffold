const config = require('../config.js');
const AssetsPlugin = require('assets-webpack-plugin');

const assetConfig = {
  path: config.output,
  filename: config.assetName,
};

if (config.assetJs) {
  assetConfig.processOutput = function (assets) {
    return 'window.staticMap = ' + JSON.stringify(assets);
  };
}

module.exports = new AssetsPlugin(assetConfig);