
const webpack = require('webpack');
const argv = require('yargs').argv;
import setting from './setting.js';
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});


let plugin = [
	new webpack.BannerPlugin(setting.author),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.ProvidePlugin({
		$: 'jquery', 
		jQuery: 'jquery', 
		'window.jQuery': 'jquery',
		'window.$': 'jquery',
	}),
	extractLess,
];

if ('prod' === argv.env) {
	plugin.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}));
}

export default plugin;