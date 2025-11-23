/**
 * 根据当前时间返回问候语和对应的emoji
 * @returns {Object} { text: string, emoji: string }
 */
export const getGreeting = () => {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 11) {
        return { text: '早上好', emoji: '☀️' }
    } else if (hour >= 11 && hour < 13) {
        return { text: '中午好', emoji: '🌤️' }
    } else if (hour >= 13 && hour < 18) {
        return { text: '下午好', emoji: '⛅' }
    } else if (hour >= 18 && hour < 23) {
        return { text: '晚上好', emoji: '🌙' }
    } else {
        return { text: '夜深了', emoji: '🌃' }
    }
}
