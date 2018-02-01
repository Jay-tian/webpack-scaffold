import loader from './loader.js';
import plugin from './plugin.js';

const glob = require('glob');
const path = require('path')

const root = path.resolve(__dirname, '..');
const fileRootPath = root + '/src/js/';
let files = glob.sync(fileRootPath + '**/index.js');

let entries = {};
files.forEach(function(f){
   var name = f.replace(fileRootPath, '').replace('.js', '');
   entries[name] = f;
});
entries = Object.assign({}, {'main': fileRootPath + 'main.js'}, entries);


let config = {
    rootPath: root,
    entries: entries,
    output: {
        path: root + "/dist/", 
        filename: "[name].js",
        publicPath: "dist/",
    },
    loaders: loader,
    plugins: plugin,
}

export default config;