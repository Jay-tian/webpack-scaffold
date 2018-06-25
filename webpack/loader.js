const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./config.js');

let loader = [
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'happypack/loader?id=style',
      'happypack/loader?id=css',
    ]
  },
  {
    test: /\.less$/,
    use: [
      'css-hot-loader',
      MiniCssExtractPlugin.loader,
      'happypack/loader?id=css',
      'happypack/loader?id=less',
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
    ]
  },
  {
    test: /\.js?$/,
    include: config.entry,
    loader: 'happypack/loader?id=js',
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
      name: '[hash:10].[ext]',
      outputPath:'image/',
      publicPath: config.publicPath + 'image/',
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

module.exports = loader;