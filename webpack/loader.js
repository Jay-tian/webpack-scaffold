const ExtractTextPlugin = require('extract-text-webpack-plugin');
import setting from './setting.js';
const argv = require('yargs').argv;
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
		loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!postcss-loader!less-loader'})
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
];

if ('prod' === argv.env) {
	loader.push({
		enforce: 'pre',
		test:/\.(js|html)$/,
		exclude:['/bootstrap/', '/node_modules/'],
		loader: 'eslint-loader',
		options: {
			fix: true,
		}
	});
}

export default loader;