var path    = require("path");
var glob = require('glob');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackBaseConfig  = require('./webpack-base-conf');
var config = require('../config/index');
var utils = require('./utils.js');
var prodConfig = {};
prodConfig = Object.assign(webpackBaseConfig, {
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.publicPath,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: config.build.env
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
        new ExtractTextPlugin(path.join(__dirname, "../output/static/styles.css"))
    ]
})
var pages = Object.keys(getEntry('page/**/*.html', 'page/'));
pages.forEach(function(pathname) {
    var conf = {
        filename: 'page/' + pathname + '.html', //生成的html存放路径，相对于path
        template: 'page/' + pathname + '.html', //html模板路径
        inject: false,    //js插入的位置，true/'head'/'body'/false
        /*
        * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
        * 如在html标签属性上使用{{...}}表达式，所以很多情况下并不需要在此配置压缩项，
        * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
        * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
         */
        // minify: { //压缩HTML文件
        //     removeComments: true, //移除HTML中的注释
        //     collapseWhitespace: false //删除空白符与换行符
        // }
    };
    if (pathname in prodConfig.entry) {
        conf.favicon = 'static/images/favicon.ico';
        conf.inject = 'body';
        conf.chunks = ['vendors', pathname];
        conf.hash = true;
    }
    prodConfig.plugins.push(new HtmlWebpackPlugin(conf));
})
function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[pathname] = ['./' + entry];
    }
    return entries;
}
module.exports = prodConfig
