const fs = require('fs');
const path = require('path');
const process = require('process');
const rootPath = process.cwd();

exports.fsExistsSync = function(path) {
  try{
    fs.accessSync(path, fs.F_OK);
  }catch(e){
    return false;
  }
  return true;
};

exports.handleCopyConfig = function(list){
  let copyConfig = [];
  list.forEach(function(name) {
    copyConfig.push({
      from: path.join(rootPath + '/node_modules/', name),
      to: path.join(rootPath, '/dist/js/libs/' + name),
      toType: 'dir',
      ignore: ['*.md', 'LICENSE', 'package.json', 'package-lock.json', 'gulpfile.js', 'composer.json', 'bower.json']
    });
  });

  return copyConfig;
};