const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sourcePath = path.join(__dirname);
const targetPath = path.join(__dirname, 'dist');
const isProduction = function() {
    return process.env.NODE_ENV === 'production';
};
const plugins = [];
if (isProduction()) {
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            test: /(\.jsx|\.js)$/,
            minimize: true,
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            },
        })
    );
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }));
}

plugins.push(new HtmlWebpackPlugin({
    title: 'scuinfo beta',
    template: './public/index.ejs', // Load a custom template (ejs by default see the FAQ for details)
}));
module.exports = {
    context: sourcePath, //上下文
    entry: './app/index.jsx',
    output: {
        filename: 'bundle.[chunkhash].js',
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
            exclude: /node_modules/,
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
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    devtool: isProduction() ? false : 'source-map',
    devServer: {
        contentBase: [path.join(__dirname, 'dist')], //将dist文件夹和public文件夹中的文件合并在根目录下
        compress: true,
        port: 9002, //端口设定
        host: '0.0.0.0'
    }
};
