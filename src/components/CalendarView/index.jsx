import { View, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { getMonthCalendar, formatDate } from '@/utils/date'
import { solarToLunar } from '@/utils/lunar'
import { getHolidaysByYear } from '@/services/holiday'
import './index.scss'

const CalendarView = ({ onDateSelect, selectedDate }) => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [calendarData, setCalendarData] = useState([])
    const [holidayMap, setHolidayMap] = useState({})

    // Fetch holidays when year changes
    useEffect(() => {
        const fetchHolidays = async () => {
            const { list } = await getHolidaysByYear(currentYear)
            const map = {}

            list.forEach(holiday => {
                const start = new Date(holiday.startDate)
                const end = new Date(holiday.endDate)

                // Iterate from start to end date
                for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                    const dateStr = formatDate(d)
                    map[dateStr] = {
                        type: 'rest',
                        tag: '休',
                        name: holiday.name
                    }
                }
            })
            setHolidayMap(map)
        }

        fetchHolidays()
    }, [currentYear])

    useEffect(() => {
        const data = getMonthCalendar(currentYear, currentMonth)
        // Add lunar and holiday info
        const enrichedData = data.map(week =>
            week.map(dayInfo => {
                const lunar = solarToLunar(dayInfo.date)
                const dateStr = formatDate(dayInfo.date)
                const holiday = holidayMap[dateStr]

                return {
                    ...dayInfo,
                    lunarDay: lunar.day, // e.g., '初一'
                    holiday: holiday
                }
            })
        )
        setCalendarData(enrichedData)
    }, [currentYear, currentMonth, holidayMap])

    const handleDateClick = (dateInfo) => {
        onDateSelect && onDateSelect(dateInfo)
    }

    const handleMonthChange = (direction) => {
        if (direction === 'prev') {
            if (currentMonth === 0) {
                setCurrentYear(currentYear - 1)
                setCurrentMonth(11)
            } else {
                setCurrentMonth(currentMonth - 1)
            }
        } else {
            if (currentMonth === 11) {
                setCurrentYear(currentYear + 1)
                setCurrentMonth(0)
            } else {
                setCurrentMonth(currentMonth + 1)
            }
        }
    }

    const handleBackToToday = () => {
        const today = new Date()
        setCurrentYear(today.getFullYear())
        setCurrentMonth(today.getMonth())
        onDateSelect && onDateSelect({ date: today })
    }

    const isToday = (date) => {
        const today = new Date()
        return date.toDateString() === today.toDateString()
    }

    const isSelected = (date) => {
        return selectedDate && date.toDateString() === selectedDate.toDateString()
    }

    return (
        <View className="calendar-view">
            <View className="calendar-header">
                <View className="month-switch" onClick={() => handleMonthChange('prev')}>
                    <Text className="icon">‹</Text>
                </View>

                <View className="month-display">
                    <Text className="month">{currentMonth + 1}月</Text>
                    <Text className="year">{currentYear}</Text>
                </View>

                <View className="month-switch" onClick={() => handleMonthChange('next')}>
                    <Text className="icon">›</Text>
                </View>
            </View>

            <View className="back-today-btn" onClick={handleBackToToday}>
                <Text>🏠 回到今天</Text>
            </View>

            <View className="calendar-weekdays">
                {['日', '一', '二', '三', '四', '五', '六'].map(day => (
                    <View key={day} className="weekday">
                        <Text>{day}</Text>
                    </View>
                ))}
            </View>

            <View className="calendar-grid" key={`${currentYear}-${currentMonth}`}>
                {calendarData.map((week, weekIndex) => (
                    <View key={weekIndex} className="calendar-week">
                        {week.map((dateInfo, dayIndex) => (
                            <View
                                key={dayIndex}
                                className={`calendar-day ${!dateInfo.isCurrentMonth ? 'other-month' : ''} ${isToday(dateInfo.date) ? 'today' : ''} ${isSelected(dateInfo.date) ? 'selected' : ''}`}
                                onClick={() => handleDateClick(dateInfo)}
                            >
                                <View className="day-number">{dateInfo.day}</View>
                                {dateInfo.isCurrentMonth && (
                                    <View className="day-lunar">{dateInfo.lunarDay}</View>
                                )}
                                {dateInfo.holiday && (
                                    <View className={`holiday-tag ${dateInfo.holiday.type}`}>
                                        {dateInfo.holiday.tag}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    )
}

export default CalendarView
