const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config.js');

let loader = [
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: [
      {
        loader: 'css-loader'
      },     
    ]})
  },
  {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: [
      {
        loader: 'css-loader'
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: ()=>[
            require('autoprefixer')({
              broswers:['last 5 versions']
            })
          ]
        },
      },
      {
        loader: 'less-loader'
      }
    ]})
  },
  {
    test: /\.js?$/,
    include: config.entry,
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      presets: ['es2015'],
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
  // {
  //   enforce: 'pre',
  //   test:/\.(js|html)$/,
  //   exclude:['/bootstrap/', '/node_modules/'],
  //   loader: 'eslint-loader',
  //   options: {
  //     fix: true,
  //   }
  // },
];

module.exports = loader;