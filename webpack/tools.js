const fs = require('fs');

exports.fsExistsSync = function(path) {
  try{
    fs.accessSync(path, fs.F_OK);
  }catch(e){
    return false;
  }
  return true;
};

exports.dirname = function(path) {
  let paths = path.split('/');
  if (paths[paths.length - 1].indexOf('.') != -1) {
    paths.pop();
  }
  
  return paths.join('/');
};