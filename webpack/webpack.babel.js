import entries from './entries.js';
import loader from './loader.js';
import plugin from './plugin.js';
import setting from './setting.js';
const process = require('process');

const argv = require('yargs').argv;

let webpackConfig = {
	entry: entries,
	output: {
		path: setting.output, 
		filename: '[name].js',
		publicPath: setting.publicPath,
	},
	module: {
		loaders: loader,
	},
	plugins: plugin,
};

if ('dev' ===  argv.env) {
	webpackConfig.devtool = 'eval-source-map';
	webpackConfig.devServer = {
		contentBase: process.cwd(),
		port: 3032,
		inline: false,
		historyApiFallback: false,
		hot: true,
		stats: 'normal',
	};
}

module.exports = webpackConfig;