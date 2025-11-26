import { View, Text } from '@tarojs/components'
import './index.scss'

const FilterTabs = ({ current = 'all', onChange }) => {
    const tabs = [
        { key: 'all', label: '全部' },
        { key: 'anniversary', label: '纪念日' },
        { key: 'birthday', label: '生日' },
        { key: 'countdown', label: '倒数日' },
        { key: 'other', label: '其他' }
    ]

    return (
        <View className="filter-tabs">
            {tabs.map(tab => (
                <View
                    key={tab.key}
                    className={`tab-item ${current === tab.key ? 'active' : ''}`}
                    onClick={() => onChange && onChange(tab.key)}
                >
                    <Text>{tab.label}</Text>
                </View>
            ))}
        </View>
    )
}

export default FilterTabs
