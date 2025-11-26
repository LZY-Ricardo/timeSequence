import {
  getCountdownEvents as getMockEvents,
  saveCountdownEvent as saveMockEvent,
  deleteCountdownEvent as deleteMockEvent,
  getCountdownEventById as getMockEventById
} from '@/mock/countdownData'
import Taro from '@tarojs/taro'

const STORAGE_KEY = 'countdown_events'

/**
 * 获取倒数日事件
 */
export const getCountdownEvents = async (filterType) => {
  // 优先从本地存储获取
  try {
    const stored = Taro.getStorageSync(STORAGE_KEY)
    if (stored) {
      // TODO: Implement filtering and calculation logic for stored data if needed
      // For now, we rely on mock data or we could merge/replace
      // To keep it simple for this phase, let's stick to the mock implementation pattern
      // but in a real app, we would parse and process 'stored' here.
      // For this demo, let's just return the mock data which simulates the backend/storage
      return getMockEvents(filterType)
    }
  } catch (error) {
    console.error('读取本地存储失败', error)
  }

  // 使用Mock数据
  return getMockEvents(filterType)
}

/**
 * 获取单个事件
 */
export const getCountdownEventById = async (id) => {
  return getMockEventById(id)
}

/**
 * 保存倒数日事件
 */
export const saveCountdownEvent = async (event) => {
  const result = await saveMockEvent(event)

  // 保存到本地存储 (Simulated sync)
  try {
    const events = await getCountdownEvents('all')
    Taro.setStorageSync(STORAGE_KEY, JSON.stringify(events))
  } catch (error) {
    console.error('保存到本地存储失败', error)
  }

  return result
}

/**
 * 删除倒数日事件
 */
export const deleteCountdownEvent = async (id) => {
  await deleteMockEvent(id)

  // 更新本地存储
  try {
    const events = await getCountdownEvents('all')
    Taro.setStorageSync(STORAGE_KEY, JSON.stringify(events))
  } catch (error) {
    console.error('更新本地存储失败', error)
  }
}
