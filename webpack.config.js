const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const sourcePath = path.join(__dirname);
const targetPath = path.join(__dirname, 'dist');
const vendorConfig = require(path.join(targetPath, 'vendor-config.json'));
const isProduction = function() {
    return process.env.NODE_ENV === 'production';
};
const plugins = [];
if (isProduction()) {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }));
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

}
plugins.push(new webpack.DllReferencePlugin({
    context: sourcePath,
    manifest: require(path.join(targetPath, 'vendor', 'reactStuff-manifest.json'))
}));


plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module) {
            // this assumes your vendor imports exist in the node_modules directory
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    })
);
plugins.push(new HtmlWebpackPlugin({
    title: 'scuinfo - 四川大学校园匿名社区',
    reactFileName: vendorConfig.reactStuff.js,
    // inlineSource: '.js',
    // reactDomFileName:vendorConfig.reactDom.js,
    template: './public/index.ejs', // Load a custom template (ejs by default see the FAQ for details)
    minify: !isProduction() ? false : {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeComments: true
    }

}));
plugins.push(new AssetsPlugin({filename: 'files.json', path:path.join(targetPath)}));
plugins.push(new ManifestPlugin());
// plugins.push(new HtmlWebpackInlineSourcePlugin());
module.exports = {
    context: sourcePath, //上下文
    entry: './app/index.jsx',
    output: {
        filename: 'bundles/[name].[chunkhash].bundle.js',
        chunkFilename: 'chunks/[name].[chunkhash].chunk.js',
        path: targetPath,
        publicPath: '/dist/'
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
        extensions: ['.js', '.json', '.jsx'],
        mainFields: [
            'jsnext:main', 'browser', 'module', 'main'
        ]
    },
    devtool: isProduction() ? false : 'source-map',
    devServer: {
        contentBase: [path.join(__dirname)], //将dist文件夹和public文件夹中的文件合并在根目录下
        compress: true,
        port: 9002, //端口设定
        host: '0.0.0.0',
        proxy: {
            '/api': {
                // target: 'http://scuinfo.com',
                target: 'http://127.0.0.1:4150',
                changeOrigin: true
            }
        }
    }
};
