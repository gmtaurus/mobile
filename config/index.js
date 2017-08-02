var path = require('path');
module.exports = {
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        publicPath: '/',
        assetsPublicPath: '/',
        assetsSubDirectory: 'static/',
    },
    build: {
        env: {
            NODE_ENV: '"production"'
        },
        assetsRoot: path.resolve(__dirname, '../output'),
        publicPath: 'http://static.haibian.com/fxuetang/',
        assetsPublicPath: '',
        assetsSubDirectory: 'static/',
    }
}