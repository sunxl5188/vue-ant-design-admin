'use strict'
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const path = require('path')
const webpack = require('webpack')
const resolve = dir => path.resolve(__dirname, dir)
const CompressionWebpackPlugin = require('compression-webpack-plugin') // 引入插件

module.exports = {
  publicPath: '/', // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.VUE_APP_OUTPUTDir, // 'dist', 生产环境构建文件的目录
  assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境的 source map
  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: false,

    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {}
      }
    },

    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    // modules: false
    requireModuleExtension: true // 启用CSS modules for all css
  },

  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,
  pwa: {},
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/css/valiables.less')
      ]
    }
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
    // 修复 Lazy loading routes Error
    config.plugin('html').tap(args => {
      args[0].chunksSortMode = 'none'
      return args
    })

    // 添加别名
    config.resolve.alias.set('@', resolve('src'))
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 生产
      config.mode = 'production'
      config.performance = { // 打包文件大小配置
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      }
      return {
        plugins: [
          new CompressionWebpackPlugin({
            test: /\.js$|\.css/,
            threshold: 10240,
            deleteOriginalAssets: false
          }),
          new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 5,
            minChunkSize: 100
          }),
          new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'windows.jQuery': 'jquery',
            _: 'lodash'
          })
        ]
      }
    } else {
      // 开发
      return {
        plugins: [
          new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'windows.jQuery': 'jquery',
            _: 'lodash'
          })
        ]
      }
    }
  },
  devServer: {
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    open: IS_PROD, // 是否自动弹出浏览器页面
    host: '0.0.0.0',
    port: 8080,
    https: false, // 是否使用https协议
    hotOnly: false, // 是否开启热更新
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_URL, // 代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        ws: false, // 代理websockets
        pathRewrite: {
          // 路径重写，
          '^/api': '' // 替换target中的请求地址，也就是说以后你在请求http://api.taobao.com/xxx这个地址的时候直接写成/taobao/xxx即可。
        }
      }
    }
  }
}
