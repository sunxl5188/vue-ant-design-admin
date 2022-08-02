/**
 * @param {String} name [储存的名字]
 * @param {String} content [储存的值]
 */
/**
 * 存储localStorage
 */
const PREFIX = process.env.VUE_APP_PREFIX
const lifeData = PREFIX + 'lifeData'

const getTemp = () => {
  let temp = localStorage.getItem(lifeData)
  if (Object.prototype.toString.call(temp) === '[object Null]') {
    temp = {}
  }
  if (Object.prototype.toString.call(temp) === '[object String]') {
    temp = JSON.parse(temp)
  }
  return temp
}

export const setStorage = (name, value) => {
  if (!name) return
  const temp = getTemp()
  temp[name] = value
  localStorage.setItem(lifeData, JSON.stringify(temp))
}

/**
 * 获取localStorage
 */
export const getStorage = name => {
  if (!name) return
  const temp = getTemp()
  return temp === null || temp[name] === undefined ? '' : temp[name]
}

/**
 * 删除localStorage
 */
export const remStorage = name => {
  if (!name) return
  const temp = getTemp()
  if (temp === null) return
  delete temp[name]
  localStorage.setItem(lifeData, JSON.stringify(temp))
}
