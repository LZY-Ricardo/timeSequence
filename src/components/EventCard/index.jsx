import { View, Text } from '@tarojs/components'
import { Swipe, Button } from '@nutui/nutui-react-taro'
import './index.scss'

const EventCard = ({ data, onEdit, onDelete, onPin }) => {
    const { title, description, targetDate, color, isPinned, daysLeft } = data

    // 使用服务层计算好的天数
    const isPast = daysLeft < 0
    const days = Math.abs(daysLeft)

    const rightAction = (
        <>
            <Button
                type={isPinned ? 'warning' : 'success'}
                shape="square"
                style={{ width: '180rpx', minWidth: '180rpx', maxWidth: '180rpx' }}
                onClick={(e) => {
                    e.stopPropagation()
                    onPin && onPin(data)
                }}
            >
                {isPinned ? '取消置顶' : '置顶'}
            </Button>
            <Button
                type="danger"
                shape="square"
                style={{ width: '140rpx', minWidth: '140rpx', maxWidth: '140rpx' }}
                onClick={(e) => {
                    e.stopPropagation()
                    onDelete && onDelete(data)
                }}
            >
                删除
            </Button>
        </>
    )

    return (
        <Swipe rightAction={rightAction}>
            <View
                className="event-card"
                onClick={() => onEdit && onEdit(data)}
            >
                <View
                    className="color-bar"
                    style={{ backgroundColor: color || '#00897B' }}
                ></View>

                <View className="content">
                    <View className="header">
                        <View className="title-row">
                            <Text className="title">{title}</Text>
                            {isPinned && <View className="pin-badge">置顶</View>}
                        </View>
                        <View className="days-wrapper">
                            <Text className="days-label">{isPast ? '已过' : '还有'}</Text>
                            <Text className="days-number" style={{ color: color || '#00897B' }}>{days}</Text>
                            <Text className="days-label">天</Text>
                        </View>
                    </View>

                    <View className="footer">
                        <Text className="description">{description || '暂无简介'}</Text>
                        <Text className="date">{targetDate}</Text>
                    </View>
                </View>
            </View>
        </Swipe>
    )
}

export default EventCard
