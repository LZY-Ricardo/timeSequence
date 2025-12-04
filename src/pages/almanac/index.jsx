import { View, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'
import Taro, { useDidShow, usePullDownRefresh } from '@tarojs/taro'
import { formatDate, getWeekDay } from '@/utils/date'
import { getAlmanacDetail } from '@/services/almanac'
import './index.scss'

const Almanac = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [almanacData, setAlmanacData] = useState(null)

  useEffect(() => {
    loadData(currentDate)
  }, [currentDate])

  useDidShow(() => {
    // 检查是否有从日历页传来的日期
    const selectedDate = Taro.getStorageSync('selectedAlmanacDate')
    if (selectedDate) {
      setCurrentDate(new Date(selectedDate))
      Taro.removeStorageSync('selectedAlmanacDate') // 用完后清除
    }
    // 如果没有从日历页传来的日期，则不执行任何操作
    // 以保持用户先前浏览的日期状态，避免每次进入都重置为今天
  })

  // 下拉刷新
  usePullDownRefresh(async () => {
    console.log('黄历页面下拉刷新')

    try {
      // 清除当前日期的缓存
      const dateStr = formatDate(currentDate)
      await Taro.removeStorage({ key: `almanac_${dateStr}` }).catch(() => {})
    } catch (error) {
      console.error('清除缓存失败:', error)
    }

    // 重新加载数据
    await loadData(currentDate)

    Taro.stopPullDownRefresh()
    Taro.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 1500
    })
  })

  const loadData = async (date) => {
    const data = await getAlmanacDetail(formatDate(date))
    setAlmanacData(data)
  }

  const handleDateSwitch = (type) => {
    const newDate = new Date(currentDate)
    if (type === 'prev') {
      newDate.setDate(newDate.getDate() - 1)
    } else if (type === 'next') {
      newDate.setDate(newDate.getDate() + 1)
    } else {
      setCurrentDate(new Date())
      return
    }
    setCurrentDate(newDate)
  }

  const getRatingInfo = (score) => {
    const s = score || 50
    if (s >= 75) {
      return { text: '吉', className: 'rating-good' }
    }
    if (s <= 35) {
      return { text: '凶', className: 'rating-bad' }
    }
    return { text: '平', className: 'rating-neutral' }
  }

  if (!almanacData) {
    return <View className="almanac-page loading"><Text>加载中...</Text></View>
  }

  const ratingInfo = getRatingInfo(almanacData.score)

  return (
    <View className="almanac-page">
      {/* 日期切换区域 */}
      <View className="date-switch-section">
        <View className="date-display-big">
          <Text className="year-month">
            {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
          </Text>
          <Text className="weekday">{getWeekDay(currentDate)}</Text>
          <Text className="day-number">{currentDate.getDate()}</Text>
          <Text className="lunar-date">
            🌙 {almanacData.lunar}
          </Text>
        </View>
        <View className="switch-buttons">
          <View className="switch-btn" onClick={() => handleDateSwitch('prev')}>
            ← 昨天
          </View>
          <View className="switch-btn current" onClick={() => handleDateSwitch('today')}>
            • 今日 •
          </View>
          <View className="switch-btn" onClick={() => handleDateSwitch('next')}>
            明天 →
          </View>
        </View>
      </View>

      {/* 干支信息 */}
      <View className="pillars-section">
        <Text className="label">阴历 {almanacData.lunarYear} {almanacData.lunar}</Text>
        <View className="pillars-row">
          <View className="pillar-item">
            <Text className="pillar-value">{almanacData.yearPillar}</Text>
            <Text className="pillar-label">年柱</Text>
          </View>
          <View className="pillar-item">
            <Text className="pillar-value">{almanacData.monthPillar}</Text>
            <Text className="pillar-label">月柱</Text>
          </View>
          <View className="pillar-item">
            <Text className="pillar-value">{almanacData.dayPillar}</Text>
            <Text className="pillar-label">日柱</Text>
          </View>
        </View>
      </View>

      {/* 宜忌指数 */}
      <View className="score-section">
        <View className="score-header">
          <Text>今日宜忌指数</Text>
          <Text className={`score-value ${ratingInfo.className}`}>{ratingInfo.text}</Text>
        </View>
        <View className="progress-bar">
          <View
            className="progress-fill"
            style={{ width: `${almanacData.score || 50}%` }}
          />
          <Text className="progress-text">{`${almanacData.score || 50}%`}</Text>
        </View>
      </View>

      {/* 宜忌详情 */}
      <View className="suit-avoid-detail">
        <View className="section suit-section">
          <View className="section-header">
            <View className="dot suit" />
            <Text className="title">宜</Text>
          </View>
          <View className="items-grid">
            {almanacData.yi.map((item, index) => (
              <View key={index} className="item suit">{item}</View>
            ))}
          </View>
        </View>

        <View className="section avoid-section">
          <View className="section-header">
            <View className="dot avoid" />
            <Text className="title">忌</Text>
          </View>
          <View className="items-grid">
            {almanacData.ji.map((item, index) => (
              <View key={index} className="item avoid">{item}</View>
            ))}
          </View>
        </View>
      </View>

      {/* 详细信息表格 */}
      <View className="info-table">
        <View className="table-row">
          <Text className="label">吉神宜趋</Text>
          <Text className="value">{almanacData.jiShen}</Text>
        </View>
        <View className="table-row">
          <Text className="label">凶煞宜忌</Text>
          <Text className="value">{almanacData.xiongSha}</Text>
        </View>
        <View className="table-row">
          <Text className="label">胎神</Text>
          <Text className="value">{almanacData.taiShen}</Text>
        </View>
        <View className="table-row">
          <Text className="label">纳音</Text>
          <Text className="value">{almanacData.naYin}</Text>
        </View>
        <View className="table-row">
          <Text className="label">冲煞</Text>
          <Text className="value">{almanacData.chongSha}</Text>
        </View>

        <View className="table-section-title">
          <View className="divider" />
          <Text>财神方位</Text>
          <View className="divider" />
        </View>

        <View className="direction-grid">
          <View className="direction-item">
            <Text className="dir-label">财神</Text>
            <Text className="dir-value">{almanacData.caiShen}</Text>
          </View>
          <View className="direction-item">
            <Text className="dir-label">喜神</Text>
            <Text className="dir-value">{almanacData.xiShen}</Text>
          </View>
          <View className="direction-item">
            <Text className="dir-label">福神</Text>
            <Text className="dir-value">{almanacData.fuShen}</Text>
          </View>
          <View className="direction-item">
            <Text className="dir-label">阳贵</Text>
            <Text className="dir-value">{almanacData.yangGui}</Text>
          </View>
          <View className="direction-item">
            <Text className="dir-label">阴贵</Text>
            <Text className="dir-value">{almanacData.yinGui}</Text>
          </View>
        </View>
      </View>

      {/* 彭祖百忌 */}
      <View className="warning-footer">
        <Text className="icon">⚠️</Text>
        <Text className="title">彭祖百忌</Text>
        <Text className="content">{almanacData.pengZu}</Text>
      </View>
    </View>
  )
}

export default Almanac
