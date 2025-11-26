import { View, Text } from '@tarojs/components'
import { formatDate } from '@/utils/date'
import { solarToLunar } from '@/utils/lunar'
import './index.scss'

const DetailPanel = ({ date, data, onViewFull }) => {
    if (!date || !data) return null

    const lunar = solarToLunar(date)

    // 只显示前5个宜和忌
    const yiList = data.yi ? data.yi.slice(0, 5) : []
    const jiList = data.ji ? data.ji.slice(0, 5) : []

    return (
        <View className="detail-panel">
            <View className="panel-header">
                <View className="date-info">
                    <Text className="solar-date">{formatDate(date, 'MM月DD日')}</Text>
                    <Text className="lunar-date">{lunar.fullString}</Text>
                </View>
            </View>

            <View className="panel-content">
                {/* 宜区域 */}
                <View className="suit-avoid-section suit">
                    <View className="section-label">
                        <View className="dot"></View>
                        <Text className="label-text">宜</Text>
                    </View>
                    <View className="pills-container">
                        {yiList.length > 0 ? (
                            yiList.map((item, index) => (
                                <View key={index} className="pill">
                                    <Text>{item}</Text>
                                </View>
                            ))
                        ) : (
                            <Text className="empty-text">诸事不宜</Text>
                        )}
                    </View>
                </View>

                {/* 忌区域 */}
                <View className="suit-avoid-section avoid">
                    <View className="section-label">
                        <View className="dot"></View>
                        <Text className="label-text">忌</Text>
                    </View>
                    <View className="pills-container">
                        {jiList.length > 0 ? (
                            jiList.map((item, index) => (
                                <View key={index} className="pill">
                                    <Text>{item}</Text>
                                </View>
                            ))
                        ) : (
                            <Text className="empty-text">诸事不忌</Text>
                        )}
                    </View>
                </View>

                {/* 干支信息 */}
                <View className="ganzhi-info">
                    <Text>{lunar.ganzhi}</Text>
                </View>
            </View>

            <View className="panel-footer" onClick={onViewFull}>
                <Text>查看完整黄历 ›</Text>
            </View>
        </View>
    )
}

export default DetailPanel
