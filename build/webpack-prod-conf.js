var path    = require("path")
var webpack = require('webpack')
var config  = require('./webpack-base-conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

config = Object.assign(config, {
    output: {
        path: path.resolve(__dirname, '../output/resoure'),
        publicPath: './static/',
        filename: '[name].js'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'prod'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("../output/resoure/styles.css")
    ]
})

module.exports = config
