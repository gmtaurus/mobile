var path = require('path');
var webpack = require('webpack');
var shelljs = require('shelljs/global');
var config = require('../config/index');
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.build.env.NODE_ENV)

var webpackConfig = require('./webpack-prod-conf');
var outpath = path.join(__dirname, '../output');
var assetsPath = path.join(outpath, './static');
rm('-rf', outpath)
// mkdir('-p', assetsPath)
// cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function(err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})