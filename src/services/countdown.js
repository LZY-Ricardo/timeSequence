import Taro from '@tarojs/taro'

const STORAGE_KEY = 'countdown_events'

// 初始Mock数据
const INITIAL_EVENTS = [
  {
    id: 1,
    title: '恋爱一周年',
    description: '我们在一起的第一天',
    targetDate: '2025-12-20',
    type: 'anniversary',
    loop: 'yearly',
    isPinned: true,
    isLunar: false,
    color: '#FF6B9D'
  },
  {
    id: 2,
    title: '妈妈生日',
    description: '',
    targetDate: '2026-03-15',
    type: 'birthday',
    loop: 'yearly',
    isPinned: false,
    isLunar: true,
    color: '#FF7043'
  }
]

// 随机颜色
const colors = ['#FF6B9D', '#FF7043', '#00897B', '#5C6BC0', '#AB47BC', '#26A69A']
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

/**
 * 获取所有事件（内部使用）
 */
const getAllEvents = () => {
  try {
    const stored = Taro.getStorageSync(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('读取本地存储失败', error)
  }
  return INITIAL_EVENTS
}

/**
 * 保存所有事件（内部使用）
 */
const saveAllEvents = (events) => {
  try {
    Taro.setStorageSync(STORAGE_KEY, JSON.stringify(events))
  } catch (error) {
    console.error('保存到本地存储失败', error)
  }
}

/**
 * 获取倒数日事件
 */
export const getCountdownEvents = async (filterType = 'all') => {
  // 模拟异步
  await new Promise(resolve => setTimeout(resolve, 100))

  let events = getAllEvents()

  if (filterType !== 'all') {
    events = events.filter(event => event.type === filterType)
  }

  // 计算倒数天数
  const today = new Date()
  const eventsWithCountdown = events.map(event => {
    const targetDate = new Date(event.targetDate)
    const diff = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24))
    return {
      ...event,
      daysLeft: diff,
      isPassed: diff < 0
    }
  })

  // 排序：置顶的在前，然后按日期近的在前
  eventsWithCountdown.sort((a, b) => {
    // 确保 boolean 类型
    const aPinned = !!a.isPinned
    const bPinned = !!b.isPinned

    if (aPinned && !bPinned) return -1
    if (!aPinned && bPinned) return 1

    // 绝对值比较，因为可能是负数（已过去）
    // 如果想要已过去的沉底，可以调整逻辑
    // 这里保持原逻辑：按距离今天的天数（绝对值）排序
    return Math.abs(a.daysLeft) - Math.abs(b.daysLeft)
  })

  return eventsWithCountdown
}

/**
 * 获取单个事件
 */
export const getCountdownEventById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 50))
  const events = getAllEvents()
  return events.find(e => e.id == id)
}

/**
 * 保存倒数日事件
 */
export const saveCountdownEvent = async (event) => {
  await new Promise(resolve => setTimeout(resolve, 200))

  const events = getAllEvents()

  if (event.id) {
    // 更新
    const index = events.findIndex(e => e.id == event.id)
    if (index !== -1) {
      // 保留原有颜色等属性，覆盖新属性
      events[index] = { ...events[index], ...event }
    }
  } else {
    // 新增
    const newEvent = {
      ...event,
      id: Date.now(),
      color: getRandomColor()
    }
    events.push(newEvent)
  }

  saveAllEvents(events)
  return event
}

/**
 * 删除倒数日事件
 */
export const deleteCountdownEvent = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100))

  let events = getAllEvents()
  events = events.filter(e => e.id != id)
  saveAllEvents(events)
}
