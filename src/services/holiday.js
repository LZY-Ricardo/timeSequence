/**
 * 节假日相关API服务
 */

/**
 * 获取指定年份的节假日
 * @param {number} year - 年份
 * @returns {Promise<Object>} 节假日数据
 */
export const getHolidaysByYear = async (year) => {
  // TODO: 后续实现真实API调用或使用Mock数据
  console.log('获取节假日数据:', year)
  return {
    next: null,
    list: []
  }
}

/**
 * 获取下一个节假日
 * @returns {Promise<Object>} 下个假期数据
 */
export const getNextHoliday = async () => {
  // TODO: 后续实现真实API调用或使用Mock数据
  const currentYear = new Date().getFullYear()
  const data = await getHolidaysByYear(currentYear)
  return data.next
}
