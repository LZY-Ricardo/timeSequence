/**
 * 黄历相关API服务
 */

/**
 * 获取黄历数据
 * @param {string} dateStr - 日期字符串 YYYY-MM-DD
 * @returns {Promise<Object>} 黄历数据
 */
export const getAlmanacData = async (dateStr) => {
  // TODO: 后续实现真实API调用或使用Mock数据
  console.log('获取黄历数据:', dateStr)
  return {
    date: dateStr,
    lunar: '待实现',
    yi: [],
    ji: []
  }
}

/**
 * 获取黄历详情
 * @param {string} dateStr - 日期字符串 YYYY-MM-DD
 * @returns {Promise<Object>} 黄历详情数据
 */
export const getAlmanacDetail = async (dateStr) => {
  // TODO: 后续实现真实API调用或使用Mock数据
  console.log('获取黄历详情:', dateStr)
  return getAlmanacData(dateStr)
}
