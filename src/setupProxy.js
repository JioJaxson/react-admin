/**
 * 配置跨域
 */

// const proxy = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware([process.env.REACT_APP_API], {
        target:process.env.REACT_APP_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
            [`^${process.env.REACT_APP_API}`]:""
        }
    }))
    // app.use(proxy('/manage/api', {
    //     target: '',
    //     changeOrigin: true
    // }
}
