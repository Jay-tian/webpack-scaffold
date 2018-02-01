const ExtractTextPlugin = require('extract-text-webpack-plugin');
let loader = [
    {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
            'css-loader!' +
            'less-loader' 
        )
    },
    {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
            cacheDirectory: true,
            presets: ['stage-0', 'es2015'],
            plugins: ['transform-runtime']
        }
    },
    {  
        test:/\.(woff)|(svg)|(eot)|(ttf)/,  
        use: [  
            {  
                loader: "file-loader",  
                options: {  
                    name:"[hash:8]",  
                    outputPath:"iconfont/"  
                }  
            }  
        ]  
    }, 
];

export default loader;