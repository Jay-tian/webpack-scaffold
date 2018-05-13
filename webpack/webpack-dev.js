const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const config = require('./webpack.js');
const compiler = webpack(config);
const express = require('express');
const app = express();
 
app.use(middleware(compiler, {
  publicPath: '/dist',
  quiet: false,
  noInfo: false,
  progress: true,
  stats: {
    colors: true,
    hash: false,
    chunks: false,
    chunkModules: false,
    errorDetails: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
  lazy: false,
}));
 
app.listen(3000, () => console.log('Example app listening on port 3000!'));