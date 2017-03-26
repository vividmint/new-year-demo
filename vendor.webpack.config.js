var webpack = require('webpack');
var path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const sourcePath = path.join(__dirname);
const targetPath = path.join(__dirname, 'dist');
module.exports = {
    entry: {
        // create two library bundles, one with jQuery and
        // another with Angular and related libraries
        'reactStuff': ['react','react-dom','react-tap-event-plugin'],
        // 'reactDom': ['react-dom']
    },
    output: {
        filename: '[name].vendor.[chunkhash].bundle.js',
        path: path.join(targetPath, 'vendor', 'bundles'),
        library: '[name]_[chunkhash]_lib',
        publicPath:'/dist/vendor/bundles/'
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        mainFields: [
            'jsnext:main', 'browser', 'module', 'main'
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            test: /(\.jsx|\.js)$/,
            minimize: true,
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            },
        }),
        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle
            path: path.join(targetPath, 'vendor', '/[name]-manifest.json'),
            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: '[name]_[chunkhash]_lib'
        }),
        new AssetsPlugin({filename: 'vendor-config.json', path:path.join(targetPath)}),

    ]
};
