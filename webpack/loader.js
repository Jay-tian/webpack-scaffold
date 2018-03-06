import setting from './setting.js';
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

let loader = [
	{
		test: /\.css$/,
		loaders: [
			'style-loader', 
			'css-loader?importLoaders=1', 
			{
				loader: 'postcss-loader',
				options: {
					plugins: ()=>[
						require('autoprefixer')({
							broswers:['last 5 versions']
						})
					]
				},
			}
		],
	},
	{
		test: /\.less$/,
		use: extractLess.extract({
			use: [{
				loader: "css-loader"
			}, {
				loader: "less-loader"
			}],
			// use style-loader in development
			fallback: "style-loader"
		})
	},
	{
		test: /\.less$/,
		use: [{
			loader: 'style-loader' // creates style nodes from JS strings
		}, {
			loader: 'css-loader' // translates CSS into CommonJS
		}, {
			loader: 'less-loader' // compiles Less to CSS
		}]
	},
	{
		test: /\.js?$/,
		exclude: /(node_modules)/,
		include: setting.entry,
		loader: 'babel-loader',
		query: {
			cacheDirectory: true,
			presets: ['latest'],
			plugins: ['transform-runtime']
		}
	},
	{  
		test:/\.(woff)|(svg)|(eot)|(ttf)/,  
		use: [  
			{  
				loader: 'file-loader',
				options: {  
					name:'[hash:4]',  
					outputPath:'iconfont/'  
				}  
			}  
		]  
	}, 
	{  
		test:/\.(png)|(jpg)|(gif)$/i,  
		loader: 'file-loader',
		query: {
			name: 'image/[hash:10].[ext]',
		}
	}, 
	{
		enforce: 'pre',
		test:/\.(js|html)$/,
		exclude:['/bootstrap/', '/node_modules/'],
		loader: 'eslint-loader',
		options: {
			fix: true,
		}
	},
];

export default loader;