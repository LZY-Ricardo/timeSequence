import { getAlmanacData as getMockData } from '@/mock/almanacData'

/**
 * 获取黄历数据
 * @param {string} dateStr - 日期字符串 YYYY-MM-DD
 * @returns {Promise<Object>} 黄历数据
 */
export const getAlmanacData = async (dateStr) => {
  // 生产环境替换为真实API
  // return Taro.request({ url: `/api/almanac?date=${dateStr}` })
  return getMockData(dateStr)
}

/**
 * 获取黄历详情
 * @param {string} dateStr - 日期字符串 YYYY-MM-DD
 * @returns {Promise<Object>} 黄历详情数据
 */
export const getAlmanacDetail = async (dateStr) => {
  return getMockData(dateStr)
}
