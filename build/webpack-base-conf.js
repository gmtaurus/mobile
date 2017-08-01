var path = require('path');
var config = require('../config/index');
var utils = require('./utils.js');

module.exports = {
    entry: {
        index: path.join(__dirname, '../widget/index/index'),
        member: path.join(__dirname, '../widget/member/member')
    },
    output: {
        path: path.resolve(__dirname, '../output/resoure'),
        // publicPath: '/static/',
        publicPath: config.dev.publicPath,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue'
            },
            {
                test: /\.tpl$/,
                exclude: /node_modules/,
                loader: 'vue-html'
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loaders: [ 'style', 'css', 'less' ],
            }
        ]
    },
    // vue: {
    //     loaders: utils.cssLoaders({
    //         sourceMap: false
    //     }),
    //     postcss: [
    //         require('autoprefixer')({
    //             browsers: ['last 10 versions']
    //         }),
    //         require('postcss-px2rem')({remUnit: 204.8})
    //     ]
    // },
    plugins: [
        
    ]
};