import { Solar, Lunar } from 'lunar-javascript'

/**
 * 农历转换工具
 */

/**
 * 公历转农历
 * @param {string|Date} date - 公历日期
 * @returns {object} 农历信息
 */
export const solarToLunar = (date) => {
  try {
    const d = new Date(date)
    const solar = Solar.fromDate(d)
    const lunar = solar.getLunar()
    
    return {
      year: lunar.getYearInChinese(), // 乙巳年
      month: lunar.getMonthInChinese(), // 十月
      day: lunar.getDayInChinese(), // 初二
      fullString: `${lunar.getYearInChinese()}${lunar.getMonthInChinese()}${lunar.getDayInChinese()}`,
      ganzhi: `${lunar.getYearInGanZhi()}年 ${lunar.getMonthInGanZhi()}月 ${lunar.getDayInGanZhi()}日`,
      yearPillar: lunar.getYearInGanZhi(),
      monthPillar: lunar.getMonthInGanZhi(),
      dayPillar: lunar.getDayInGanZhi()
    }
  } catch (error) {
    console.error('农历转换失败:', error)
    return {
      year: '',
      month: '',
      day: '',
      fullString: '',
      ganzhi: '',
      yearPillar: '',
      monthPillar: '',
      dayPillar: ''
    }
  }
}

/**
 * 农历转公历
 * @param {number} year - 农历年
 * @param {number} month - 农历月
 * @param {number} day - 农历日
 * @param {boolean} _isLeap - 是否闰月（已添加下划线前缀表示未使用）
 * @returns {object} 公历信息
 */
export const lunarToSolar = (year, month, day, _isLeap = false) => {
  try {
    const lunar = Lunar.fromYmd(year, month, day)
    const solar = lunar.getSolar()
    
    return {
      year: solar.getYear(),
      month: solar.getMonth(),
      day: solar.getDay(),
      date: new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay())
    }
  } catch (error) {
    console.error('农历转换失败:', error)
    return {
      year: 0,
      month: 0,
      day: 0,
      date: new Date()
    }
  }
}
