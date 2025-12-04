/**
 * 日历相关API服务
 */
import { getMonthCalendar, formatDate } from '@/utils/date'
import { getCountdownEvents } from './countdown'
import { getHolidaysByYear } from './holiday'

/**
 * 获取月历数据
 * @param {number} year - 年份
 * @param {number} month - 月份（0-11）
 * @returns {Promise<Array>} 日历数据
 */
export const getCalendarData = async (year, month) => {
  console.log('获取月历数据:', year, month)
  return []
}

/**
 * 获取带有倒数日事件标记的日历数据
 * @param {number} year - 年份
 * @param {number} month - 月份（0-11）
 * @returns {Promise<Array>} 包含事件标记的日历数据
 */
export const getCalendarWithEvents = async (year, month) => {
  const calendar = getMonthCalendar(year, month)
  const events = await getCountdownEvents('all')
  const { list: holidays } = await getHolidaysByYear(year)

  // 创建日期到事件的映射
  const dateEventsMap = {}
  events.forEach(event => {
    if (event.nextDate) {
      const dateKey = formatDate(event.nextDate)
      if (!dateEventsMap[dateKey]) {
        dateEventsMap[dateKey] = []
      }
      dateEventsMap[dateKey].push(event)
    }
  })

  // 创建节假日映射
  const holidayMap = {}
  holidays.forEach(holiday => {
    const start = new Date(holiday.startDate)
    const end = new Date(holiday.endDate)

    // 从开始日期迭代到结束日期
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateKey = formatDate(d)
      holidayMap[dateKey] = {
        type: 'rest',
        tag: '休',
        name: holiday.name
      }
    }
  })

  // 将事件标记添加到日历数据
  const calendarWithEvents = calendar.map(week => {
    return week.map(day => {
      const dateKey = formatDate(day.date)
      const dayEvents = dateEventsMap[dateKey] || []
      const holiday = holidayMap[dateKey]

      return {
        ...day,
        hasEvents: dayEvents.length > 0,
        events: dayEvents,
        eventCount: dayEvents.length,
        holiday: holiday
      }
    })
  })

  return calendarWithEvents
}
