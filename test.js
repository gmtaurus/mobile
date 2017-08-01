var path = require('path')
var Q = require('q')
var express = require('express')
var webpack = require('webpack')
var opn = require('opn')
var webpackConfig = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: 'bundle.js',
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
                loaders: [ 'style', 'css', 'less' ]
            }
        ]
    },
}
function server() {
    this.app = express();
    this.port = 8080;
}
server.prototype.start = function() {
    // 启动服务，处理静态资源和模板
    return Q()
            .then(bindWebpack.bind(this))
            .then(startServer.bind(this))
}
function bindWebpack() {
    var compiler = webpack(webpackConfig)
    var devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    })
    this.app.use(devMiddleware)
    var hotMiddleware = require('webpack-hot-middleware')(compiler)
    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
            hotMiddleware.publish({
                action: 'reload'
            })
            cb()
        })
    })
    this.app.use(hotMiddleware)
}
// var port = 8080;

// var server = express()
// var compiler = webpack(webpackConfig)

// var devMiddleware = require('webpack-dev-middleware')(compiler, {
//     publicPath: webpackConfig.output.publicPath,
//     stats: {
//         colors: true,
//         chunks: false
//     }
// })

// var hotMiddleware = require('webpack-hot-middleware')(compiler)
//     // force page reload when html-webpack-plugin template changes
// compiler.plugin('compilation', function(compilation) {
//     compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
//         hotMiddleware.publish({
//             action: 'reload'
//         })
//         cb()
//     })
// })


// // serve webpack bundle output
// server.use(devMiddleware)
// console.log('---------------devMiddleware ready!');
// // enable hot-reload and state-preserving
// // compilation error display
// server.use(hotMiddleware)
// console.log('---------------hotMiddleware ready!');
// serve pure static assets
// var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// server.use(staticPath, express.static('./static'))
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
// module.exports = server.listen(port, function(err) {
//     if (err) {
//         console.log(err)
//         return
//     }
//     var uri = 'http://localhost:' + port
//     console.log('Listening at ' + uri + '\n')

//     // when env is testing, don't need open it
//     if (process.env.NODE_ENV !== 'testing') {
//         opn(uri)
//     }
// })