import { View, Text, Button } from '@tarojs/components'
import { useState, useEffect } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import FilterTabs from '@/components/FilterTabs'
import EventCard from '@/components/EventCard'
import { getCountdownEvents, deleteCountdownEvent } from '@/services/countdown'
import './index.scss'

const Countdown = () => {
  const [filterType, setFilterType] = useState('all')
  const [events, setEvents] = useState([])

  useDidShow(() => {
    loadEvents()
  })

  useEffect(() => {
    loadEvents()
  }, [filterType])

  const loadEvents = async () => {
    const data = await getCountdownEvents(filterType)
    setEvents(data)
  }

  const handleAdd = () => {
    Taro.navigateTo({
      url: '/packageCountdown/add/index'
    })
  }

  const handleEdit = (event) => {
    Taro.navigateTo({
      url: `/packageCountdown/add/index?id=${event.id}`
    })
  }

  const handleDelete = (event) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这个日程吗？',
      success: async (res) => {
        if (res.confirm) {
          await deleteCountdownEvent(event.id)
          loadEvents()
          Taro.showToast({ title: '删除成功', icon: 'success' })
        }
      }
    })
  }

  return (
    <View className="countdown-page">
      <FilterTabs
        current={filterType}
        onChange={setFilterType}
      />

      {events.length === 0 ? (
        <View className="empty-state">
          <View className="empty-icon">📅</View>
          <Text className="empty-text">还没有日程哦，快来添加吧~</Text>
          <Button className="add-btn-bottom" onClick={handleAdd}>
            添加
          </Button>
        </View>
      ) : (
        <View className="event-list">
          {events.map(event => (
            <EventCard
              key={event.id}
              data={event}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </View>
      )}

      <View className="fab-button" onClick={handleAdd}>
        <Text className="icon">+</Text>
      </View>
    </View>
  )
}

export default Countdown
