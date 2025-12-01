import { getHolidaysByYear as getMockHolidays, getNextHoliday as getMockNextHoliday } from '@/mock/holidayData'
import { fetchHolidayAPI } from '@/utils/request'
import { getHolidayCache, setHolidayCache } from '@/utils/cache'

/**
 * 将天行数据API返回的节假日数据转换为应用需要的格式
 */
const transformHolidayData = (apiDataList) => {
  if (!Array.isArray(apiDataList) || apiDataList.length === 0) {
    return []
  }

  // 按年查询时返回的数据结构
  return apiDataList.map((item, index) => {
    console.log(`📝 处理第${index + 1}个节假日:`, item)

    const {
      name,      // 节假日名称
      vacation,  // 节假日字符串（用|分隔）
      remark,    // 调休日字符串（用|分隔）
      tip,       // 放假提示
      rest,      // 拼假建议
      wage       // 三倍薪资的具体日期（用|分隔）
    } = item

    // 解析vacation字符串为数组
    const vacationArray = vacation ? vacation.split('|').filter(v => v) : []

    // 节假日范围
    const startDate = vacationArray.length > 0 ? vacationArray[0] : ''
    const endDate = vacationArray.length > 0 ? vacationArray[vacationArray.length - 1] : ''
    const daysCount = vacationArray.length

    // 格式化日期范围显示（如：1月1日-3日）
    const formatDateRange = (start, end) => {
      if (!start) return ''
      const startParts = start.split('-')
      const endParts = end.split('-')
      const startMonth = parseInt(startParts[1])
      const startDay = parseInt(startParts[2])
      const endMonth = parseInt(endParts[1])
      const endDay = parseInt(endParts[2])

      if (startMonth === endMonth) {
        if (startDay === endDay) {
          return `${startMonth}月${startDay}日`
        }
        return `${startMonth}月${startDay}日-${endDay}日`
      }
      return `${startMonth}月${startDay}日-${endMonth}月${endDay}日`
    }

    // 调休日信息（格式化显示）
    const formatWorkDay = (remarkStr) => {
      if (!remarkStr || remarkStr === '') return null

      // 解析调休日字符串
      const remarkDays = remarkStr.split('|').filter(r => r)

      if (remarkDays.length === 0) return null

      return remarkDays.map(day => {
        const parts = day.split('-')
        if (parts.length === 3) {
          return `${parseInt(parts[1])}月${parseInt(parts[2])}日`
        }
        return day
      }).join('、') + '上班'
    }

    return {
      name,
      dateRange: formatDateRange(startDate, endDate),
      startDate,
      endDate,
      daysCount,
      note: tip || `${name}放假${daysCount}天`,
      workDay: formatWorkDay(remark),
      vacation: vacationArray,
      remark: remark ? remark.split('|').filter(r => r) : [],
      rest
    }
  })
}

/**
 * 计算下一个节假日
 */
const findNextHoliday = (holidays) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (const holiday of holidays) {
    const targetDate = new Date(holiday.startDate)
    targetDate.setHours(0, 0, 0, 0)
    const countdown = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24))

    console.log(`📅 检查节假日: ${holiday.name}, 日期: ${holiday.startDate}, 倒数: ${countdown}天`)

    if (countdown >= 0) {
      console.log(`✅ 找到下一个节假日: ${holiday.name}`)
      return {
        ...holiday,
        countdown,
        isPassed: false
      }
    }
  }

  console.log('⚠️ 没有找到未来的节假日')
  return null
}

/**
 * 获取指定年份的节假日
 * @param {number} year - 年份
 * @returns {Promise<Object>} 节假日数据
 */
export const getHolidaysByYear = async (year) => {
  try {
    // 优先从缓存中获取
    const cachedData = getHolidayCache(year)
    if (cachedData) {
      console.log('📦 使用节假日缓存数据:', year)
      return cachedData
    }

    console.log('🌟 开始调用节假日API:', year)

    // 调用天行数据API（按年查询）
    const apiResult = await fetchHolidayAPI(year.toString(), 1, 0)

    console.log('📊 API返回原始数据:', apiResult)

    // API返回的数据结构是 {update: true, list: [...]}
    // 需要提取 list 字段
    const holidayList = apiResult?.list || apiResult || []

    console.log('📋 提取的节假日列表:', holidayList)

    // 转换数据格式
    const holidays = transformHolidayData(holidayList)

    console.log('✅ 转换后的节假日数据:', holidays)

    // 计算倒数天数
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const holidaysWithCountdown = holidays.map(holiday => {
      const targetDate = new Date(holiday.startDate)
      targetDate.setHours(0, 0, 0, 0)
      const countdown = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24))

      return {
        ...holiday,
        countdown: countdown > 0 ? countdown : 0,
        isPassed: countdown < 0
      }
    })

    // 找出下一个假期
    const nextHoliday = findNextHoliday(holidays)

    console.log('🎯 下一个节假日:', nextHoliday)

    const result = {
      next: nextHoliday,
      list: holidaysWithCountdown
    }

    // 缓存数据
    setHolidayCache(year, result)

    return result
  } catch (error) {
    console.error('❌ 获取节假日数据失败，使用Mock数据:', error)
    // 失败时降级使用Mock数据
    return getMockHolidays(year)
  }
}

/**
 * 获取下一个节假日
 * @returns {Promise<Object>} 下个假期数据
 */
export const getNextHoliday = async () => {
  try {
    const currentYear = new Date().getFullYear()

    // 先查询当前年份
    let data = await getHolidaysByYear(currentYear)

    // 如果当前年份没有剩余节假日，查询下一年
    if (!data.next) {
      data = await getHolidaysByYear(currentYear + 1)
    }

    return data.next
  } catch (error) {
    console.error('获取下一个节假日失败，使用Mock数据:', error)
    return getMockNextHoliday()
  }
}
