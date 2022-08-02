import Vue from 'vue'
import VueI18n from 'vue-i18n'

/**
 * 创建 i18n 配置
 * @param locale 本地化语言
 * @param fallback 回退语言
 * @returns {VueI18n}
 */
const initI18n = (locale, fallback) => {
  Vue.use(VueI18n)
  const options = {
    locale,
    fallbackLocale: fallback,
    silentFallbackWarn: true
  }
  return new VueI18n(options)
}

export {
  initI18n
}
