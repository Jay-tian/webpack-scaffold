
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const argv = require('yargs').argv;
import setting from './setting.js';

let plugin = [
    new webpack.BannerPlugin(setting.author),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css', {
        allChunks: true
    },
    new webpack.optimize.CommonsChunkPlugin('common'),
    new webpack.ProvidePlugin({
        $: 'jquery', 
        jQuery: 'jquery', 
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
    }),
)]

if ('prod' === argv.env) {
    plugin.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
        warnings: false
        }
    }));
}

export default plugin;