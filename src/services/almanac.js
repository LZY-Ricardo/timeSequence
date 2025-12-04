import { getAlmanacData as getMockData } from '@/mock/almanacData'
import { fetchAlmanacAPI } from '@/utils/request'
import { getAlmanacCache, setAlmanacCache } from '@/utils/cache'

/**
 * 将天行数据API返回的黄历数据转换为应用需要的格式
 */
const transformAlmanacData = (apiData) => {
  if (!apiData) return null

  // API返回的数据结构
  const {
    gregoriandate,  // 公历日期
    lunardate,      // 农历日期
    lunar_festival, // 农历节日
    festival,       // 公历节日
    fitness,        // 适宜 (用点分隔)
    taboo,          // 不宜 (用点分隔)
    shenwei,        // 神位
    taishen,        // 胎神
    chongsha,       // 冲煞
    suisha,         // 岁煞
    wuxingjiazi,    // 五行甲子
    wuxingnayear,   // 五行年
    wuxingnamonth,  // 五行月
    xingsu,         // 星宿
    pengzu,         // 彭祖
    jianshen,       // 见神
    tiangandizhiyear,  // 天干地支年
    tiangandizhimonth, // 天干地支月
    tiangandizhiday,   // 天干地支日
    lmonthname,     // 季节
    shengxiao,      // 生肖
    lubarmonth,     // 农历月
    lunarday,       // 农历日
    jieqi           // 节气
  } = apiData

  // 解析神位信息（格式："喜神：西北 福神：西南 财神：正东..."）
  const parsePosition = (text, keyword) => {
    if (!text) return ''
    const match = text.match(new RegExp(`${keyword}[：:]([^\s]+)`))
    return match ? match[1] : ''
  }

  const yiList = fitness ? fitness.split('.') : []
  const jiList = taboo ? taboo.split('.') : []
  
  const score = Math.min(100, Math.max(0, 50 + (yiList.length * 5) - (jiList.length * 3)))

  // 转换为应用数据格式
  return {
    date: gregoriandate,
    lunar: `${lubarmonth}${lunarday}`,
    lunarYear: `${tiangandizhiyear}年`,
    weekday: '', // API不返回星期，需要自己计算
    ganzhi: `${tiangandizhiyear}年 ${tiangandizhimonth}月 ${tiangandizhiday}日`,
    yearPillar: tiangandizhiyear,
    monthPillar: tiangandizhimonth,
    dayPillar: tiangandizhiday,
    constellation: '', // API不返回星座
    yi: yiList,
    ji: jiList,
    score,
    rating: '平',
    jiShen: shenwei || '',
    xiongSha: `${chongsha} ${suisha}`,
    taiShen: taishen || '',
    naYin: wuxingjiazi || '',
    chongSha: chongsha || '',
    caiShen: parsePosition(shenwei, '财神'),
    xiShen: parsePosition(shenwei, '喜神'),
    fuShen: parsePosition(shenwei, '福神'),
    yangGui: parsePosition(shenwei, '阳贵'),
    yinGui: parsePosition(shenwei, '阴贵'),
    pengZu: pengzu || '',
    shengxiao: shengxiao || '',
    jieqi: jieqi || '',
    lunarFestival: lunar_festival || '',
    festival: festival || ''
  }
}

/**
 * 获取黄历数据
 * @param {string} dateStr - 日期字符串 YYYY-MM-DD
 * @returns {Promise<Object>} 黄历数据
 */
export const getAlmanacData = async (dateStr) => {
  try {
    // 优先从缓存中获取
    const cachedData = getAlmanacCache(dateStr)
    if (cachedData) {
      console.log('📦 使用黄历缓存数据:', dateStr)
      return cachedData
    }

    // 调用天行数据API
    const apiResult = await fetchAlmanacAPI(dateStr)

    // API返回的是数组，取第一个元素
    const almanacData = Array.isArray(apiResult) ? apiResult[0] : apiResult

    // 转换数据格式
    const transformedData = transformAlmanacData(almanacData)

    // 缓存数据
    if (transformedData) {
      setAlmanacCache(dateStr, transformedData)
    }

    return transformedData
  } catch (error) {
    console.error('获取黄历数据失败，使用Mock数据:', error)
    // 失败时降级使用Mock数据
    return getMockData(dateStr)
  }
}

/**
 * 获取黄历详情
 * @param {string} dateStr - 日期字符串 YYYY-MM-DD
 * @returns {Promise<Object>} 黄历详情数据
 */
export const getAlmanacDetail = async (dateStr) => {
  return getAlmanacData(dateStr)
}
