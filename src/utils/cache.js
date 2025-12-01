import Taro from '@tarojs/taro'

/**
 * 缓存工具类
 * 用于缓存API请求结果，减少网络请求
 */

const CACHE_KEYS = {
  ALMANAC: 'ALMANAC_DATA_',
  HOLIDAY: 'HOLIDAY_DATA_'
}

// 缓存过期时间（毫秒）
const CACHE_EXPIRY = {
  ALMANAC: 24 * 60 * 60 * 1000, // 黄历数据缓存24小时
  HOLIDAY: 7 * 24 * 60 * 60 * 1000 // 节假日数据缓存7天
}

/**
 * 设置缓存
 * @param {string} key - 缓存键
 * @param {any} data - 缓存数据
 * @param {number} expiry - 过期时间（毫秒）
 */
export const setCache = (key, data, expiry = 24 * 60 * 60 * 1000) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
      expiry
    }
    Taro.setStorageSync(key, JSON.stringify(cacheData))
  } catch (error) {
    console.error('设置缓存失败:', error)
  }
}

/**
 * 获取缓存
 * @param {string} key - 缓存键
 * @returns {any|null} 缓存数据或null
 */
export const getCache = (key) => {
  try {
    const cacheStr = Taro.getStorageSync(key)
    if (!cacheStr) return null

    const cacheData = JSON.parse(cacheStr)
    const { data, timestamp, expiry } = cacheData

    // 检查是否过期
    if (Date.now() - timestamp > expiry) {
      // 过期则删除缓存
      Taro.removeStorageSync(key)
      return null
    }

    return data
  } catch (error) {
    console.error('获取缓存失败:', error)
    return null
  }
}

/**
 * 清除指定缓存
 * @param {string} key - 缓存键
 */
export const removeCache = (key) => {
  try {
    Taro.removeStorageSync(key)
  } catch (error) {
    console.error('清除缓存失败:', error)
  }
}

/**
 * 清除所有缓存
 */
export const clearAllCache = () => {
  try {
    Taro.clearStorageSync()
  } catch (error) {
    console.error('清除所有缓存失败:', error)
  }
}

/**
 * 获取黄历缓存键
 * @param {string} date - 日期
 * @returns {string} 缓存键
 */
export const getAlmanacCacheKey = (date) => {
  return `${CACHE_KEYS.ALMANAC}${date}`
}

/**
 * 获取节假日缓存键
 * @param {number} year - 年份
 * @returns {string} 缓存键
 */
export const getHolidayCacheKey = (year) => {
  return `${CACHE_KEYS.HOLIDAY}${year}`
}

/**
 * 设置黄历缓存
 * @param {string} date - 日期
 * @param {any} data - 黄历数据
 */
export const setAlmanacCache = (date, data) => {
  const key = getAlmanacCacheKey(date)
  setCache(key, data, CACHE_EXPIRY.ALMANAC)
}

/**
 * 获取黄历缓存
 * @param {string} date - 日期
 * @returns {any|null} 黄历数据或null
 */
export const getAlmanacCache = (date) => {
  const key = getAlmanacCacheKey(date)
  return getCache(key)
}

/**
 * 设置节假日缓存
 * @param {number} year - 年份
 * @param {any} data - 节假日数据
 */
export const setHolidayCache = (year, data) => {
  const key = getHolidayCacheKey(year)
  setCache(key, data, CACHE_EXPIRY.HOLIDAY)
}

/**
 * 获取节假日缓存
 * @param {number} year - 年份
 * @returns {any|null} 节假日数据或null
 */
export const getHolidayCache = (year) => {
  const key = getHolidayCacheKey(year)
  return getCache(key)
}
