const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = [
  new HappyPack({
    id: 'js',
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        presets: ['es2015'],
        plugins: ['transform-runtime']
      }
    }]
  }),
  new HappyPack({
    id: 'less',
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'less-loader',
    }]
  }),
  new HappyPack({
    id: 'css',
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'css-loader',
    }]
  }),
  new HappyPack({
    id: 'style',
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'style-loader',
    }]
  })
];
