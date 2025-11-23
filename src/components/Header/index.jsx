import { View, Text } from '@tarojs/components'
import { formatDate, getWeekDay } from '@/utils/date'
import { solarToLunar } from '@/utils/lunar'
import './index.scss'

const Header = ({ date, onDateChange }) => {
    // 格式化日期
    const currentDate = new Date(date)
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()
    const weekday = getWeekDay(date)

    // 获取农历日期
    const lunarInfo = solarToLunar(formatDate(date))
    const lunarText = `${lunarInfo.year} ${lunarInfo.month}${lunarInfo.day}`

    // 判断是否为今天
    const today = new Date()
    const isToday = currentDate.getFullYear() === today.getFullYear() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getDate() === today.getDate()

    return (
        <View className="header">
            <View className="header-safe-area"></View>
            <View className="header-content">
                <View className="date-switch" onClick={() => onDateChange && onDateChange('prev')}>
                    <Text className="icon">‹</Text>
                    <Text className="label">昨天</Text>
                </View>

                <View className="date-display">
                    <View className="date-main">
                        <Text className="year">{year}年</Text>
                        <Text className="month">{month}月</Text>
                        <Text className="day">{day}</Text>
                    </View>
                    <View className="date-sub">
                        <Text className="weekday">{weekday}</Text>
                        <Text className="divider">·</Text>
                        <Text className="lunar">{lunarText}</Text>
                    </View>
                    {!isToday && (
                        <View className="today-btn" onClick={() => onDateChange && onDateChange('today')}>
                            <Text>今</Text>
                        </View>
                    )}
                </View>

                <View className="date-switch" onClick={() => onDateChange && onDateChange('next')}>
                    <Text className="label">明天</Text>
                    <Text className="icon">›</Text>
                </View>
            </View>
        </View>
    )
}

export default Header
