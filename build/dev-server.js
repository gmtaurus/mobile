var Q = require('q');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
const serveStatic = require('serve-static')
var webpackDevMiddle = require('webpack-dev-server');
var webpackHotMiddle = require('webpack-hot-middleware');
var config = require('../config/index');
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var webpackConfig = require('./webpack-dev-conf.js');


function server() {
    this.app = express();
    this.port = 8080;
}
server.prototype.start = function() {
    // 启动服务，处理静态资源和模板
    return Q()
            .then(bindWebpack.bind(this))
            .then(bindStatic.bind(this))
            .then(startServer.bind(this))
}
function bindWebpack() {
    var compiler = webpack(webpackConfig);
    var devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    });
    this.app.use(devMiddleware);

    var hotMiddleware = require('webpack-hot-middleware')(compiler)
    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
            hotMiddleware.publish({
                action: 'reload'
            })
            cb()
        })
    });
    this.app.use(hotMiddleware);
}
function bindStatic() {
    var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
    this.app.use("/static", serveStatic(path.join(__dirname, '../static')))
}
function startServer () {
    var port = this.port

    this.app.listen(port, function(error) {
        if (error) {
            throw error
        } else {
            console.info("==> \n🌎  服务启动成功，监听端口：%s. \n在浏览器中打开 \nhttp://localhost:%s/index.html", port, port, port)
            // open("http://"+ utils.getLocalIP()['en0'] +":8086/views/index.html")
        }
    })
}
module.exports = new server().start();