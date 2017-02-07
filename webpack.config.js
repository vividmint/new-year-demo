const path = require('path');
const sourcePath = path.join(__dirname);
const targetPath = path.join(__dirname, 'dist');
console.log(sourcePath);

module.exports = {
    context: sourcePath, //上下文
    entry: './app/index.jsx',
    output: {
        filename: 'bundle.js',
        path: targetPath
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            use: 'babel-loader',
            test: /\.(js|jsx)$/,
        },
        {
            test: /\.css$/,
            exclude: /node_modules/ ,
            use: [{
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            },
            {
                loader: 'postcss-loader'
            }
            ]
        }
        ]
    },
    resolve:{
        extensions:['.js','.json','.jsx']
    },
    devtool:'inline-source-map',
    //开发
    devServer: {
        contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'public')], //将dist文件夹和public文件夹中的文件合并在根目录下
        compress: true,
        port: 9002, //端口设定
        host: '0.0.0.0'
    }
};
