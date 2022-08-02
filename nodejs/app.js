const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express()

app.use('/', createProxyMiddleware({
  // 代理跨域目标接口
  // target: 'http://is.snssdk.com/api/news/feed/v51/',
  target: 'http://www.api.me/index/index/article',
  changeOrigin: true,

  // 修改响应头信息，实现跨域并允许带cookie
  onProxyRes: function (proxyRes, req, res) {
    res.header('Access-Control-Allow-Origin', '*')
  }
  // 修改响应信息中的cookie域名
//  cookieDomainRewrite: ''  // 可以为false，表示不修改
}))

app.listen(3000)// 你的端口
