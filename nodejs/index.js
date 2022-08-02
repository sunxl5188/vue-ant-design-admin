var express = require('express')
var { createProxyMiddleware } = require('http-proxy-middleware')
var app = express()

app.all('/*', function (req, res, next) {
  // 跨域处理
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next() // 执行下一个路由
})

// 配置代理
app.use('/api', createProxyMiddleware({
  target: 'http://www.api.me/index/index/article',
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    res.header('Access-Control-Allow-Origin', '*')
  }
}))

// app.use('/', createProxyMiddleware({
//   // 代理跨域目标接口
//   // target: 'http://is.snssdk.com/api/news/feed/v51/',
//   target: 'http://www.api.me/index/index/article',
//   changeOrigin: true,
//
//   // 修改响应头信息，实现跨域并允许带cookie
//   onProxyRes: function (proxyRes, req, res) {
//     res.header('Access-Control-Allow-Origin', '*')
//   }
//   // 修改响应信息中的cookie域名
// //  cookieDomainRewrite: ''  // 可以为false，表示不修改
// }))

app.listen(3000, function () {
  console.log('服务器运行在3000端口')
})
