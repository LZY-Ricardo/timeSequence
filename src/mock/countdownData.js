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

// 获取单个事件
export const getCountdownEventById = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const event = countdownEvents.find(e => e.id == id)
            resolve(event)
        }, 100)
    })
}

// 随机颜色
const colors = ['#FF6B9D', '#FF7043', '#00897B', '#5C6BC0', '#AB47BC', '#26A69A']
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]
