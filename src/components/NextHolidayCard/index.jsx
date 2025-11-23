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

    const handleClick = () => {
        Taro.switchTab({
            url: '/pages/holiday/index'
        })
    }

    return (
        <View className="next-holiday-card" onClick={handleClick}>
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
