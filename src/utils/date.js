/**
 * 日期格式化工具
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
}

/**
 * 计算两个日期之间的天数差
 */
export const getDaysDiff = (date1, date2) => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diff = Math.abs(d2 - d1)
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

/**
 * 获取星期几
 */
export const getWeekDay = (date) => {
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']
  const d = new Date(date)
  return `星期${weekDays[d.getDay()]}`
}

/**
 * 获取循环日期的下一个日期
 */
export const getNextLoopDate = (targetDate, loopType) => {
  const today = new Date()
  const target = new Date(targetDate)

  if (loopType === 'none') {
    return target
  }

  let nextDate = new Date(target)

  switch (loopType) {
    case 'yearly':
      nextDate.setFullYear(today.getFullYear())
      if (nextDate < today) {
        nextDate.setFullYear(today.getFullYear() + 1)
      }
      break

    case 'halfYear':
      while (nextDate < today) {
        nextDate.setMonth(nextDate.getMonth() + 6)
      }
      break

    case 'quarterly':
      while (nextDate < today) {
        nextDate.setMonth(nextDate.getMonth() + 3)
      }
      break

    case 'monthly':
      nextDate.setMonth(today.getMonth())
      nextDate.setFullYear(today.getFullYear())
      if (nextDate < today) {
        nextDate.setMonth(nextDate.getMonth() + 1)
      }
      break
  }

  return nextDate
}

/**
 * 获取当前月份的日历数据（6行7列）
 */
export const getMonthCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const prevMonthLastDay = new Date(year, month, 0)

  const firstDayWeek = firstDay.getDay()
  const daysInMonth = lastDay.getDate()
  const daysInPrevMonth = prevMonthLastDay.getDate()

  const calendar = []
  let dayCount = 1
  let nextMonthDayCount = 1

  // 生成6行7列的日历数据
  for (let i = 0; i < 6; i++) {
    const week = []
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayWeek) {
        // 上个月的日期
        week.push({
          day: daysInPrevMonth - firstDayWeek + j + 1,
          isCurrentMonth: false,
          isPrevMonth: true,
          date: new Date(year, month - 1, daysInPrevMonth - firstDayWeek + j + 1)
        })
      } else if (dayCount <= daysInMonth) {
        // 当前月的日期
        week.push({
          day: dayCount,
          isCurrentMonth: true,
          date: new Date(year, month, dayCount)
        })
        dayCount++
      } else {
        // 下个月的日期
        week.push({
          day: nextMonthDayCount,
          isCurrentMonth: false,
          isNextMonth: true,
          date: new Date(year, month + 1, nextMonthDayCount)
        })
        nextMonthDayCount++
      }
    }
    calendar.push(week)
  }

  return calendar
}
