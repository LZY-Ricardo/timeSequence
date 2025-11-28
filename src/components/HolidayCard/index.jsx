import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

const HolidayCard = ({ data, showTimeline }) => {
  const [expanded, setExpanded] = useState(false)

  if (!data) return null

  const handleToggleExpand = () => {
    setExpanded(!expanded)
  }

  return (
    <View className={`holiday-card-wrapper ${showTimeline ? 'with-timeline' : ''}`}>
      {showTimeline && (
        <View className="timeline">
          <View className="timeline-dot" />
          <View className="timeline-line" />
        </View>
      )}
      <View className={`holiday-card ${data.isPassed ? 'passed' : ''}`} onClick={handleToggleExpand}>
        <View className="card-main">
          <View className="holiday-info">
            <Text className="holiday-name">{data.name}</Text>
            <Text className="date-range">{data.dateRange}</Text>
          </View>
          <View className="countdown-badge">
            <Text className="countdown-value">{data.isPassed ? '已过' : data.countdown}</Text>
            {!data.isPassed && <Text className="countdown-label">天</Text>}
          </View>
        </View>
        {expanded && data.note && (
          <View className="card-detail">
            <Text className="note-icon">i</Text>
            <Text className="note-text">{data.note}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default HolidayCard
