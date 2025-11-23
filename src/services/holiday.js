import { getHolidaysByYear as getMockHolidays, getNextHoliday as getMockNextHoliday } from '@/mock/holidayData'

/**
 * 获取指定年份的节假日
 * @param {number} year - 年份
 * @returns {Promise<Object>} 节假日数据
 */
export const getHolidaysByYear = async (year) => {
  // 生产环境替换为真实API
  // return Taro.request({ url: `/api/holidays?year=${year}` })
  return getMockHolidays(year)
}

/**
 * 获取下一个节假日
 * @returns {Promise<Object>} 下个假期数据
 */
export const getNextHoliday = async () => {
  return getMockNextHoliday()
}
