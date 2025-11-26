import { View, Text } from '@tarojs/components'
import { Swipe, Button } from '@nutui/nutui-react-taro'
import './index.scss'

const EventCard = ({ data, onEdit, onDelete }) => {
    const { title, description, targetDate, color } = data

    // Calculate days difference
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const target = new Date(targetDate)
    target.setHours(0, 0, 0, 0)

    const diffTime = target - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const isPast = diffDays < 0
    const days = Math.abs(diffDays)

    const rightAction = (
        <Button
            type="danger"
            shape="square"
            onClick={(e) => {
                e.stopPropagation()
                onDelete && onDelete(data)
            }}
        >
            删除
        </Button>
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
                        <Text className="title">{title}</Text>
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
