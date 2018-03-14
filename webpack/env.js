const process = require('process');
const settingPath =  process.cwd() + '/webpack/setting.js';
const setting = require(settingPath);

const env = {
  env: process.env.NODE_ENV,
  setting: setting,
};

module.exports = env;