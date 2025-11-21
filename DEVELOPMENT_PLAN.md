# TimeSequence 微信小程序 - 分阶段开发实施方案

## 📋 项目概览

**项目名称**: TimeSequence  
**技术栈**: Taro 3.x + React + JavaScript + SCSS  
**目标平台**: 微信小程序  
**测试设备**: Xiaomi 15 (HyperOS 2.0, 6.36英寸)  
**开发周期**: 预计 4-6 周

---

## 🎯 阶段一：项目初始化与环境搭建（第 1 周）

### 1.1 项目脚手架搭建

**任务清单**:
- [ ] 使用 Taro CLI 初始化项目
- [ ] 配置项目基础结构
- [ ] 安装核心依赖包

**执行命令**:
```bash
# 安装 Taro CLI
npm install -g @tarojs/cli

# 创建项目（选择 React + JavaScript）
taro init timeSequence

# 进入项目目录
cd timeSequence

# 安装组件库（二选一）
npm install @nutui/nutui-react-taro
# 或
npm install tdesign-react
```

**项目结构设计**:
```
timeSequence/
├── src/
│   ├── app.js                    # 应用入口
│   ├── app.scss                  # 全局样式
│   ├── app.config.js             # 全局配置
│   ├── pages/                    # 页面目录
│   │   ├── home/                 # 首页
│   │   ├── calendar/             # 月历页
│   │   ├── countdown/            # 倒数日页
│   │   ├── holiday/              # 节假日页
│   │   └── almanac/              # 黄历详情页
│   ├── components/               # 公共组件
│   │   ├── Header/               # 头部组件
│   │   ├── AlmanacCard/          # 黄历卡片
│   │   ├── CalendarView/         # 日历视图
│   │   ├── EventCard/            # 事件卡片
│   │   └── HolidayCard/          # 节假日卡片
│   ├── services/                 # 服务层
│   │   ├── almanac.js            # 黄历相关API
│   │   ├── calendar.js           # 日历相关API
│   │   ├── countdown.js          # 倒数日相关API
│   │   └── holiday.js            # 节假日相关API
│   ├── utils/                    # 工具函数
│   │   ├── date.js               # 日期处理
│   │   ├── lunar.js              # 农历转换
│   │   └── storage.js            # 本地存储
│   ├── mock/                     # Mock数据
│   │   ├── almanacData.js        # 黄历mock数据
│   │   ├── holidayData.js        # 节假日mock数据
│   │   └── countdownData.js      # 倒数日mock数据
│   ├── styles/                   # 样式文件
│   │   ├── variables.scss        # CSS变量
│   │   ├── mixins.scss           # SCSS混入
│   │   └── common.scss           # 公共样式
│   └── assets/                   # 静态资源
│       ├── icons/                # 图标
│       └── images/               # 图片
├── config/                       # 配置文件
├── package.json
└── project.config.json
```

### 1.2 全局样式与设计系统配置

**文件**: `src/styles/variables.scss`

```scss
/* ==================== 色彩系统 ==================== */
// 主色调
$primary: #00897B;              // 松石绿
$primary-light: #E0F2F1;        // 浅青色
$primary-dark: #00695C;         // 深绿

// 强调色
$accent: #FF7043;               // 暖橙色
$accent-light: #FBE9E7;         // 浅橙色

// 文字颜色
$text-main: #263238;            // 主要文字
$text-sub: #546E7A;             // 次要文字
$text-disabled: #B0BEC5;        // 禁用文字

// 背景颜色
$bg-body: #F5F7FA;              // 全局背景
$bg-card: #FFFFFF;              // 卡片背景
$bg-mask: rgba(0, 0, 0, 0.5);   // 遮罩

// 渐变色
$gradient-primary: linear-gradient(180deg, #00897B 0%, #00695C 100%);
$gradient-holiday: linear-gradient(135deg, #FF8A65 0%, #FF7043 100%);

/* ==================== 布局规范 ==================== */
$border-radius-base: 24rpx;     // 基础圆角
$border-radius-small: 16rpx;    // 小圆角
$border-radius-large: 32rpx;    // 大圆角

$padding-page: 32rpx;           // 页面内边距
$padding-card: 32rpx;           // 卡片内边距
$margin-card: 24rpx;            // 卡片外边距

/* ==================== 字体规范 ==================== */
$font-size-xs: 20rpx;           // 极小字体
$font-size-sm: 24rpx;           // 小字体
$font-size-base: 28rpx;         // 基础字体
$font-size-lg: 32rpx;           // 大字体
$font-size-xl: 36rpx;           // 超大字体
$font-size-xxl: 48rpx;          // 特大字体
$font-size-huge: 96rpx;         // 巨大字体（日期显示）

$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-bold: 600;

/* ==================== 阴影 ==================== */
$shadow-card: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
$shadow-float: 0 8rpx 24rpx rgba(0, 0, 0, 0.12);

/* ==================== 过渡动画 ==================== */
$transition-base: all 0.3s ease;
$transition-fast: all 0.2s ease;

/* ==================== 安全区域 ==================== */
$safe-area-top: env(safe-area-inset-top);
$safe-area-bottom: env(safe-area-inset-bottom);
```

### 1.3 TabBar 配置

**文件**: `src/app.config.js`

```javascript
export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/calendar/index',
    'pages/countdown/index',
    'pages/holiday/index',
    'pages/almanac/index'
  ],
  subPackages: [
    {
      root: 'pages/countdown',
      pages: [
        'add/index'
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#00897B',
    navigationBarTitleText: '知时日历',
    navigationBarTextStyle: 'white',
    backgroundColor: '#F5F7FA'
  },
  tabBar: {
    color: '#546E7A',
    selectedColor: '#00897B',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home-active.png'
      },
      {
        pagePath: 'pages/calendar/index',
        text: '月历',
        iconPath: 'assets/icons/calendar.png',
        selectedIconPath: 'assets/icons/calendar-active.png'
      },
      {
        pagePath: 'pages/countdown/index',
        text: '日程',
        iconPath: 'assets/icons/countdown.png',
        selectedIconPath: 'assets/icons/countdown-active.png'
      },
      {
        pagePath: 'pages/holiday/index',
        text: '节假日',
        iconPath: 'assets/icons/holiday.png',
        selectedIconPath: 'assets/icons/holiday-active.png'
      },
      {
        pagePath: 'pages/almanac/index',
        text: '黄历',
        iconPath: 'assets/icons/almanac.png',
        selectedIconPath: 'assets/icons/almanac-active.png'
      }
    ]
  }
})
```

### 1.4 工具函数准备

**文件**: `src/utils/date.js`

```javascript
/**
 * 日期格式化工具
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
}

/**
 * 计算两个日期之间的天数差
 */
export const getDaysDiff = (date1, date2) => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diff = Math.abs(d2 - d1)
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

/**
 * 获取星期几
 */
export const getWeekDay = (date) => {
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']
  const d = new Date(date)
  return `星期${weekDays[d.getDay()]}`
}

/**
 * 获取当前月份的日历数据（6行7列）
 */
export const getMonthCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const prevMonthLastDay = new Date(year, month, 0)
  
  const firstDayWeek = firstDay.getDay()
  const daysInMonth = lastDay.getDate()
  const daysInPrevMonth = prevMonthLastDay.getDate()
  
  const calendar = []
  let dayCount = 1
  let nextMonthDayCount = 1
  
  // 生成6行7列的日历数据
  for (let i = 0; i < 6; i++) {
    const week = []
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayWeek) {
        // 上个月的日期
        week.push({
          day: daysInPrevMonth - firstDayWeek + j + 1,
          isCurrentMonth: false,
          isPrevMonth: true,
          date: new Date(year, month - 1, daysInPrevMonth - firstDayWeek + j + 1)
        })
      } else if (dayCount <= daysInMonth) {
        // 当前月的日期
        week.push({
          day: dayCount,
          isCurrentMonth: true,
          date: new Date(year, month, dayCount)
        })
        dayCount++
      } else {
        // 下个月的日期
        week.push({
          day: nextMonthDayCount,
          isCurrentMonth: false,
          isNextMonth: true,
          date: new Date(year, month + 1, nextMonthDayCount)
        })
        nextMonthDayCount++
      }
    }
    calendar.push(week)
  }
  
  return calendar
}
```

**验收标准**:
- ✅ 项目能够正常启动并在微信开发者工具中预览
- ✅ TabBar 显示正常，可以切换各个页面
- ✅ 全局样式变量生效
- ✅ 项目结构清晰，符合规范

---

## 🏠 阶段二：首页开发（第 2 周）

### 2.1 Header 组件开发

**文件**: `src/components/Header/index.jsx`

**功能需求**:
- 渐变背景色
- 显示当前公历日期（大字号）
- 显示农历日期（小字号）
- 左右切换按钮（昨天/明天）
- 适配安全区域（挖孔屏）

**组件结构**:
```javascript
import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

const Header = ({ date, onDateChange }) => {
  return (
    <View className="header">
      <View className="header-safe-area"></View>
      <View className="header-content">
        <View className="date-switch" onClick={() => onDateChange('prev')}>
          <Text className="icon">←</Text>
          <Text>昨天</Text>
        </View>
        
        <View className="date-display">
          <Text className="date-main">{/* 公历日期 */}</Text>
          <Text className="date-sub">{/* 农历日期 */}</Text>
        </View>
        
        <View className="date-switch" onClick={() => onDateChange('next')}>
          <Text>明天</Text>
          <Text className="icon">→</Text>
        </View>
      </View>
    </View>
  )
}
```

### 2.2 AlmanacCard 组件开发

**文件**: `src/components/AlmanacCard/index.jsx`

**功能需求**:
- 白色卡片，带圆角和阴影
- "宜"区域：绿色背景胶囊，显示5个宜事项
- "忌"区域：橙色背景胶囊，显示5个忌事项
- 底部显示干支信息
- 右上角"详情"按钮，点击跳转到黄历详情页

**样式**: `src/components/AlmanacCard/index.scss`
```scss
@import '@/styles/variables.scss';

.almanac-card {
  margin: -80rpx 32rpx 24rpx;
  padding: 32rpx;
  background: $bg-card;
  border-radius: $border-radius-base;
  box-shadow: $shadow-card;
  position: relative;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
    
    .title {
      font-size: $font-size-lg;
      font-weight: $font-weight-bold;
      color: $text-main;
    }
    
    .detail-btn {
      color: $primary;
      font-size: $font-size-sm;
    }
  }
  
  .suit-avoid-section {
    margin-bottom: 32rpx;
    
    .section-label {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;
      
      .dot {
        width: 12rpx;
        height: 12rpx;
        border-radius: 50%;
        margin-right: 8rpx;
      }
      
      .label-text {
        font-size: $font-size-base;
        font-weight: $font-weight-medium;
      }
    }
    
    .pills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 16rpx;
      
      .pill {
        padding: 12rpx 24rpx;
        border-radius: 32rpx;
        font-size: $font-size-sm;
      }
    }
    
    &.suit {
      .dot {
        background: $primary;
      }
      .pill {
        background: $primary-light;
        color: $primary;
      }
    }
    
    &.avoid {
      .dot {
        background: $accent;
      }
      .pill {
        background: $accent-light;
        color: $accent;
      }
    }
  }
  
  .ganzhi-info {
    text-align: center;
    color: $text-sub;
    font-size: $font-size-sm;
    padding-top: 24rpx;
    border-top: 2rpx solid #F0F0F0;
  }
}
```

### 2.3 NextHolidayCard 组件开发

**文件**: `src/components/NextHolidayCard/index.jsx`

**功能需求**:
- 橙色渐变背景
- 左侧显示节日名称和日期范围
- 右侧白色圆角方块显示倒数天数（橙色数字）
- 点击跳转到节假日页面

### 2.4 首页整合

**文件**: `src/pages/home/index.jsx`

```javascript
import { View } from '@tarojs/components'
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import Header from '@/components/Header'
import AlmanacCard from '@/components/AlmanacCard'
import NextHolidayCard from '@/components/NextHolidayCard'
import { formatDate, getWeekDay } from '@/utils/date'
import { getLunarDate } from '@/utils/lunar'
import { getAlmanacData } from '@/services/almanac'
import { getNextHoliday } from '@/services/holiday'
import './index.scss'

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [almanacData, setAlmanacData] = useState(null)
  const [nextHoliday, setNextHoliday] = useState(null)
  
  useEffect(() => {
    loadData()
  }, [currentDate])
  
  const loadData = async () => {
    const dateStr = formatDate(currentDate)
    const almanac = await getAlmanacData(dateStr)
    const holiday = await getNextHoliday(dateStr)
    
    setAlmanacData(almanac)
    setNextHoliday(holiday)
  }
  
  const handleDateChange = (direction) => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }
  
  const handleViewDetail = () => {
    Taro.navigateTo({
      url: '/pages/almanac/index'
    })
  }
  
  return (
    <View className="home-page">
      <Header 
        date={currentDate} 
        onDateChange={handleDateChange}
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
    </View>
  )
}

export default Home
```

**验收标准**:
- ✅ 首页三个组件正常显示
- ✅ 日期切换功能正常
- ✅ 宜忌胶囊颜色正确（绿色/橙色）
- ✅ 卡片圆角、阴影、间距符合设计规范
- ✅ 在 Xiaomi 15 上显示完美，顶部适配挖孔屏

---

## 📅 阶段三：月历页面开发（第 3 周）

### 3.1 CalendarView 组件开发

**文件**: `src/components/CalendarView/index.jsx`

**功能需求**:
- 6行7列网格布局
- 月份切换功能（左右箭头）
- "回到今天"按钮
- 今日态样式：文字颜色为主色
- 选中态样式：实心圆背景，白色文字
- 节假日标记：右上角显示"休"或"班"小标签
- 显示农历日期（灰色小字）
- 点击日期触发选中事件

**核心逻辑**:
```javascript
import { View, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { getMonthCalendar } from '@/utils/date'
import './index.scss'

const CalendarView = ({ onDateSelect }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [selectedDate, setSelectedDate] = useState(null)
  const [calendarData, setCalendarData] = useState([])
  
  useEffect(() => {
    const data = getMonthCalendar(currentYear, currentMonth)
    setCalendarData(data)
  }, [currentYear, currentMonth])
  
  const handleDateClick = (dateInfo) => {
    setSelectedDate(dateInfo.date)
    onDateSelect && onDateSelect(dateInfo)
  }
  
  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentYear(currentYear - 1)
        setCurrentMonth(11)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentYear(currentYear + 1)
        setCurrentMonth(0)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }
  
  const handleBackToToday = () => {
    const today = new Date()
    setCurrentYear(today.getFullYear())
    setCurrentMonth(today.getMonth())
    setSelectedDate(today)
  }
  
  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }
  
  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
  }
  
  return (
    <View className="calendar-view">
      <View className="calendar-header">
        <View className="month-switch" onClick={() => handleMonthChange('prev')}>
          <Text className="icon">‹</Text>
        </View>
        
        <View className="month-display">
          <Text className="month">{currentMonth + 1}月</Text>
          <Text className="year">{currentYear}</Text>
        </View>
        
        <View className="month-switch" onClick={() => handleMonthChange('next')}>
          <Text className="icon">›</Text>
        </View>
      </View>
      
      <View className="back-today-btn" onClick={handleBackToToday}>
        <Text>🏠 回到今天</Text>
      </View>
      
      <View className="calendar-weekdays">
        {['日', '一', '二', '三', '四', '五', '六'].map(day => (
          <View key={day} className="weekday">
            <Text>{day}</Text>
          </View>
        ))}
      </View>
      
      <View className="calendar-grid">
        {calendarData.map((week, weekIndex) => (
          <View key={weekIndex} className="calendar-week">
            {week.map((dateInfo, dayIndex) => (
              <View
                key={dayIndex}
                className={`calendar-day ${!dateInfo.isCurrentMonth ? 'other-month' : ''} ${isToday(dateInfo.date) ? 'today' : ''} ${isSelected(dateInfo.date) ? 'selected' : ''}`}
                onClick={() => handleDateClick(dateInfo)}
              >
                <View className="day-number">{dateInfo.day}</View>
                {dateInfo.isCurrentMonth && (
                  <View className="day-lunar">{/* 农历日期 */}</View>
                )}
                {dateInfo.holiday && (
                  <View className={`holiday-tag ${dateInfo.holiday.type}`}>
                    {dateInfo.holiday.tag}
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

export default CalendarView
```

### 3.2 DetailPanel 组件开发

**文件**: `src/components/DetailPanel/index.jsx`

**功能需求**:
- 底部弹出面板
- 显示选中日期的完整黄历信息
- 宜忌胶囊列表（绿色/橙色）
- "查看完整黄历"按钮，跳转到黄历详情页

### 3.3 月历页面整合

**文件**: `src/pages/calendar/index.jsx`

```javascript
import { View } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import CalendarView from '@/components/CalendarView'
import DetailPanel from '@/components/DetailPanel'
import { getAlmanacData } from '@/services/almanac'
import './index.scss'

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [almanacData, setAlmanacData] = useState(null)
  const [showPanel, setShowPanel] = useState(false)
  
  const handleDateSelect = async (dateInfo) => {
    setSelectedDate(dateInfo.date)
    const data = await getAlmanacData(dateInfo.date)
    setAlmanacData(data)
    setShowPanel(true)
  }
  
  const handleViewFullAlmanac = () => {
    Taro.navigateTo({
      url: `/pages/almanac/index?date=${selectedDate}`
    })
  }
  
  return (
    <View className="calendar-page">
      <CalendarView onDateSelect={handleDateSelect} />
      
      {showPanel && almanacData && (
        <DetailPanel
          date={selectedDate}
          data={almanacData}
          onClose={() => setShowPanel(false)}
          onViewFull={handleViewFullAlmanac}
        />
      )}
    </View>
  )
}

export default Calendar
```

**验收标准**:
- ✅ 日历网格布局正确，6行7列
- ✅ 月份切换流畅
- ✅ 今日态和选中态样式正确
- ✅ 节假日标记显示正确
- ✅ 点击日期后底部详情面板弹出
- ✅ 农历日期显示正确

---

## ⏱️ 阶段四：倒数日页面开发（第 3 周）

### 4.1 FilterTabs 组件开发

**文件**: `src/components/FilterTabs/index.jsx`

**功能需求**:
- 顶部胶囊切换按钮（全部/纪念日/生日/倒数日/其他）
- 选中态样式：紫色背景，白色文字
- 未选中态样式：白色背景，灰色文字

### 4.2 EventCard 组件开发

**文件**: `src/components/EventCard/index.jsx`

**功能需求**:
- 白色卡片
- 左侧彩色竖条，根据分类显示不同颜色
- 显示事件标题和简介
- 右侧显示"还有X天"或"已过X天"
- 支持左滑删除
- 点击编辑

### 4.3 添加/编辑页面开发

**文件**: `src/pages/countdown/add/index.jsx`

**功能需求**:
- 表单项：
  - 标题输入框
  - 简介输入框
  - 日期选择器（支持公历/农历切换）
  - 分类选择（单选：纪念日/生日/倒数日/其他）
  - 循环周期（单选：一年/半年/三个月/一个月/不循环）
  - 置顶开关
- 底部提交按钮

```javascript
import { View, Input, Picker, Switch, Button } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import { formatDate } from '@/utils/date'
import { saveCountdownEvent } from '@/services/countdown'
import './index.scss'

const CountdownAdd = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetDate: formatDate(new Date()),
    type: 'anniversary', // anniversary, birthday, countdown, other
    loop: 'yearly', // yearly, halfYear, quarterly, monthly, none
    isPinned: false,
    isLunar: false
  })
  
  const handleSubmit = async () => {
    if (!formData.title) {
      Taro.showToast({ title: '请输入标题', icon: 'none' })
      return
    }
    
    try {
      await saveCountdownEvent(formData)
      Taro.showToast({ title: '添加成功', icon: 'success' })
      setTimeout(() => {
        Taro.navigateBack()
      }, 1500)
    } catch (error) {
      Taro.showToast({ title: '添加失败', icon: 'none' })
    }
  }
  
  return (
    <View className="countdown-add-page">
      <View className="form-item">
        <Text className="label">标题</Text>
        <Input
          className="input"
          placeholder="请输入内容"
          value={formData.title}
          onInput={(e) => setFormData({...formData, title: e.detail.value})}
        />
      </View>
      
      <View className="form-item">
        <Text className="label">简介</Text>
        <Input
          className="input"
          placeholder="请输入内容"
          value={formData.description}
          onInput={(e) => setFormData({...formData, description: e.detail.value})}
        />
      </View>
      
      <View className="form-item">
        <Text className="label">纪念日</Text>
        <Picker
          mode="date"
          value={formData.targetDate}
          onChange={(e) => setFormData({...formData, targetDate: e.detail.value})}
        >
          <View className="picker-value">
            公历:{formData.targetDate}
          </View>
        </Picker>
        <View className="hint">
          * 录入公历纪念日，系统自动计算纪念日剩余天数并标记在日历中；需录入农历日程请点击上方切换。
        </View>
      </View>
      
      <View className="form-item">
        <Text className="label">类型</Text>
        <View className="radio-group">
          {[
            { value: 'anniversary', label: '纪念日' },
            { value: 'birthday', label: '生日' },
            { value: 'countdown', label: '倒数日' },
            { value: 'other', label: '其他' }
          ].map(item => (
            <View
              key={item.value}
              className={`radio-item ${formData.type === item.value ? 'active' : ''}`}
              onClick={() => setFormData({...formData, type: item.value})}
            >
              {item.label}
            </View>
          ))}
        </View>
      </View>
      
      <View className="form-item">
        <Text className="label">循环周期</Text>
        <View className="radio-group">
          {[
            { value: 'yearly', label: '一年' },
            { value: 'halfYear', label: '半年' },
            { value: 'quarterly', label: '三个月' },
            { value: 'monthly', label: '一个月' },
            { value: 'none', label: '不循环' }
          ].map(item => (
            <View
              key={item.value}
              className={`radio-item ${formData.loop === item.value ? 'active' : ''}`}
              onClick={() => setFormData({...formData, loop: item.value})}
            >
              {item.label}
            </View>
          ))}
        </View>
        <View className="hint">
          * 日程循环周期，例如生日、纪念日等以一年为循环周期
        </View>
      </View>
      
      <Button className="submit-btn" onClick={handleSubmit}>
        提交
      </Button>
    </View>
  )
}

export default CountdownAdd
```

### 4.4 倒数日列表页面

**文件**: `src/pages/countdown/index.jsx`

```javascript
import { View } from '@tarojs/components'
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import FilterTabs from '@/components/FilterTabs'
import EventCard from '@/components/EventCard'
import { getCountdownEvents } from '@/services/countdown'
import './index.scss'

const Countdown = () => {
  const [filterType, setFilterType] = useState('all')
  const [events, setEvents] = useState([])
  
  useEffect(() => {
    loadEvents()
  }, [filterType])
  
  const loadEvents = async () => {
    const data = await getCountdownEvents(filterType)
    setEvents(data)
  }
  
  const handleAdd = () => {
    Taro.navigateTo({
      url: '/pages/countdown/add/index'
    })
  }
  
  const handleEdit = (event) => {
    Taro.navigateTo({
      url: `/pages/countdown/add/index?id=${event.id}`
    })
  }
  
  const handleDelete = (event) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这个日程吗？',
      success: (res) => {
        if (res.confirm) {
          // 执行删除操作
          loadEvents()
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
```

**验收标准**:
- ✅ 分类筛选功能正常
- ✅ 事件列表显示正确
- ✅ 左滑删除功能正常
- ✅ 添加/编辑表单验证正确
- ✅ 日期选择器支持公农历切换
- ✅ 悬浮添加按钮位置正确

---

## 🎉 阶段五：节假日页面开发（第 4 周）

### 5.1 HolidayCard 组件开发

**文件**: `src/components/HolidayCard/index.jsx`

**功能需求**:
- 白色卡片，左侧橙色圆点
- 显示节日名称（大字）
- 右侧橙色Badge显示倒数天数
- 显示放假日期区间
- 显示调休说明（灰色小字）
- 可展开/收起详情

### 5.2 NextHolidayHighlight 组件

**文件**: `src/components/NextHolidayHighlight/index.jsx`

**功能需求**:
- 橙色渐变卡片
- 显示"下个假期"标签
- 显示节日名称
- 显示具体放假日期
- 右侧白色圆角方块显示倒数天数
- 显示调休说明

### 5.3 节假日页面整合

**文件**: `src/pages/holiday/index.jsx`

```javascript
import { View, Text, Picker } from '@tarojs/components'
import { useState, useEffect } from 'react'
import NextHolidayHighlight from '@/components/NextHolidayHighlight'
import HolidayCard from '@/components/HolidayCard'
import { getHolidaysByYear } from '@/services/holiday'
import './index.scss'

const Holiday = () => {
  const [currentYear, setCurrentYear] = useState(2026)
  const [nextHoliday, setNextHoliday] = useState(null)
  const [holidays, setHolidays] = useState([])
  
  useEffect(() => {
    loadHolidays()
  }, [currentYear])
  
  const loadHolidays = async () => {
    const data = await getHolidaysByYear(currentYear)
    setNextHoliday(data.next)
    setHolidays(data.list)
  }
  
  const handleYearChange = (e) => {
    setCurrentYear(e.detail.value)
  }
  
  return (
    <View className="holiday-page">
      <View className="year-selector">
        <Picker
          mode="selector"
          range={[2025, 2026, 2027, 2028, 2029, 2030]}
          value={currentYear}
          onChange={handleYearChange}
        >
          <View className="year-display">
            <Text>{currentYear}年 节假日安排</Text>
            <Text className="icon">▼</Text>
          </View>
        </Picker>
      </View>
      
      {nextHoliday && (
        <NextHolidayHighlight data={nextHoliday} />
      )}
      
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
    </View>
  )
}

export default Holiday
```

**验收标准**:
- ✅ 年份选择器正常工作
- ✅ 下个假期高亮卡片显示正确
- ✅ 时间轴布局清晰美观
- ✅ 倒数天数计算准确
- ✅ 调休说明显示正确

---

## 📜 阶段六：黄历详情页开发（第 4 周）

### 6.1 黄历详情页面

**文件**: `src/pages/almanac/index.jsx`

**功能需求**:
- 顶部大号日期显示（96rpx超大字号）
- 昨天/今天/明天切换按钮
- 农历日期显示
- 年柱、月柱、日柱、时柱显示（竖排对联风格）
- 今日宜忌指数（进度条）
- 详细宜忌列表（流式布局）
- 信息表格：
  - 吉神宜趋
  - 凶煞宜忌
  - 胎神方位
  - 纳音五行
  - 财神方位
  - 喜神方位
  - 福神方位
  - 阳贵方位
  - 阴贵方位
- 底部彭祖百忌警告条

```javascript
import { View, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { formatDate } from '@/utils/date'
import { getAlmanacDetail } from '@/services/almanac'
import './index.scss'

const Almanac = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [almanacData, setAlmanacData] = useState(null)
  
  useEffect(() => {
    // 从页面参数获取日期
    const params = Taro.getCurrentInstance().router.params
    if (params.date) {
      setCurrentDate(new Date(params.date))
    }
  }, [])
  
  useEffect(() => {
    loadData()
  }, [currentDate])
  
  const loadData = async () => {
    const data = await getAlmanacDetail(formatDate(currentDate))
    setAlmanacData(data)
  }
  
  const handleDateSwitch = (type) => {
    const newDate = new Date(currentDate)
    if (type === 'prev') {
      newDate.setDate(newDate.getDate() - 1)
    } else if (type === 'next') {
      newDate.setDate(newDate.getDate() + 1)
    } else {
      return new Date()
    }
    setCurrentDate(newDate)
  }
  
  if (!almanacData) return null
  
  return (
    <View className="almanac-page">
      {/* 日期切换区域 */}
      <View className="date-switch-section">
        <View className="date-display-big">
          <Text className="year-month">
            {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
          </Text>
          <Text className="weekday">星期五</Text>
          
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
        <Text className="label">阴历 {almanacData.lunar}</Text>
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
          <Text className="score-value">{almanacData.rating}</Text>
        </View>
        <View className="progress-bar">
          <View 
            className="progress-fill" 
            style={{ width: `${(almanacData.score / 100) * 100}%` }}
          ></View>
        </View>
      </View>
      
      {/* 宜忌详情 */}
      <View className="suit-avoid-detail">
        <View className="section suit-section">
          <View className="section-header">
            <View className="dot suit"></View>
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
            <View className="dot avoid"></View>
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
          <View className="divider"></View>
          <Text>财神方位</Text>
          <View className="divider"></View>
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
      
      {/* 底部说明 */}
      <View className="almanac-footer">
        <Text>距离 元旦 还有 <Text className="highlight">41</Text>天 →</Text>
      </View>
    </View>
  )
}

export default Almanac
```

**验收标准**:
- ✅ 超大号日期显示清晰
- ✅ 日期切换功能正常
- ✅ 干支信息对联样式美观
- ✅ 宜忌指数进度条显示正确
- ✅ 详细信息表格布局清晰
- ✅ 财神方位网格布局正确
- ✅ 彭祖百忌警告条样式醒目

---

## 🧪 阶段七：数据服务与Mock数据（第 5 周）

### 7.1 Mock数据准备

**文件**: `src/mock/almanacData.js`

```javascript
// 黄历Mock数据
export const almanacMockData = {
  '2025-11-21': {
    date: '2025-11-21',
    lunar: '乙巳年 十月初二',
    weekday: '星期五',
    ganzhi: '乙巳年 丁亥月 甲午日',
    yearPillar: '乙巳',
    monthPillar: '丁亥',
    dayPillar: '甲午',
    constellation: '天蝎座',
    yi: ['纳采', '订盟', '嫁娶', '祭祀', '祈福', '雕刻', '移徙', '开市', '入宅', '出行', '动土', '会亲友', '入学', '修造', '起基', '安门', '安床', '造庙', '解除', '纳财', '开池', '造畜稠', '牧养'],
    ji: ['上梁', '开仓', '出货财', '盖屋', '造船'],
    score: 60,
    rating: '平日',
    jiShen: '月德 四相 普护 青龙 鸣吠 天更 致死 五虚',
    xiongSha: '冲鼠 九空 九坎 九焦',
    taiShen: '占门碓 房内北',
    naYin: '沙中金',
    chongSha: '冲鼠煞北',
    caiShen: '东北',
    xiShen: '东北',
    fuShen: '东南',
    yangGui: '西南',
    yinGui: '东北',
    pengZu: '甲不开仓财物耗散 午不苫盖屋主更张'
  }
}

// 获取黄历数据
export const getAlmanacData = (dateStr) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = almanacMockData[dateStr] || generateDefaultAlmanacData(dateStr)
      resolve(data)
    }, 300)
  })
}

// 生成默认黄历数据
const generateDefaultAlmanacData = (dateStr) => {
  const yiList = ['纳采', '订盟', '嫁娶', '祭祀', '祈福', '出行', '动土', '移徙', '入宅']
  const jiList = ['开仓', '出货财', '盖屋', '造船', '上梁']
  
  return {
    date: dateStr,
    lunar: '待计算',
    weekday: '待计算',
    ganzhi: '待计算',
    yearPillar: '乙巳',
    monthPillar: '丁亥',
    dayPillar: '甲午',
    yi: yiList.slice(0, 5),
    ji: jiList.slice(0, 5),
    score: Math.floor(Math.random() * 100),
    rating: '平日',
    jiShen: '月德 四相 普护',
    xiongSha: '冲鼠 九空',
    taiShen: '占门碓 房内北',
    naYin: '沙中金',
    chongSha: '冲鼠煞北',
    caiShen: '东北',
    xiShen: '东北',
    fuShen: '东南',
    yangGui: '西南',
    yinGui: '东北',
    pengZu: '甲不开仓财物耗散 午不苫盖屋主更张'
  }
}
```

**文件**: `src/mock/holidayData.js`

```javascript
// 节假日Mock数据
export const holidayMockData = {
  2026: [
    {
      name: '元旦',
      dateRange: '1月1日-3日',
      startDate: '2026-01-01',
      endDate: '2026-01-03',
      daysCount: 3,
      note: '1月1日（周四）至3日（周六）放假调休，共3天。1月4日（周日）上班。',
      workDay: '1月4日（周日）'
    },
    {
      name: '春节',
      dateRange: '2月15日-23日',
      startDate: '2026-02-15',
      endDate: '2026-02-23',
      daysCount: 9,
      note: '2月15日（周日）至23日（周一）放假调休，共9天。2月7日（周六）、2月8日（周日）上班。',
      workDay: '2月7日（周六）、2月8日（周日）'
    },
    {
      name: '清明节',
      dateRange: '4月4日-6日',
      startDate: '2026-04-04',
      endDate: '2026-04-06',
      daysCount: 3,
      note: '4月4日（周六）至6日（周一）放假调休，共3天。',
      workDay: null
    },
    {
      name: '劳动节',
      dateRange: '5月1日-5日',
      startDate: '2026-05-01',
      endDate: '2026-05-05',
      daysCount: 5,
      note: '5月1日（周五）至5日（周二）放假调休，共5天。4月26日（周日）、5月9日（周六）上班。',
      workDay: '4月26日（周日）、5月9日（周六）'
    },
    {
      name: '端午节',
      dateRange: '6月19日-21日',
      startDate: '2026-06-19',
      endDate: '2026-06-21',
      daysCount: 3,
      note: '6月19日（周五）至21日（周日）放假调休，共3天。',
      workDay: null
    },
    {
      name: '中秋节',
      dateRange: '9月25日-27日',
      startDate: '2026-09-25',
      endDate: '2026-09-27',
      daysCount: 3,
      note: '9月25日（周五）至27日（周日）放假调休，共3天。',
      workDay: null
    },
    {
      name: '国庆节',
      dateRange: '10月1日-7日',
      startDate: '2026-10-01',
      endDate: '2026-10-07',
      daysCount: 7,
      note: '10月1日（周四）至7日（周三）放假调休，共7天。9月27日（周日）、10月10日（周六）上班。',
      workDay: '9月27日（周日）、10月10日（周六）'
    }
  ]
}

// 获取指定年份的节假日
export const getHolidaysByYear = (year) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const holidays = holidayMockData[year] || []
      const today = new Date()
      
      // 计算倒数天数
      const holidaysWithCountdown = holidays.map(holiday => {
        const targetDate = new Date(holiday.startDate)
        const countdown = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24))
        return {
          ...holiday,
          countdown: countdown > 0 ? countdown : 0,
          isPassed: countdown < 0
        }
      })
      
      // 找出下一个假期
      const upcomingHolidays = holidaysWithCountdown.filter(h => !h.isPassed)
      const nextHoliday = upcomingHolidays.length > 0 ? upcomingHolidays[0] : null
      
      resolve({
        next: nextHoliday,
        list: holidaysWithCountdown
      })
    }, 300)
  })
}
```

**文件**: `src/mock/countdownData.js`

```javascript
// 倒数日Mock数据
let countdownEvents = [
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

// 获取倒数日事件
export const getCountdownEvents = (filterType = 'all') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = countdownEvents
      
      if (filterType !== 'all') {
        filtered = countdownEvents.filter(event => event.type === filterType)
      }
      
      // 计算倒数天数
      const today = new Date()
      const eventsWithCountdown = filtered.map(event => {
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
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        return Math.abs(a.daysLeft) - Math.abs(b.daysLeft)
      })
      
      resolve(eventsWithCountdown)
    }, 300)
  })
}

// 保存倒数日事件
export const saveCountdownEvent = (event) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (event.id) {
        // 更新
        const index = countdownEvents.findIndex(e => e.id === event.id)
        if (index !== -1) {
          countdownEvents[index] = event
        }
      } else {
        // 新增
        event.id = Date.now()
        event.color = getRandomColor()
        countdownEvents.push(event)
      }
      resolve(event)
    }, 300)
  })
}

// 删除倒数日事件
export const deleteCountdownEvent = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      countdownEvents = countdownEvents.filter(e => e.id !== id)
      resolve()
    }, 300)
  })
}

// 随机颜色
const colors = ['#FF6B9D', '#FF7043', '#00897B', '#5C6BC0', '#AB47BC', '#26A69A']
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]
```

### 7.2 服务层封装

**文件**: `src/services/almanac.js`

```javascript
import { getAlmanacData as getMockData } from '@/mock/almanacData'

/**
 * 获取黄历数据
 */
export const getAlmanacData = async (dateStr) => {
  // 生产环境替换为真实API
  // return Taro.request({ url: `/api/almanac?date=${dateStr}` })
  return getMockData(dateStr)
}

/**
 * 获取黄历详情
 */
export const getAlmanacDetail = async (dateStr) => {
  return getMockData(dateStr)
}
```

**文件**: `src/services/holiday.js`

```javascript
import { getHolidaysByYear as getMockHolidays } from '@/mock/holidayData'
import { getDaysDiff } from '@/utils/date'

/**
 * 获取指定年份的节假日
 */
export const getHolidaysByYear = async (year) => {
  return getMockHolidays(year)
}

/**
 * 获取下一个节假日
 */
export const getNextHoliday = async () => {
  const currentYear = new Date().getFullYear()
  const data = await getHolidaysByYear(currentYear)
  return data.next
}
```

**文件**: `src/services/countdown.js`

```javascript
import {
  getCountdownEvents as getMockEvents,
  saveCountdownEvent as saveMockEvent,
  deleteCountdownEvent as deleteMockEvent
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
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('读取本地存储失败', error)
  }
  
  // 使用Mock数据
  return getMockEvents(filterType)
}

/**
 * 保存倒数日事件
 */
export const saveCountdownEvent = async (event) => {
  const result = await saveMockEvent(event)
  
  // 保存到本地存储
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
```

### 7.3 农历转换工具（可选择集成第三方库）

**安装lunar-javascript库**:
```bash
npm install lunar-javascript
```

**文件**: `src/utils/lunar.js`

```javascript
import { Solar, Lunar } from 'lunar-javascript'

/**
 * 公历转农历
 */
export const solarToLunar = (dateStr) => {
  const d = new Date(dateStr)
  const solar = Solar.fromDate(d)
  const lunar = solar.getLunar()
  
  return {
    year: lunar.getYearInChinese(), // 乙巳年
    month: lunar.getMonthInChinese(), // 十月
    day: lunar.getDayInChinese(), // 初二
    fullString: `${lunar.getYearInChinese()}${lunar.getMonthInChinese()}${lunar.getDayInChinese()}`,
    ganzhi: `${lunar.getYearInGanZhi()}年 ${lunar.getMonthInGanZhi()}月 ${lunar.getDayInGanZhi()}日`
  }
}

/**
 * 农历转公历
 */
export const lunarToSolar = (year, month, day, isLeap = false) => {
  const lunar = Lunar.fromYmd(year, month, day, isLeap)
  const solar = lunar.getSolar()
  
  return {
    year: solar.getYear(),
    month: solar.getMonth(),
    day: solar.getDay(),
    date: new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay())
  }
}
```

**验收标准**:
- ✅ Mock数据结构完整，符合业务需求
- ✅ 服务层API接口清晰，易于替换为真实API
- ✅ 农历转换功能正常
- ✅ 本地存储功能正常

---

## 🎨 阶段八：样式优化与适配（第 5-6 周）

### 8.1 全局样式优化

**任务清单**:
- [ ] 统一所有页面的卡片样式
- [ ] 优化过渡动画效果
- [ ] 完善加载状态和空状态
- [ ] 优化按钮交互反馈

### 8.2 响应式适配检查

**检查项**:
- [ ] 所有尺寸都使用rpx单位
- [ ] 在不同屏幕尺寸下布局正常
- [ ] 挖孔屏安全区域适配
- [ ] 横屏模式兼容性

### 8.3 性能优化

**优化项**:
- [ ] 图片懒加载
- [ ] 长列表虚拟滚动
- [ ] 减少不必要的渲染
- [ ] 优化事件处理函数

**文件**: `src/utils/performance.js`

```javascript
import { useCallback, useRef } from 'react'

/**
 * 节流Hook
 */
export const useThrottle = (fn, delay = 300) => {
  const timer = useRef(null)
  
  return useCallback((...args) => {
    if (timer.current) return
    
    timer.current = setTimeout(() => {
      fn(...args)
      timer.current = null
    }, delay)
  }, [fn, delay])
}

/**
 * 防抖Hook
 */
export const useDebounce = (fn, delay = 300) => {
  const timer = useRef(null)
  
  return useCallback((...args) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    
    timer.current = setTimeout(() => {
      fn(...args)
    }, delay)
  }, [fn, delay])
}
```

---

## 🧪 阶段九：测试与调试（第 6 周）

### 9.1 功能测试清单

**首页测试**:
- [ ] 日期切换功能
- [ ] 黄历卡片显示
- [ ] 宜忌内容正确
- [ ] 下个假期倒数正确
- [ ] 跳转功能正常

**月历测试**:
- [ ] 月份切换功能
- [ ] 日期选中功能
- [ ] 今日态样式
- [ ] 节假日标记
- [ ] 底部详情面板
- [ ] 农历日期显示

**倒数日测试**:
- [ ] 分类筛选功能
- [ ] 添加事件功能
- [ ] 编辑事件功能
- [ ] 删除事件功能
- [ ] 倒数天数计算
- [ ] 公农历切换

**节假日测试**:
- [ ] 年份切换功能
- [ ] 假期列表显示
- [ ] 倒数天数计算
- [ ] 调休信息显示

**黄历测试**:
- [ ] 日期切换功能
- [ ] 详细信息显示
- [ ] 干支信息正确
- [ ] 宜忌指数显示
- [ ] 财神方位显示

### 9.2 兼容性测试

**测试设备**:
- [ ] Xiaomi 15 (主测试机)
- [ ] iPhone (iOS系统)
- [ ] 其他Android设备
- [ ] 不同屏幕尺寸

### 9.3 性能测试

**测试项**:
- [ ] 页面加载速度
- [ ] 首屏渲染时间
- [ ] 交互响应速度
- [ ] 内存占用情况

---

## 📦 阶段十：打包部署（第 6 周）

### 10.1 小程序配置

**文件**: `project.config.json`

```json
{
  "miniprogramRoot": "dist/",
  "projectname": "TimeSequence",
  "description": "知时日历 - 黄历日程管理小程序",
  "appid": "你的小程序AppID",
  "setting": {
    "urlCheck": true,
    "es6": true,
    "postcss": true,
    "minified": true,
    "newFeature": true,
    "coverView": true,
    "autoAudits": false,
    "checkInvalidKey": true
  },
  "compileType": "miniprogram"
}
```

### 10.2 打包命令

```bash
# 开发环境
npm run dev:weapp

# 生产环境打包
npm run build:weapp

# 预览
npm run build:weapp && 微信开发者工具预览
```

### 10.3 提交审核前检查

**检查清单**:
- [ ] 所有功能正常运行
- [ ] 无控制台错误
- [ ] 隐私政策完善
- [ ] 用户协议完善
- [ ] 小程序信息完整
- [ ] 分类标签正确
- [ ] 截图和介绍完整

---

## 📊 项目里程碑

| 阶段 | 周期 | 主要产出 | 验收标准 |
|------|------|----------|----------|
| 阶段一 | 第1周 | 项目初始化、环境配置 | 项目可运行，TabBar正常 |
| 阶段二 | 第2周 | 首页完成 | 首页三大组件显示正常 |
| 阶段三 | 第3周 | 月历页完成 | 日历交互完整，详情面板正常 |
| 阶段四 | 第3周 | 倒数日页完成 | 增删改查功能完整 |
| 阶段五 | 第4周 | 节假日页完成 | 假期展示完整 |
| 阶段六 | 第4周 | 黄历详情页完成 | 详细信息展示完整 |
| 阶段七 | 第5周 | 数据服务完成 | Mock数据完整，API可替换 |
| 阶段八 | 第5-6周 | 样式优化 | UI符合设计规范 |
| 阶段九 | 第6周 | 测试调试 | 所有功能通过测试 |
| 阶段十 | 第6周 | 打包部署 | 成功上线 |

---

## 🚀 快速开始指南

```bash
# 1. 克隆或创建项目
taro init timeSequence

# 2. 进入项目目录
cd timeSequence

# 3. 安装依赖
npm install

# 4. 安装额外依赖
npm install lunar-javascript

# 5. 启动开发服务器
npm run dev:weapp

# 6. 在微信开发者工具中打开项目
打开微信开发者工具 → 导入项目 → 选择 dist 目录
```

---

## 📝 开发规范总结

### 必须遵守的规范

1. **单位使用**: 所有尺寸必须使用 `rpx`，禁止使用 `px`
2. **色彩系统**: 严格使用定义的CSS变量
3. **命名规范**: 
   - 组件名: PascalCase (如: `AlmanacCard`)
   - 文件名: kebab-case (如: `almanac-card`)
   - 变量名: camelCase (如: `currentDate`)
4. **注释规范**: 所有函数必须添加注释说明
5. **代码格式**: 使用 ESLint + Prettier 统一代码风格

### 性能优化建议

1. 避免在render中创建新函数
2. 使用 `useCallback` 和 `useMemo` 优化性能
3. 长列表使用虚拟滚动
4. 图片使用懒加载
5. 合理使用节流和防抖

### 安全注意事项

1. 用户输入必须验证
2. 敏感信息不存储在本地
3. API请求添加防重放机制
4. 避免XSS攻击

---

## 📞 技术支持

如遇到技术问题，请参考：
- Taro官方文档: https://taro-docs.jd.com
- 微信小程序文档: https://developers.weixin.qq.com/miniprogram/dev/framework/
- lunar-javascript文档: https://github.com/6tail/lunar-javascript

---

**祝开发顺利！🎉**

