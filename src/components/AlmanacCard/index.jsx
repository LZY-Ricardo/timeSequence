import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const AlmanacCard = ({ data, onViewDetail }) => {
    if (!data) return null

    // 只显示前5个宜和忌
    const yiList = data.yi ? data.yi.slice(0, 5) : []
    const jiList = data.ji ? data.ji.slice(0, 5) : []

    const handleDetailClick = () => {
        if (onViewDetail) {
            onViewDetail()
        } else {
            // 黄历页面是TabBar页面，需要使用switchTab
            Taro.switchTab({
                url: '/pages/almanac/index'
            })
        }
    }

    return (
        <View className="almanac-card">
            <View className="card-header">
                <Text className="title">今日黄历</Text>
                <View className="detail-btn" onClick={handleDetailClick}>
                    <Text>详情 ›</Text>
                </View>
            </View>

            {/* 宜区域 */}
            <View className="suit-avoid-section suit">
                <View className="section-label">
                    <View className="dot"></View>
                    <Text className="label-text">宜</Text>
                </View>
                <View className="pills-container">
                    {yiList.map((item, index) => (
                        <View key={index} className="pill">
                            <Text>{item}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* 忌区域 */}
            <View className="suit-avoid-section avoid">
                <View className="section-label">
                    <View className="dot"></View>
                    <Text className="label-text">忌</Text>
                </View>
                <View className="pills-container">
                    {jiList.map((item, index) => (
                        <View key={index} className="pill">
                            <Text>{item}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* 干支信息 */}
            {data.ganzhi && (
                <View className="ganzhi-info">
                    <Text>{data.ganzhi}</Text>
                </View>
            )}
        </View>
    )
}

export default AlmanacCard
