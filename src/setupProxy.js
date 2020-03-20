// const proxy = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:4000',//process.env.REACT_APP_API_URL,
            changeOrigin: true
        })
    );
    app.use(
        '/uploads',
        createProxyMiddleware({
            target: 'http://localhost:4000',//process.env.REACT_APP_API_URL,
            changeOrigin: true
        })
    );
};
