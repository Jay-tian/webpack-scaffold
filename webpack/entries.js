const config = require('./config.js');
const glob = require('glob');

const fileRootPath = config.entry;
let files = glob.sync(fileRootPath + '**/index.js');

let entries = {};
files.forEach(function(f){
  var name = f.replace(fileRootPath, '').replace('.js', '');
  entries[name] = f;
});

let lessEntries = glob.sync(config.lessPath + '**/*.less');
lessEntries.forEach(function(f){
  var name = f.replace(config.lessPath, '/less/').replace('.less', '');
  entries[name] = f;
});

entries = Object.assign({}, {'app': config.mainJs}, entries);

module.exports = entries;