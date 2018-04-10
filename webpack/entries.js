const config = require('./config.js');
const glob = require('glob');

const fileRootPath = config.entry;
let files = glob.sync(fileRootPath + '**/index.js');

let entries = {};
files.forEach(function(f){
  var name = f.replace(fileRootPath, '').replace('.js', '');
  entries[name] = f;
});

entries = Object.assign({}, {'app': fileRootPath + 'app.js'}, entries);

module.exports = entries;