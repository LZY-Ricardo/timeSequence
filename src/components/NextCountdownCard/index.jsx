import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const NextCountdownCard = ({ data }) => {
    if (!data) return null

    const handleClick = () => {
        // 跳转到倒数日Tab页
        Taro.switchTab({
            url: '/pages/countdown/index'
        })
    }

    return (
        <View className="next-countdown-card" onClick={handleClick}>
            <View className="card-left">
                <View className="countdown-title">
                    <Text className="label">下个倒数日</Text>
                    <View className="name-with-icon">
                        <Text className="countdown-icon">⏳</Text>
                        <Text className="name">{data.title}</Text>
                    </View>
                </View>
                <Text className="target-date">{data.targetDate}</Text>
            </View>

            <View className="card-right">
                <View className="countdown-box">
                    <Text className="countdown-number">{data.daysLeft}</Text>
                    <Text className="countdown-unit">天</Text>
                </View>
            </View>
        </View>
    )
}

export default NextCountdownCard
