import { View, Text } from '@tarojs/components'
import './index.scss'

const Loading = ({ text = '加载中...' }) => {
  return (
    <View className="loading-container">
      <View className="loading-spinner"></View>
      <Text className="loading-text">{text}</Text>
    </View>
  )
}

export default Loading
