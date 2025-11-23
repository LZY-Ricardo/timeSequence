import { View } from '@tarojs/components'
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { DatePicker } from '@nutui/nutui-react-taro'
import Header from '@/components/Header'
import AlmanacCard from '@/components/AlmanacCard'
import NextHolidayCard from '@/components/NextHolidayCard'
import { formatDate } from '@/utils/date'
import { getAlmanacData } from '@/services/almanac'
import { getNextHoliday } from '@/services/holiday'
import './index.scss'

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [almanacData, setAlmanacData] = useState(null)
  const [nextHoliday, setNextHoliday] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDatePicker, setShowDatePicker] = useState(false)

  useEffect(() => {
    loadData()
  }, [currentDate])

  const loadData = async () => {
    try {
      setLoading(true)
      const dateStr = formatDate(currentDate)

      // 并行加载数据
      const [almanac, holiday] = await Promise.all([
        getAlmanacData(dateStr),
        getNextHoliday()
      ])

      console.log('=== 数据加载完成 ===')
      console.log('almanac:', almanac)
      console.log('holiday:', holiday)
      console.log('==================')

      setAlmanacData(almanac)
      setNextHoliday(holiday)
    } catch (error) {
      console.error('数据加载失败', error)
      Taro.showToast({
        title: '数据加载失败',
        icon: 'none'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDateChange = (direction) => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1)
    } else if (direction === 'next') {
      newDate.setDate(newDate.getDate() + 1)
    } else if (direction === 'today') {
      setCurrentDate(new Date())
      return
    }
    setCurrentDate(newDate)
  }

  const handleViewDetail = () => {
    // 黄历页面是TabBar页面，使用switchTab
    Taro.switchTab({
      url: '/pages/almanac/index'
    })
  }

  const handleDateClick = () => {
    setShowDatePicker(true)
  }

  const handleDatePickerConfirm = (options, values) => {
    const [year, month, day] = values
    const newDate = new Date(year, month - 1, day)
    setCurrentDate(newDate)
    setShowDatePicker(false)
  }

  const handleDatePickerCancel = () => {
    setShowDatePicker(false)
  }

  return (
    <View className="home-page">
      <Header
        date={currentDate}
        onDateChange={handleDateChange}
        onDateClick={handleDateClick}
      />

      {almanacData && (
        <AlmanacCard
          data={almanacData}
          onViewDetail={handleViewDetail}
        />
      )}

      {nextHoliday && (
        <NextHolidayCard data={nextHoliday} />
      )}

      <DatePicker
        visible={showDatePicker}
        title="选择日期"
        type="date"
        defaultValue={currentDate}
        onConfirm={handleDatePickerConfirm}
        onClose={handleDatePickerCancel}
      />
    </View>
  )
}

export default Home
