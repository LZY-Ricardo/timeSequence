import { View } from '@tarojs/components'
import { useState } from 'react'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import CalendarView from '@/components/CalendarView'
import DetailPanel from '@/components/DetailPanel'
import { getAlmanacData } from '@/services/almanac'
import { formatDate } from '@/utils/date'
import './index.scss'

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [almanacData, setAlmanacData] = useState(null)
  const [showPanel, setShowPanel] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  // 下拉刷新
  usePullDownRefresh(async () => {
    console.log('月历页面下拉刷新')

    try {
      // 清除缓存
      if (selectedDate) {
        const dateStr = formatDate(selectedDate)
        await Taro.removeStorage({ key: `almanac_${dateStr}` }).catch(() => {})
      }
    } catch (error) {
      console.error('清除缓存失败:', error)
    }

    // 刷新日历视图
    setRefreshKey(prev => prev + 1)

    Taro.stopPullDownRefresh()
    Taro.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 1500
    })
  })

  const handleDateSelect = async (dateInfo) => {
    // Toggle logic: if clicking the same date, deselect it
    if (selectedDate && dateInfo.date.toDateString() === selectedDate.toDateString()) {
      setSelectedDate(null)
      setShowPanel(false)
      return
    }

    setSelectedDate(dateInfo.date)
    const dateStr = formatDate(dateInfo.date)
    const data = await getAlmanacData(dateStr)
    setAlmanacData(data)
    setShowPanel(true)
  }

  const handleViewFullAlmanac = () => {
    const dateStr = formatDate(selectedDate)
    Taro.switchTab({
      url: `/pages/almanac/index`
    })
    Taro.setStorageSync('selectedAlmanacDate', dateStr)
  }

  return (
    <View className="calendar-page">
      <CalendarView
        key={refreshKey}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
      />

      {showPanel && almanacData && (
        <DetailPanel
          date={selectedDate}
          data={almanacData}
          onViewFull={handleViewFullAlmanac}
        />
      )}
    </View>
  )
}

export default Calendar
