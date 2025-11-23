import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const NextHolidayCard = ({ data }) => {
    if (!data) return null

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
                    <Text className="name">{data.name}</Text>
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
