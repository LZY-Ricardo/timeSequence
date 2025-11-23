// 黄历Mock数据
export const almanacMockData = {
    '2025-11-23': {
        date: '2025-11-23',
        lunar: '十月廿三',
        lunarYear: '乙巳年',
        weekday: '星期六',
        ganzhi: '乙巳年 丁亥月 甲午日',
        yearPillar: '乙巳',
        monthPillar: '丁亥',
        dayPillar: '甲午',
        constellation: '射手座',
        yi: ['纳采', '订盟', '嫁娶', '祭祀', '祈福'],
        ji: ['上梁', '开仓', '出货财', '盖屋', '造船'],
        score: 60,
        rating: '平',
        jiShen: '月德 四相 普护 青龙',
        xiongSha: '冲鼠 九空 九坎',
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

/**
 * 获取黄历数据
 * @param {string} dateStr - 日期字符串 YYYY-MM-DD
 * @returns {Promise<Object>} 黄历数据
 */
export const getAlmanacData = (dateStr) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = almanacMockData[dateStr] || generateDefaultAlmanacData(dateStr)
            resolve(data)
        }, 300)
    })
}

/**
 * 生成默认黄历数据（当没有预设数据时）
 */
const generateDefaultAlmanacData = (dateStr) => {
    const yiList = ['纳采', '订盟', '嫁娶', '祭祀', '祈福', '出行', '动土', '移徙', '入宅', '开市', '交易', '立券', '挂匾', '栽种', '纳畜']
    const jiList = ['开仓', '出货财', '盖屋', '造船', '上梁', '安门', '安葬', '破土', '启攒']

    // 随机选择5个宜和忌
    const randomYi = []
    const randomJi = []

    for (let i = 0; i < 5; i++) {
        randomYi.push(yiList[Math.floor(Math.random() * yiList.length)])
        randomJi.push(jiList[Math.floor(Math.random() * jiList.length)])
    }

    return {
        date: dateStr,
        lunar: '待计算',
        lunarYear: '乙巳年',
        weekday: '待计算',
        ganzhi: '待计算',
        yearPillar: '乙巳',
        monthPillar: '丁亥',
        dayPillar: '甲午',
        yi: randomYi,
        ji: randomJi,
        score: Math.floor(Math.random() * 100),
        rating: '平',
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
