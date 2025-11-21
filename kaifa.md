# Role
你是一名精通 **Taro 跨端框架 (React)** 和 **微信小程序** 开发的高级前端工程师。你需要根据以下需求文档，从零构建一个名为 "TimeSequence" 的微信小程序。

# 1. 项目概述
* **项目名称**: TimeSequence
* **核心功能**: 集合了"传统黄历查询"、"现代日历"、"节假日安排"以及"个人倒数日/纪念日"功能的时间管理工具。
* **UI 风格**: 清新、理性的蓝绿色调（Teal/Turquoise）风格，融合了卡片式设计与扁平化图标。
* **技术栈**: 
    * 框架: Taro (推荐使用 React + Hooks)
    * 样式: SCSS / CSS Modules
    * 组件库: 推荐 NutUI 或 TDesign (或者使用原生 View/Text 手写轻量级样式)
    * 图标: Iconfont / SVG

# 2. 开发环境说明

## 2.1 测试机型规格
* **测试设备**: Xiaomi 15
* **操作系统**: Xiaomi HyperOS 2.0 (基于 Android 15)
* **屏幕类型**: 居中挖孔直屏
* **屏幕尺寸**: 6.36 英寸
* **DPR (设备像素比)**: 需根据实际机型适配

## 2.2 响应式布局规范 ⚠️

**【关键原则】务必遵守以下规范，违反将导致适配问题：**

1. **单位使用规范**:
   * ✅ **必须使用**: `rpx` (responsive pixel) - Taro 自动适配单位
   * ❌ **禁止使用**: `px` 写死像素值
   * ℹ️ **换算关系**: 设计稿 750px 宽度 = 750rpx，Taro 会自动根据设备屏幕宽度进行缩放

2. **适配原则**:
   * 所有尺寸、间距、字体大小都必须使用 `rpx` 单位
   * 组件宽高、margin、padding 等布局属性一律使用 `rpx`
   * 确保在不同屏幕尺寸（4.7寸 ~ 6.8寸）上都能正常显示
   * 针对挖孔屏，需预留顶部安全区域 (可使用 `env(safe-area-inset-top)`)

3. **示例对比**:
   ```scss
   // ❌ 错误写法 - 写死像素
   .card {
     width: 345px;
     padding: 16px;
     font-size: 14px;
   }

   // ✅ 正确写法 - 响应式单位
   .card {
     width: 690rpx;  // 假设设计稿宽度750px，卡片占345px
     padding: 32rpx;
     font-size: 28rpx;
   }
   ```

4. **特殊场景**:
   * 边框粗细等极小值可使用 `1px`，但建议使用 `2rpx` 确保适配
   * 不同设备上需要固定尺寸的元素（如 icon），建议使用 `rpx` 并设置合理的上下限

# 3. UI 设计规范 (Design System)

请在全局样式文件 (`app.scss` 或 `variables.scss`) 中定义以下 CSS 变量，并在项目中严格遵守：

## 3.1 色彩系统
* **--primary**: `#00897B` (松石绿 - 主色，用于导航栏、选中态、主要按钮)
* **--primary-light**: `#E0F2F1` (浅青色 - 用于"宜"背景、次级按钮背景)
* **--primary-gradient**: `linear-gradient(180deg, #00897B 0%, #00695C 100%)` (用于首页头部背景)
* **--accent**: `#FF7043` (暖橙色 - 警告色，用于"忌"、节假日倒数数字、强调信息)
* **--accent-light**: `#FBE9E7` (浅橙色 - 用于"忌"背景)
* **--text-main**: `#263238` (主要文字)
* **--text-sub**: `#546E7A` (次要文字)
* --bg-body: `#F5F7FA` (全局背景色 - 淡灰蓝)
* --bg-card: `#FFFFFF` (卡片背景)

## 3.2 布局规范
* **卡片圆角**: `24rpx` (大圆角风格)
* **页面内边距**: `32rpx`

# 4. 页面与组件架构 (Page & Component Structure)

项目包含底部 TabBar 导航，共 5 个页面。

## Tab 1: 首页 (pages/home/index)
* **Header 组件**:
    * 背景: 使用 `--primary-gradient`。
    * 内容: 当前公历日期 (大字)、农历日期 (小字)、左右切换天数按钮。
* **AlmanacCard 组件 (今日黄历)**:
    * 白色卡片，悬浮在 Header 之上。
    * 包含"宜"区域 (绿底绿字胶囊) 和"忌"区域 (橙底橙字胶囊)。
    * 底部显示今日干支 (如: 乙巳年 甲午日)。
* **NextHolidayCard 组件 (下一个假期)**:
    * 背景: 蓝绿色渐变卡片。
    * 布局: 左侧显示节日名称和日期范围，右侧白色小方块显示"倒数 X 天" (数字用橙色)。

## Tab 2: 月历 (pages/calendar/index)
* **CalendarView 组件**:
    * 支持月份切换。
    * 6行7列网格布局。
    * **选中态**: 实心圆 `--primary` 背景，白字。
    * **今日态**: 只有文字颜色为 `--primary` 或加小圆点。
    * 节假日标记: 单元格右上角显示"休"或"班"。
* **DetailPanel 组件**:
    * 点击日期后在底部显示的详情面板。
    * 展示该日期的详细宜忌胶囊列表。

## Tab 3: 倒数日 (pages/countdown/index)
* **FilterTabs**: 顶部胶囊切换 (全部 / 纪念日 / 生日 / 倒数日)。
* **EventList**: 垂直滚动的卡片列表。
    * **EventCard**: 左侧事件名，右侧显示"还有 X 天"或"已过 X 天"。
    * 样式: 极简白底卡片，左侧可以用不同颜色的竖条区分分类。
* **AddButton**: 右下角悬浮按钮 (+)，点击跳转至 `pages/countdown/add`。
* **子页面: 添加/编辑 (pages/countdown/add)**:
    * 表单项: 标题(Input), 简介(Input), 日期(DatePicker - 支持公农历), 分类(Radio), 循环周期(Radio), 置顶(Switch)。
    * 按钮: 底部大宽按钮"提交"。

## Tab 4: 节假日 (pages/holiday/index)
* **TimelineLayout**: 垂直时间轴布局。
* **HolidayCard**:
    * 显示节日名称 (如: 春节)。
    * 右侧显示 Badge: "还有 86 天" (橙色字体)。
    * 详情: 显示放假区间 (2月15日-23日) 及调休信息 (灰色小字说明哪天补班)。

## Tab 5: 黄历 (pages/almanac/index)
* **BigDateDisplay**: 页面顶部超大号日期显示。
* **PillarsRow**: 显示 年柱、月柱、日柱 (竖排对联样式)。
* **SuitAvoidGrid**: 详细的宜忌列表 (流式布局)。
* **TableData**: 使用 Grid 或 Table 展示：吉神、凶煞、胎神、五行纳音、财神方位等。
* **WarningFooter**: 底部显示"彭祖百忌" (浅黄色背景警告条)。

# 5. 数据模型示例 (Mock Data)

请使用以下 JSON 结构模拟数据：

```json
// 黄历/日历数据
{
  "date": "2025-11-21",
  "lunar": "十月初二",
  "ganzhi": "乙巳年 丁亥月 甲午日",
  "yi": ["纳采", "订盟", "嫁娶", "祭祀", "祈福"],
  "ji": ["上梁", "开仓", "出货财", "盖屋"],
  "suitAvoidScore": 80 // 吉凶指数
}

// 倒数日事件
{
  "id": 1,
  "title": "恋爱一周年",
  "targetDate": "2025-12-20",
  "type": "anniversary", // commemorative, birthday, countdown
  "isLoop": true
}

// 节假日
{
  "name": "元旦",
  "dateRange": "1月1日-3日",
  "daysCount": 3,
  "countdown": 41,
  "note": "1月4日(周日)上班"
}
```
