/**
 * @字节转换
 * @param bytes 要转换的字节大小
 * @returns {string} 按1024计算返回相应单位值
 */
const bytesToSize = (bytes) => {
  if (bytes === 0) {
    return '0 B'
  } else {
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    const sz = (bytes / Math.pow(k, i)).toFixed(2)
    return sz + ' ' + sizes[i]
  }
}

/**
 * @生成随机字符
 * @param len 字符长度
 * @param radix 生成字符基数
 * @returns {string}
 */
const guid = (len = 32, radix = null) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  radix = radix || chars.length

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (let i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix]
    }
  } else {
    let r
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

/**
 * @等比例缩放图片
 * @param objImg 图片对像 document.getElementById
 * @param maxWidth
 * @param maxHeight
 */
const autoResizeImage = (objImg, maxWidth, maxHeight) => {
  const img = new Image()
  img.src = objImg.src
  let Ratio = 1
  let w = img.width
  let h = img.height
  const wRatio = maxWidth / w
  const hRatio = maxHeight / h
  if (maxWidth === 0 && maxHeight === 0) {
    Ratio = 1
  } else if (maxWidth === 0) {
    if (hRatio < 1) Ratio = hRatio
  } else if (maxHeight === 0) {
    if (wRatio < 1) Ratio = wRatio
  } else if (wRatio < 1 || hRatio < 1) {
    Ratio = (wRatio <= hRatio ? wRatio : hRatio)
  }
  if (Ratio < 1) {
    w = w * Ratio
    h = h * Ratio
  }
  objImg.height = h
  objImg.width = w
}

export default {
  bytesToSize, guid, autoResizeImage
}
