import { View, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { Picker } from '@nutui/nutui-react-taro'
import NextHolidayCard from '@/components/NextHolidayCard'
import HolidayCard from '@/components/HolidayCard'
import { getHolidaysByYear } from '@/services/holiday'
import './index.scss'

const Holiday = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [nextHoliday, setNextHoliday] = useState(null)
  const [holidays, setHolidays] = useState([])
  const [showPicker, setShowPicker] = useState(false)

  const yearRange = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i)
  const pickerColumns = yearRange.map(year => ({ text: `${year}年`, value: year }))

  useEffect(() => {
    loadHolidays()
  }, [currentYear])

  // 下拉刷新
  usePullDownRefresh(async () => {
    console.log('节假日页面下拉刷新')

    try {
      // 清除缓存
      await Taro.removeStorage({ key: `holiday_${currentYear}` }).catch(() => {})
      await Taro.removeStorage({ key: 'holiday_next' }).catch(() => {})
    } catch (error) {
      console.error('清除缓存失败:', error)
    }

    // 重新加载数据
    await loadHolidays()

    Taro.stopPullDownRefresh()
    Taro.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 1500
    })
  })

  const loadHolidays = async () => {
    const data = await getHolidaysByYear(currentYear)
    setNextHoliday(data.next)
    setHolidays(data.list)
  }

  const handleYearChange = (options, values) => {
    setCurrentYear(values[0])
    setShowPicker(false)
  }

  return (
    <View className="holiday-page">
      <View className="year-selector" onClick={() => setShowPicker(true)}>
        <View className="year-display">
          <Text>{currentYear}年 节假日安排</Text>
          <Text className="icon">▼</Text>
        </View>
      </View>

      {nextHoliday && <NextHolidayCard data={nextHoliday} />}

      <View className="timeline-section">
        <View className="section-header">
          <View className="icon">🎯</View>
          <Text className="title">未来假期展望</Text>
        </View>

        <View className="timeline-list">
          {holidays.map((holiday, index) => (
            <HolidayCard
              key={index}
              data={holiday}
              showTimeline={true}
            />
          ))}
        </View>
      </View>

      <View className="footer-note">
        <Text>数据来源：国务院办公厅。注：以上放假安排仅供参考，请以正式发布的通知为准。</Text>
      </View>

      <Picker
        visible={showPicker}
        options={pickerColumns}
        defaultValue={[currentYear]}
        onConfirm={handleYearChange}
        onClose={() => setShowPicker(false)}
      />
    </View>
  )
}

export default Holiday
