import { View } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import CalendarView from '@/components/CalendarView'
import DetailPanel from '@/components/DetailPanel'
import { getAlmanacData } from '@/services/almanac'
import { formatDate } from '@/utils/date'
import './index.scss'

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [almanacData, setAlmanacData] = useState(null)
  const [showPanel, setShowPanel] = useState(false)

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
