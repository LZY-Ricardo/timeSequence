import { View } from '@tarojs/components'
import './index.scss'

const Skeleton = ({ type = 'card', count = 1 }) => {
  const renderCard = () => (
    <View className="skeleton-card">
      <View className="skeleton-header">
        <View className="skeleton-line short"></View>
        <View className="skeleton-circle"></View>
      </View>
      <View className="skeleton-body">
        <View className="skeleton-line"></View>
        <View className="skeleton-line"></View>
        <View className="skeleton-line medium"></View>
      </View>
    </View>
  )

  return (
    <View className="skeleton-container">
      {Array.from({ length: count }).map((_, index) => (
        <View key={index}>{renderCard()}</View>
      ))}
    </View>
  )
}

export default Skeleton
