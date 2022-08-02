/**
 * @工具文件, 编写所有公共方法函数
 */

import vueCookie from 'vue-cookies'

/**
 * 字节转换
 * @param bytes 要转换的字节大小
 * @returns {string} 按1024计算返回相应单位值
 */
export function bytesToSize (bytes) {
  if (bytes === 0) return '0 B'
  let k = 1024
  let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = Math.floor(Math.log(bytes) / Math.log(k))
  let sz = (bytes / Math.pow(k, i)).toFixed(2)
  return sz + ' ' + sizes[i]
}

/**
 * 图片转base64 支持远程图片
 * @param url 图片地址
 * @param imgWidth 图片宽 为空默认原图片宽
 * @param imgHeight 图片高 为空默认原图片高
 * @param callback 回调base64编码
 */
export function getUrlBase64 (url, imgWidth, imgHeight, callback) {
  let canvas = document.createElement('canvas') // 创建canvas DOM元素
  let ctx = canvas.getContext('2d')
  let img = new Image()
  img.crossOrigin = 'Anonymous'
  img.src = url
  img.onload = function () {
    let width = imgWidth || this.width
    let height = imgHeight || this.height
    canvas.width = width // 指定画板的宽度，自定义
    canvas.height = height // 指定画板的高度,自定义
    ctx.drawImage(img, 0, 0, width, height) // 参数可自定义
    let dataURL = canvas.toDataURL('image/')
    callback.call(this, dataURL) // 回掉函数获取Base64编码
    canvas = null
  }
}

/**
 * 高亮显示
 */
export function highlight (words, keys) {
  if (keys) {
    return words.replace(new RegExp(keys, 'ig'), (matchedTxt) => '<font style="color:#f90;">' + matchedTxt + '</font>')
  } else {
    return words
  }
}

/**
 * 倒计时初始化
 * @param objName
 */
export function countdownInit (objName) {
  let dateBegin = vueCookie.get(objName + '-expires')
  if (dateBegin) {
    let dateEnd = new Date()
    let dateDiff = dateBegin - dateEnd.getTime()
    let leave1 = dateDiff % (24 * 3600 * 1000)
    let leave2 = leave1 % (3600 * 1000)
    // let minutes = Math.floor(leave2 / (60 * 1000)) 分
    let leave3 = leave2 % (60 * 1000)
    let seconds = Math.round(leave3 / 1000) // 秒
    if (seconds > 0) {
      countdown(objName, seconds)
    } else {
      vueCookie.remove(objName + '-expires')
    }
  }
}

/**
 * 倒计时
 * @param objName 要显示的元素ID
 * @param wait 倒时时间，秒
 */
export function countdown (objName, wait) {
  let _this = document.getElementById(objName)
  let date = new Date()
  date.setTime(date.getTime() + (wait + 1) * 1000)
  if (vueCookie.get(objName + '-expires') === null) {
    vueCookie.set(objName + '-expires', new Date(date).getTime())
  }
  if (_this) {
    if (wait >= 0) {
      vueCookie.set(objName, wait - 1, date)
    } else {
      vueCookie.set(objName, wait - 1, date)
    }
    if (wait <= 0) {
      vueCookie.remove(objName)
      vueCookie.remove(objName + '-expires')
    }
    if (wait === 0) {
      _this.innerHTML = '重获验证码'
      _this.classList.remove('disabled')
      _this.removeAttribute('disabled')
    } else {
      _this.innerHTML = wait + '秒后重新获取'
      _this.classList.add('disabled')
      _this.setAttribute('disabled', true)
      wait--
      setTimeout(function () {
        countdown(objName, wait)
      }, 1000)
    }
  }
}
