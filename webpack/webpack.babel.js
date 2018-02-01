import baseConfig from './base.js';
let plugins =  baseConfig.plugins;

const argv = require('yargs').argv;
const webpack = require('webpack');

if ('prod' === argv.env) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
        warnings: false
        }
    }));
}

let webpackConfig = {
    entry: baseConfig.entries,
    output: baseConfig.output,
    module: {
        loaders: baseConfig.loaders
    },
    plugins: plugins
}

if ('dev' ===  argv.env) {
    console.log(__dirname);
    webpackConfig.devtool = 'eval-source-map';
    webpackConfig.devServer = {
        contentBase: __dirname + "/../dist",
        port: 3032,
        inline: false,
        historyApiFallback: false,
        hot: true,
        stats: 'normal',
    };
}

module.exports = webpackConfig;