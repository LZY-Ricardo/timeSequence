import Taro from '@tarojs/taro'

/**
 * 本地存储工具
 */

/**
 * 存储数据
 */
export const setStorage = (key, data) => {
  try {
    Taro.setStorageSync(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('存储数据失败:', error)
    return false
  }
}

/**
 * 获取数据
 */
export const getStorage = (key, defaultValue = null) => {
  try {
    const data = Taro.getStorageSync(key)
    return data ? JSON.parse(data) : defaultValue
  } catch (error) {
    console.error('获取数据失败:', error)
    return defaultValue
  }
}

/**
 * 删除数据
 */
export const removeStorage = (key) => {
  try {
    Taro.removeStorageSync(key)
    return true
  } catch (error) {
    console.error('删除数据失败:', error)
    return false
  }
}

/**
 * 清空所有数据
 */
export const clearStorage = () => {
  try {
    Taro.clearStorageSync()
    return true
  } catch (error) {
    console.error('清空数据失败:', error)
    return false
  }
}
