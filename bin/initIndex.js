const fs = require('fs');
const path = require('path');
const marked = require('marked');
let content = fs.readFileSync(path.join(__dirname, '../README.md'), 'utf-8'); 
let index = fs.readFileSync(path.join(__dirname, '../index.template'), 'utf-8');  

content = marked(content);
index = index.replace('{{content}}', content);
fs.writeFileSync(path.join(__dirname, '../index.html'), index);