import Taro from '@tarojs/taro'
import { TIANXING_API_KEY } from '@/config/api'

/**
 * 天行数据API请求封装
 * @param {string} url - 接口地址
 * @param {object} params - 请求参数
 * @returns {Promise} 返回接口数据
 */
export const tianxingRequest = async (url, params = {}) => {
  try {
    // 添加API Key到参数中
    const requestParams = {
      key: TIANXING_API_KEY,
      ...params
    }

    // 构建查询字符串
    const queryString = Object.keys(requestParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(requestParams[key])}`)
      .join('&')

    const fullUrl = `${url}?${queryString}`

    console.log('🌐 天行数据API请求:', fullUrl)

    const response = await Taro.request({
      url: fullUrl,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      }
    })

    console.log('📥 天行数据API响应:', response.data)

    // 检查响应状态
    if (response.statusCode !== 200) {
      throw new Error(`HTTP错误: ${response.statusCode}`)
    }

    const { code, msg, result } = response.data

    // 检查业务状态码
    if (code !== 200) {
      throw new Error(`API错误 (${code}): ${msg}`)
    }

    return result
  } catch (error) {
    console.error('❌ 天行数据API请求失败:', error)
    throw error
  }
}

/**
 * 黄历API请求
 * @param {string} date - 日期 YYYY-MM-DD
 * @param {number} type - 0公历 1农历
 * @returns {Promise} 黄历数据
 */
export const fetchAlmanacAPI = async (date = '', type = 0) => {
  const params = {}
  if (date) {
    params.date = date
  }
  if (type) {
    params.type = type
  }

  return tianxingRequest('https://apis.tianapi.com/lunar/index', params)
}

/**
 * 节假日API请求
 * @param {string} date - 查询日期或日期范围
 * @param {number} type - 0批量、1按年、2按月、3范围
 * @param {number} mode - 0普通模式 1同时返回中外特殊节日信息
 * @returns {Promise} 节假日数据
 */
export const fetchHolidayAPI = async (date, type = 0, mode = 0) => {
  const params = {
    date,
    type,
    mode
  }

  return tianxingRequest('https://apis.tianapi.com/jiejiari/index', params)
}
