import { View, Text } from '@tarojs/components'
import { useEffect } from 'react'
import './index.scss'

const Home = () => {
  useEffect(() => {
    console.log('首页加载完成')
  }, [])

  return (
    <View className="home-page">
      <View className="temp-header">
        <Text className="title">知时日历 - 首页</Text>
        <Text className="subtitle">正在开发中...</Text>
      </View>
    </View>
  )
}

export default Home
