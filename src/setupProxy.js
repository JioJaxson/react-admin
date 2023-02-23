/**
 * 配置跨域
 */

// const proxy = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware("/devApi", {
        target:'http://old.web-jshtml.cn/api/react',
        changeOrigin: true,
        pathRewrite: {
            "^/devApi":""
        }
    }))
    // app.use(proxy('/manage/api', {
    //     target: '',
    //     changeOrigin: true
    // }
}
