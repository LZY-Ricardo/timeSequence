# TimeSequence 小程序完善实施指南

> 本文档详细说明每个待办事项的具体执行步骤和代码实现

---

## 📋 目录

- [阶段一：功能验证与测试](#阶段一功能验证与测试)
- [阶段二：用户体验优化](#阶段二用户体验优化)
- [阶段三：功能完善](#阶段三功能完善)
- [阶段四：数据持久化](#阶段四数据持久化)
- [阶段五：上线准备](#阶段五上线准备)

---

## 阶段一：功能验证与测试

### 步骤 1：核心功能验证

#### 1.1 启动项目测试

**执行命令：**
```bash
# 启动微信小程序开发模式
npm run dev:weapp

# 或使用 pnpm
pnpm run dev:weapp
```

**验证清单：**
- [ ] 微信开发者工具能正常打开项目（dist 目录）
- [ ] 5 个 TabBar 页面可以正常切换
- [ ] 控制台无报错信息
- [ ] 页面样式显示正常

#### 1.2 首页功能测试

**测试项目：**
1. **日期切换** - 昨天/明天按钮功能
2. **黄历卡片** - 宜忌胶囊颜色和内容
3. **下个假期** - 倒数天数计算

#### 1.3 月历页面测试

**测试项目：**
1. **日历显示** - 6x7 网格布局
2. **月份切换** - 左右箭头和跨年切换
3. **日期选择** - 选中态和详情面板

#### 1.4 倒数日页面测试

**测试项目：**
1. **筛选功能** - 分类筛选
2. **事件列表** - 卡片显示和左滑删除
3. **添加编辑** - 表单验证和提交

---

### 步骤 2：API 测试

#### 2.1 黄历 API 测试

**验证点：**
- [ ] API 请求成功（控制台查看日志）
- [x] 数据格式正确转换
- [x] 宜忌信息显示完整

#### 2.2 缓存机制测试

**验证点：**
- [x] 首次请求调用 API
- [x] 24 小时内使用缓存
- [x] 缓存数据格式正确

#### 2.3 离线降级测试

**验证点：**
- [x] 网络错误时使用 Mock 数据
- [x] 页面仍能正常显示

---

### 步骤 3：微信小程序配置

#### 3.1 配置服务器域名白名单

**操作步骤：**
1. 登录微信公众平台
2. 进入：开发 → 开发管理 → 开发设置
3. 在"request合法域名"中添加：`https://apis.tianapi.com`
4. 保存配置

#### 3.2 开发环境配置

确认 `project.config.json` 中 `urlCheck` 设置为 `false`（开发环境）——已配置

---

## 阶段二：用户体验优化

### 步骤 4：加载状态优化（已完成）

#### 4.1 创建 Loading 组件（已完成）

**新建：`src/components/Loading/index.jsx`**

```jsx
import { View } from '@tarojs/components'
import './index.scss'

const Loading = ({ text = '加载中...' }) => {
  return (
    <View className="loading-container">
      <View className="loading-spinner"></View>
      <View className="loading-text">{text}</View>
    </View>
  )
}

export default Loading
```

**新建：`src/components/Loading/index.scss`**

```scss
@import '@/styles/variables.scss';

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx;
  
  .loading-spinner {
    width: 80rpx;
    height: 80rpx;
    border: 4rpx solid $primary-light;
    border-top-color: $primary;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .loading-text {
    margin-top: 24rpx;
    font-size: $font-size-sm;
    color: $text-sub;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

#### 4.2 创建骨架屏组件（已完成）

**新建：`src/components/Skeleton/index.jsx`**

```jsx
import { View } from '@tarojs/components'
import './index.scss'

const Skeleton = ({ type = 'card', count = 1 }) => {
  const renderCard = () => (
    <View className="skeleton-card">
      <View className="skeleton-header">
        <View className="skeleton-line short"></View>
        <View className="skeleton-circle"></View>
      </View>
      <View className="skeleton-body">
        <View className="skeleton-line"></View>
        <View className="skeleton-line"></View>
        <View className="skeleton-line medium"></View>
      </View>
    </View>
  )

  return (
    <View className="skeleton-container">
      {Array.from({ length: count }).map((_, index) => (
        <View key={index}>{renderCard()}</View>
      ))}
    </View>
  )
}

export default Skeleton
```

#### 4.3 在首页集成加载状态（已完成）

**修改：`src/pages/home/index.jsx`**

在组件中添加 loading 状态和骨架屏：

```jsx
import Skeleton from '@/components/Skeleton'

const Home = () => {
  const [loading, setLoading] = useState(true)
  
  const loadData = async () => {
    setLoading(true)
    try {
      // ... 加载数据
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <View className="home-page">
      <Header date={currentDate} onDateChange={handleDateChange} />
      
      {loading ? (
        <Skeleton count={2} />
      ) : (
        <>
          {/* 正常内容 */}
        </>
      )}
    </View>
  )
}
```

---

### 步骤 5：交互体验增强（已完成）

#### 5.1 实现下拉刷新（已完成）

**修改：`src/pages/home/index.config.js`**

```javascript
export default definePageConfig({
  navigationBarTitleText: '知时日历',
  enablePullDownRefresh: true,
  backgroundColor: '#F5F7FA'
})
```

**修改：`src/pages/home/index.jsx`**

```jsx
import Taro, { usePullDownRefresh } from '@tarojs/taro'

const Home = () => {
  usePullDownRefresh(async () => {
    // 清除缓存
    await Taro.removeStorage({ key: `almanac_${formatDate(currentDate)}` })
    
    // 重新加载
    await loadData()
    
    Taro.stopPullDownRefresh()
    Taro.showToast({ title: '刷新成功', icon: 'success' })
  })
  
  // ... 其余代码
}
```

#### 5.2 优化按钮点击反馈（已完成）

**修改：`src/styles/common.scss`**

```scss
.button, .btn {
  transition: all 0.2s ease;
  
  &:active {
    transform: scale(0.95);
    opacity: 0.8;
  }
}
```

---

## 阶段三：功能完善

### 步骤 7：倒数日功能增强（已完成）

#### 7.1 实现置顶功能（已完成）

**修改：`src/services/countdown.js`**

添加置顶排序逻辑：

```javascript
export const getCountdownEvents = async (filterType = 'all') => {
  try {
    const res = await Taro.getStorage({ key: 'countdown_events' })
    let events = res.data || []
    
    // 筛选
    if (filterType !== 'all') {
      events = events.filter(event => event.type === filterType)
    }
    
    // 排序：置顶的在前面
    events.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return new Date(a.targetDate) - new Date(b.targetDate)
    })
    
    return events
  } catch (error) {
    return []
  }
}

export const togglePinEvent = async (eventId) => {
  const res = await Taro.getStorage({ key: 'countdown_events' })
  const events = res.data || []
  
  const eventIndex = events.findIndex(e => e.id === eventId)
  if (eventIndex !== -1) {
    events[eventIndex].isPinned = !events[eventIndex].isPinned
    await Taro.setStorage({ key: 'countdown_events', data: events })
  }
  
  return events[eventIndex]
}
```

#### 7.2 实现循环周期计算（已完成）

**修改：`src/utils/date.js`**

添加循环日期计算函数：

```javascript
export const getNextLoopDate = (targetDate, loopType) => {
  const today = new Date()
  const target = new Date(targetDate)
  
  if (loopType === 'none') {
    return target
  }
  
  let nextDate = new Date(target)
  
  switch (loopType) {
    case 'yearly':
      nextDate.setFullYear(today.getFullYear())
      if (nextDate < today) {
        nextDate.setFullYear(today.getFullYear() + 1)
      }
      break
      
    case 'halfYear':
      while (nextDate < today) {
        nextDate.setMonth(nextDate.getMonth() + 6)
      }
      break
      
    case 'quarterly':
      while (nextDate < today) {
        nextDate.setMonth(nextDate.getMonth() + 3)
      }
      break
      
    case 'monthly':
      nextDate.setMonth(today.getMonth())
      nextDate.setFullYear(today.getFullYear())
      if (nextDate < today) {
        nextDate.setMonth(nextDate.getMonth() + 1)
      }
      break
  }
  
  return nextDate
}
```

**修改：`src/services/countdown.js`**

在获取事件列表时计算循环日期：

```javascript
import { getDaysDiff, getNextLoopDate } from '@/utils/date'

export const getCountdownEvents = async (filterType = 'all') => {
  const res = await Taro.getStorage({ key: 'countdown_events' })
  let events = res.data || []
  
  // 计算倒数天数（考虑循环）
  events = events.map(event => {
    const nextDate = getNextLoopDate(event.targetDate, event.loop)
    const daysLeft = getDaysDiff(new Date(), nextDate)
    
    return {
      ...event,
      nextDate: nextDate,
      daysLeft: daysLeft,
      isPast: nextDate < new Date()
    }
  })
  
  // ... 筛选和排序
  
  return events
}
```

#### 7.3 农历日期支持（已完成）

**修改：`src/packageCountdown/add/index.jsx`**

添加公历/农历切换：

```jsx
import { solarToLunar, lunarToSolar } from '@/utils/lunar'

const CountdownAdd = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetDate: formatDate(new Date()),
    type: 'anniversary',
    loop: 'yearly',
    isPinned: false,
    isLunar: false
  })
  
  const [displayDate, setDisplayDate] = useState('')
  
  useEffect(() => {
    if (formData.isLunar) {
      const lunar = solarToLunar(formData.targetDate)
      setDisplayDate(`农历:${lunar.lunarYear}年${lunar.lunarMonth}月${lunar.lunarDay}日`)
    } else {
      setDisplayDate(`公历:${formData.targetDate}`)
    }
  }, [formData.targetDate, formData.isLunar])
  
  const handleDateTypeSwitch = () => {
    setFormData({
      ...formData,
      isLunar: !formData.isLunar
    })
  }
  
  return (
    <View className="countdown-add-page">
      <View className="date-type-switch">
        <View 
          className={`switch-item ${!formData.isLunar ? 'active' : ''}`}
          onClick={handleDateTypeSwitch}
        >
          公历
        </View>
        <View 
          className={`switch-item ${formData.isLunar ? 'active' : ''}`}
          onClick={handleDateTypeSwitch}
        >
          农历
        </View>
      </View>
      
      <View className="form-item">
        <Picker
          mode="date"
          value={formData.targetDate}
          onChange={(e) => setFormData({...formData, targetDate: e.detail.value})}
        >
          <View className="picker-value">{displayDate}</View>
        </Picker>
      </View>
    </View>
  )
}
```

---

### 步骤 8：日历功能增强（已完成）

#### 8.1 在日历中标记倒数日事件

**修改：`src/services/calendar.js`**

```javascript
import { getMonthCalendar } from '@/utils/date'
import { getCountdownEvents } from './countdown'
import { formatDate } from '@/utils/date'

export const getCalendarWithEvents = async (year, month) => {
  const calendar = getMonthCalendar(year, month)
  const events = await getCountdownEvents('all')
  
  // 创建日期到事件的映射
  const dateEventsMap = {}
  events.forEach(event => {
    const dateKey = formatDate(event.nextDate)
    if (!dateEventsMap[dateKey]) {
      dateEventsMap[dateKey] = []
    }
    dateEventsMap[dateKey].push(event)
  })
  
  // 将事件标记添加到日历数据
  const calendarWithEvents = calendar.map(week => {
    return week.map(day => {
      const dateKey = formatDate(day.date)
      const dayEvents = dateEventsMap[dateKey] || []
      
      return {
        ...day,
        hasEvents: dayEvents.length > 0,
        events: dayEvents,
        eventCount: dayEvents.length
      }
    })
  })
  
  return calendarWithEvents
}
```

**修改：`src/components/CalendarView/index.jsx`**

```jsx
import { getCalendarWithEvents } from '@/services/calendar'

const CalendarView = ({ onDateSelect }) => {
  const [calendarData, setCalendarData] = useState([])
  
  useEffect(() => {
    loadCalendarData()
  }, [currentYear, currentMonth])
  
  const loadCalendarData = async () => {
    const data = await getCalendarWithEvents(currentYear, currentMonth)
    setCalendarData(data)
  }
  
  return (
    <View className="calendar-grid">
      {calendarData.map((week, weekIndex) => (
        <View key={weekIndex} className="calendar-week">
          {week.map((dateInfo, dayIndex) => (
            <View key={dayIndex} className="calendar-day">
              <View className="day-number">{dateInfo.day}</View>
              
              {/* 事件标记 */}
              {dateInfo.hasEvents && (
                <View className="event-dots">
                  {dateInfo.events.slice(0, 3).map((event, idx) => (
                    <View key={idx} className={`event-dot ${event.type}`} />
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}
```

**修改：`src/components/CalendarView/index.scss`**

```scss
.calendar-day {
  .event-dots {
    display: flex;
    justify-content: center;
    gap: 4rpx;
    margin-top: 4rpx;
    
    .event-dot {
      width: 8rpx;
      height: 8rpx;
      border-radius: 50%;
      
      &.anniversary { background: #ff7043; }
      &.birthday { background: #ff4081; }
      &.countdown { background: #00897b; }
      &.other { background: #9e9e9e; }
    }
  }
}
```

#### 8.2 节假日标记

**修改：`src/services/holiday.js`**

```javascript
export const getDateHolidayType = async (date, year) => {
  const holidays = await getHolidaysForMonth(year, date.getMonth())
  const dateStr = formatDate(date)
  
  for (const holiday of holidays) {
    if (holiday.vacation && holiday.vacation.includes(dateStr)) {
      return { type: 'rest', tag: '休' }
    }
    
    if (holiday.workDay && holiday.workDay.includes(dateStr)) {
      return { type: 'work', tag: '班' }
    }
  }
  
  return null
}
```

在日历数据中集成节假日标记（修改 `getCalendarWithEvents` 函数）

---

## 阶段四：数据持久化

### 步骤 10：本地存储完善

#### 10.1 倒数日数据存储

**已实现**：使用 `Taro.setStorage` 和 `Taro.getStorage`

**优化建议**：
- 添加数据版本号
- 实现数据迁移机制
- 定期清理过期数据

#### 10.2 用户偏好设置

**新建：`src/services/settings.js`**

```javascript
import Taro from '@tarojs/taro'

const SETTINGS_KEY = 'user_settings'

// 默认设置
const DEFAULT_SETTINGS = {
  theme: 'light',
  fontSize: 'medium',
  showLunar: true,
  enableNotification: false,
  dateFormat: 'YYYY-MM-DD'
}

export const getSettings = async () => {
  try {
    const res = await Taro.getStorage({ key: SETTINGS_KEY })
    return { ...DEFAULT_SETTINGS, ...res.data }
  } catch (error) {
    return DEFAULT_SETTINGS
  }
}

export const updateSettings = async (newSettings) => {
  const current = await getSettings()
  const updated = { ...current, ...newSettings }
  
  await Taro.setStorage({
    key: SETTINGS_KEY,
    data: updated
  })
  
  return updated
}
```

#### 10.3 数据导入/导出

**新建：`src/utils/backup.js`**

```javascript
import Taro from '@tarojs/taro'

export const exportData = async () => {
  try {
    // 获取所有倒数日数据
    const events = await Taro.getStorage({ key: 'countdown_events' })
    
    const backup = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      events: events.data || []
    }
    
    // 转换为JSON字符串
    const jsonStr = JSON.stringify(backup, null, 2)
    
    // 保存到文件或分享
    return jsonStr
  } catch (error) {
    console.error('导出数据失败:', error)
    throw error
  }
}

export const importData = async (jsonStr) => {
  try {
    const backup = JSON.parse(jsonStr)
    
    if (!backup.events) {
      throw new Error('数据格式错误')
    }
    
    // 保存数据
    await Taro.setStorage({
      key: 'countdown_events',
      data: backup.events
    })
    
    return backup.events.length
  } catch (error) {
    console.error('导入数据失败:', error)
    throw error
  }
}
```

---

## 阶段五：上线准备

### 步骤 11：代码质量检查

#### 11.1 运行 ESLint

```bash
# 检查代码规范
npm run lint

# 自动修复
npm run lint:fix
```

#### 11.2 清理调试代码

**批量查找并删除 console.log：**

在项目中搜索 `console.log` 并根据需要删除或改为条件输出

#### 11.3 检查 TODO 标记

全局搜索 `TODO`、`FIXME`、`HACK` 等标记并处理

---

### 步骤 12：兼容性测试

#### 12.1 测试不同机型

**测试设备清单：**
- iPhone（不同尺寸）
- Android（不同品牌）
- 不同微信版本

**重点测试项：**
- 安全区域适配
- 刘海屏/挖孔屏
- 不同屏幕分辨率

#### 12.2 横竖屏测试

确保页面在横屏模式下显示正常

---

### 步骤 13：性能测试

#### 13.1 首屏加载时间

**目标：** < 2 秒

**优化方向：**
- 减少首屏数据请求
- 使用缓存
- 骨架屏提升感知速度

#### 13.2 页面切换流畅度

**目标：** 60 FPS

**优化方向：**
- 减少不必要的重渲染
- 使用 React.memo
- 避免复杂计算

#### 13.3 使用性能分析工具

微信开发者工具 → 调试器 → Performance

---

### 步骤 14：安全检查

#### 14.1 API Key 保护

- [ ] 确认 API Key 不在前端明文暴露
- [ ] 考虑使用云函数代理 API 请求

#### 14.2 用户输入验证

- [ ] 所有表单输入都有验证
- [ ] 防止 XSS 攻击
- [ ] 限制输入长度

---

### 步骤 15：发布准备

#### 15.1 准备小程序图标

**尺寸要求：** 1024x1024 像素

#### 15.2 编写隐私政策

**必须包含：**
- 收集的用户信息
- 信息使用方式
- 第三方服务说明

#### 15.3 准备小程序介绍

- 功能简介
- 特色亮点
- 使用场景

#### 15.4 截图准备

至少 3 张功能截图，展示主要功能

#### 15.5 版本号配置

**修改：`src/app.config.js`**

```javascript
export default {
  // ...
  version: '1.0.0'
}
```

#### 15.6 提交审核

1. 构建生产版本：`npm run build:weapp`
2. 微信开发者工具上传代码
3. 在微信公众平台提交审核
4. 等待审核结果（通常 1-7 天）

---

## 📝 注意事项

### 开发环境 vs 生产环境

**开发环境：**
- `urlCheck: false`
- 允许使用 Mock 数据
- 保留 console.log

**生产环境：**
- `urlCheck: true`
- 必须配置合法域名
- 删除所有调试代码
- 启用代码压缩

### 常见问题解决

#### 问题 1：API 请求失败

**解决方案：**
1. 检查域名白名单配置
2. 检查 API Key 是否正确
3. 查看控制台错误日志
4. 验证网络连接

#### 问题 2：页面白屏

**解决方案：**
1. 检查控制台报错
2. 验证数据格式
3. 检查组件导入路径
4. 确认样式文件引入

#### 问题 3：缓存不生效

**解决方案：**
1. 检查缓存 key 是否正确
2. 验证过期时间设置
3. 手动清除缓存测试

---

## 🎯 完成标准

每个阶段完成后，请确认：

- [ ] 所有功能正常运行
- [ ] 无控制台报错
- [ ] 通过测试用例
- [ ] 代码已提交到版本库
- [ ] 文档已更新

---

## 📞 技术支持

遇到问题时的查找顺序：
1. 查看本文档相关章节
2. 检查控制台错误日志
3. 查阅官方文档（Taro、微信小程序）
4. 搜索类似问题的解决方案

---

**文档版本：** v1.0  
**最后更新：** 2024-12-03  
**适用项目：** TimeSequence 微信小程序
