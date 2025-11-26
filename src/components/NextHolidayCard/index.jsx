import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const NextHolidayCard = ({ data }) => {
    if (!data) return null

    // 根据节日名称返回对应的emoji图标
    const getHolidayIcon = (name) => {
        if (name.includes('春节')) return '🎊'
        if (name.includes('中秋')) return '🌙'
        if (name.includes('国庆')) return '🎆'
        if (name.includes('元旦')) return '🎉'
        if (name.includes('清明')) return '🌸'
        if (name.includes('端午')) return '🐲'
        if (name.includes('劳动')) return '👷'
        if (name.includes('儿童')) return '🎈'
        return '🎉' // 默认图标
    }

    // 根据节日名称返回对应的主题类名
    const getHolidayTheme = (name) => {
        // 1. 喜庆版：元旦、春节、元宵、国庆、儿童
        const festiveHolidays = ['春节', '元旦', '元宵', '国庆', '儿童']
        // 2. 肃穆版：清明
        const solemnHolidays = ['清明']
        // 3. 雅致版 (通用)：端午、中秋、重阳、劳动、七夕等其他
        // 这里的逻辑是：先匹配前两种，剩下的默认走雅致版，或者显式列出
        const elegantHolidays = ['端午', '中秋', '重阳', '劳动', '七夕']

        if (festiveHolidays.some(h => name.includes(h))) return 'theme-festive'
        if (solemnHolidays.some(h => name.includes(h))) return 'theme-solemn'
        // 其余的或显式匹配的都用雅致版
        return 'theme-elegant'
    }

    const handleClick = () => {
        Taro.switchTab({
            url: '/pages/holiday/index'
        })
    }

    return (
        <View className={`next-holiday-card ${getHolidayTheme(data.name)}`} onClick={handleClick}>
            <View className="card-left">
                <View className="holiday-title">
                    <Text className="label">下个假期</Text>
                    <View className="name-with-icon">
                        <Text className="holiday-icon">{getHolidayIcon(data.name)}</Text>
                        <Text className="name">{data.name}</Text>
                    </View>
                </View>
                <Text className="date-range">{data.dateRange}</Text>
                {data.note && (
                    <Text className="note">{data.note}</Text>
                )}
            </View>

            <View className="card-right">
                <View className="countdown-box">
                    <Text className="countdown-number">{data.countdown}</Text>
                    <Text className="countdown-unit">天</Text>
                </View>
            </View>
        </View>
    )
}

export default NextHolidayCard
