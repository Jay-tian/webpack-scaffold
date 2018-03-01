const path = require('path');
const rootPath = path.resolve(__dirname, '..');

let setting = {
	entry: rootPath + '/src/js/',
	output: rootPath + '/dist/',
	publicPath: '/dist/', //publicPath 本地开发，文件引用路径
	author: 'tsj',
};

export default setting;