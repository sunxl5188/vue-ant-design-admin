// app.js
const express = require('express')
// 创建web服务器
const app = express()
// 导入gzip包
const compression = require('compression')
// 文件操作
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

// 启用gzip中间件,在托管之前
app.use(compression())
// 托管静态资源
app.use(express.static(path.resolve(__dirname, './dist')))

app.get('/', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  res.send(html)
})

app.get(/^(.*)$/, function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  res.send(html)
})
// 启动web服务器
app.listen(8080, res => {
  console.log(chalk.yellow('Start Service On 8080'))
})
