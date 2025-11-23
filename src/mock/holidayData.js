// 节假日Mock数据
export const holidayMockData = {
    2025: [
        {
            name: '元旦',
            dateRange: '1月1日',
            startDate: '2025-01-01',
            endDate: '2025-01-01',
            daysCount: 1,
            note: '1月1日放假',
            workDay: null
        },
        {
            name: '春节',
            dateRange: '1月28日-2月4日',
            startDate: '2025-01-28',
            endDate: '2025-02-04',
            daysCount: 8,
            note: '1月28日（除夕）至2月4日（初七）放假调休，共8天',
            workDay: '1月26日（周日）、2月8日（周六）上班'
        },
        {
            name: '清明节',
            dateRange: '4月4日-6日',
            startDate: '2025-04-04',
            endDate: '2025-04-06',
            daysCount: 3,
            note: '4月4日至6日放假调休，共3天',
            workDay: null
        },
        {
            name: '劳动节',
            dateRange: '5月1日-5日',
            startDate: '2025-05-01',
            endDate: '2025-05-05',
            daysCount: 5,
            note: '5月1日至5日放假调休，共5天',
            workDay: '4月27日（周日）上班'
        },
        {
            name: '端午节',
            dateRange: '5月31日-6月2日',
            startDate: '2025-05-31',
            endDate: '2025-06-02',
            daysCount: 3,
            note: '5月31日至6月2日放假调休，共3天',
            workDay: null
        },
        {
            name: '中秋节',
            dateRange: '10月6日-8日',
            startDate: '2025-10-06',
            endDate: '2025-10-08',
            daysCount: 3,
            note: '10月6日至8日放假调休，共3天',
            workDay: '10月11日（周六）上班'
        },
        {
            name: '国庆节',
            dateRange: '10月1日-7日',
            startDate: '2025-10-01',
            endDate: '2025-10-07',
            daysCount: 7,
            note: '10月1日至7日放假调休，共7天',
            workDay: '9月28日（周日）、10月11日（周六）上班'
        }
    ],
    2026: [
        {
            name: '元旦',
            dateRange: '1月1日-3日',
            startDate: '2026-01-01',
            endDate: '2026-01-03',
            daysCount: 3,
            note: '1月1日（周四）至3日（周六）放假调休，共3天',
            workDay: '1月4日（周日）上班'
        },
        {
            name: '春节',
            dateRange: '2月17日-23日',
            startDate: '2026-02-17',
            endDate: '2026-02-23',
            daysCount: 7,
            note: '2月17日（除夕）至23日（初六）放假调休，共7天',
            workDay: '2月14日（周六）、2月15日（周日）上班'
        },
        {
            name: '清明节',
            dateRange: '4月5日-7日',
            startDate: '2026-04-05',
            endDate: '2026-04-07',
            daysCount: 3,
            note: '4月5日（周日）至7日（周二）放假调休，共3天',
            workDay: null
        },
        {
            name: '劳动节',
            dateRange: '5月1日-5日',
            startDate: '2026-05-01',
            endDate: '2026-05-05',
            daysCount: 5,
            note: '5月1日（周五）至5日（周二）放假调休，共5天',
            workDay: '4月26日（周日）、5月9日（周六）上班'
        },
        {
            name: '端午节',
            dateRange: '6月25日-27日',
            startDate: '2026-06-25',
            endDate: '2026-06-27',
            daysCount: 3,
            note: '6月25日（周四）至27日（周六）放假调休，共3天',
            workDay: '6月28日（周日）上班'
        },
        {
            name: '中秋节',
            dateRange: '10月4日-6日',
            startDate: '2026-10-04',
            endDate: '2026-10-06',
            daysCount: 3,
            note: '10月4日（周日）至6日（周二）放假调休，共3天',
            workDay: null
        },
        {
            name: '国庆节',
            dateRange: '10月1日-7日',
            startDate: '2026-10-01',
            endDate: '2026-10-07',
            daysCount: 7,
            note: '10月1日（周四）至7日（周三）放假调休，共7天',
            workDay: '9月27日（周日）、10月10日（周六）上班'
        }
    ]
}

/**
 * 获取指定年份的节假日
 * @param {number} year - 年份
 * @returns {Promise<Object>} 包含next（下个假期）和list（全部假期）
 */
export const getHolidaysByYear = (year) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const holidays = holidayMockData[year] || []
            const today = new Date()

            // 计算倒数天数
            const holidaysWithCountdown = holidays.map(holiday => {
                const targetDate = new Date(holiday.startDate)
                const countdown = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24))
                return {
                    ...holiday,
                    countdown: countdown > 0 ? countdown : 0,
                    isPassed: countdown < 0
                }
            })

            // 找出下一个假期
            const upcomingHolidays = holidaysWithCountdown.filter(h => !h.isPassed)
            const nextHoliday = upcomingHolidays.length > 0 ? upcomingHolidays[0] : null

            resolve({
                next: nextHoliday,
                list: holidaysWithCountdown
            })
        }, 300)
    })
}

/**
 * 获取下一个节假日
 * @returns {Promise<Object>} 下个假期数据
 */
export const getNextHoliday = async () => {
    const currentYear = new Date().getFullYear()

    // 先查询当前年份
    let data = await getHolidaysByYear(currentYear)

    // 如果当前年份没有剩余节假日，查询下一年
    if (!data.next) {
        data = await getHolidaysByYear(currentYear + 1)
    }

    return data.next
}
