import setting from './setting.js';
const glob = require('glob');
const path = require('path')

const root = path.resolve(__dirname, '..');
const fileRootPath = setting.entry;
let files = glob.sync(fileRootPath + '**/index.js');

let entries = {};
files.forEach(function(f){
   var name = f.replace(fileRootPath, '').replace('.js', '');
   entries[name] = f;
});
entries = Object.assign({}, {'app': fileRootPath + 'app.js'}, entries);


export default entries;