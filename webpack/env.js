const process = require('process');
const settingPath =  process.cwd() + process.env.setting_path;
const setting = require(settingPath);

export default {
  env: process.env.NODE_ENV,
  setting: setting,
};