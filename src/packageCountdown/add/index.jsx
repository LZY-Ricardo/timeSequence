import { View, Text, Input, Picker, Switch, Button } from '@tarojs/components'
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { formatDate } from '@/utils/date'
import { solarToLunar, lunarToSolar } from '@/utils/lunar'
import { saveCountdownEvent, getCountdownEventById } from '@/services/countdown'
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

  const [displayDate, setDisplayDate] = useState('')

  // Handle Edit Mode
  useEffect(() => {
    const params = Taro.getCurrentInstance().router.params
    if (params.id) {
      Taro.setNavigationBarTitle({ title: '编辑日程' })
      loadEvent(params.id)
    }
  }, [])

  const loadEvent = async (id) => {
    try {
      const event = await getCountdownEventById(id)
      if (event) {
        setFormData(event)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 更新显示日期
  useEffect(() => {
    if (formData.isLunar) {
      const lunar = solarToLunar(formData.targetDate)
      setDisplayDate(`农历 ${lunar.year}${lunar.month}${lunar.day}`)
    } else {
      setDisplayDate(`公历 ${formData.targetDate}`)
    }
  }, [formData.targetDate, formData.isLunar])

  const handleDateTypeSwitch = (isLunar) => {
    setFormData({
      ...formData,
      isLunar: isLunar
    })
  }

  const handleSubmit = async () => {
    if (!formData.title) {
      Taro.showToast({ title: '请输入标题', icon: 'none' })
      return
    }

    try {
      await saveCountdownEvent(formData)
      Taro.showToast({ title: '保存成功', icon: 'success' })
      setTimeout(() => {
        Taro.navigateBack()
      }, 1500)
    } catch (error) {
      Taro.showToast({ title: '保存失败', icon: 'none' })
    }
  }

  return (
    <View className="countdown-add-page">
      <View className="form-item">
        <Text className="label">标题</Text>
        <Input
          className="input"
          placeholder="请输入标题"
          value={formData.title}
          onInput={(e) => setFormData({ ...formData, title: e.detail.value })}
        />
      </View>

      <View className="form-item">
        <Text className="label">简介</Text>
        <Input
          className="input"
          placeholder="请输入简介（选填）"
          value={formData.description}
          onInput={(e) => setFormData({ ...formData, description: e.detail.value })}
        />
      </View>

      <View className="form-item">
        <Text className="label">日历类型</Text>
        <View className="radio-group date-type-switch">
          <View
            className={`radio-item ${!formData.isLunar ? 'active' : ''}`}
            onClick={() => handleDateTypeSwitch(false)}
          >
            公历
          </View>
          <View
            className={`radio-item ${formData.isLunar ? 'active' : ''}`}
            onClick={() => handleDateTypeSwitch(true)}
          >
            农历
          </View>
        </View>
      </View>

      <View className="form-item">
        <Text className="label">日期</Text>
        <Picker
          mode="date"
          value={formData.targetDate}
          onChange={(e) => setFormData({ ...formData, targetDate: e.detail.value })}
        >
          <View className="picker-value">
            {displayDate}
          </View>
        </Picker>
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
              onClick={() => setFormData({ ...formData, type: item.value })}
            >
              {item.label}
            </View>
          ))}
        </View>
      </View>

      <View className="form-item">
        <Text className="label">循环</Text>
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
              onClick={() => setFormData({ ...formData, loop: item.value })}
            >
              {item.label}
            </View>
          ))}
        </View>
      </View>

      <View className="form-item switch-item">
        <Text className="label">置顶</Text>
        <Switch
          checked={formData.isPinned}
          onChange={(e) => setFormData({ ...formData, isPinned: e.detail.value })}
          color="#00897B"
        />
      </View>

      <Button className="submit-btn" onClick={handleSubmit}>
        提交
      </Button>
    </View>
  )
}

export default CountdownAdd
