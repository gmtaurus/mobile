var path = require('path');
var webpack = require('webpack');
var config = require('../config/index');
var utils = require('./utils.js');

module.exports = {
    entry: {
        index: path.join(__dirname, '../widget/index/index'),
        member: path.join(__dirname, '../widget/member/member')
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'widget': path.resolve(__dirname, '../widget'),
            'static': path.resolve(__dirname, '../static'),
            'components': path.resolve(__dirname, '../widget/components'),
        }
    },
    module: {
        rules: [
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
                loader: 'vue-html-loader'
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('autoprefixer')(),
                                require('postcss-px2rem')({remUnit: 75})
                            ]
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('autoprefixer')(),
                                require('postcss-px2rem')({remUnit: 75})
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: utils.assetsPath('images/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|mp3)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: utils.assetsPath('[name].[hash:7].[ext]')
                }
            },
        ]
    },
    plugins: [
        
    ]
};