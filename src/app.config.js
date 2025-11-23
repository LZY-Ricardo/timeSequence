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
      root: 'packageCountdown',
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
