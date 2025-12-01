# 天行数据API对接实现总结

## 📋 实施概览

已成功将项目中的 Mock 数据替换为天行数据的真实 API 接口，包括黄历和节假日两个模块。

## 🔑 API配置

### API Key
- **天行数据 API Key**: `805df58dc702bd39bdd6f60fc73aab72`
- 配置文件: `src/config/api.js`

### 接口地址
1. **黄历接口**: `https://apis.tianapi.com/lunar/index`
2. **节假日接口**: `https://apis.tianapi.com/jiejiari/index`

## 📁 新增/修改文件

### 新增文件
1. **`src/utils/request.js`** - API请求封装工具
   - `tianxingRequest()` - 天行数据API通用请求函数
   - `fetchAlmanacAPI()` - 黄历接口请求
   - `fetchHolidayAPI()` - 节假日接口请求

2. **`src/utils/cache.js`** - 缓存管理工具
   - 黄历数据缓存 24 小时
   - 节假日数据缓存 7 天
   - 自动过期清理机制

### 修改文件
1. **`src/services/almanac.js`** - 黄历服务层
   - 集成真实API调用
   - 数据格式转换适配
   - 缓存优先策略
   - 失败降级到 Mock 数据

2. **`src/services/holiday.js`** - 节假日服务层
   - 集成真实API调用
   - 数据格式转换适配
   - 缓存优先策略
   - 失败降级到 Mock 数据

## 🔄 数据流程

### 黄历数据流程
```
用户请求 → 检查缓存 → 有缓存返回 → 无缓存调用API → 数据转换 → 存入缓存 → 返回结果
                                    ↓ (API失败)
                               使用Mock数据
```

### 节假日数据流程
```
用户请求 → 检查缓存 → 有缓存返回 → 无缓存调用API → 数据转换 → 计算倒数 → 存入缓存 → 返回结果
                                    ↓ (API失败)
                               使用Mock数据
```

## 📊 数据转换说明

### 黄历API数据映射

| 天行API字段 | 应用字段 | 说明 |
|------------|---------|------|
| gregoriandate | date | 公历日期 |
| lunardate | lunar | 农历日期 |
| tiangandizhiyear | yearPillar | 天干地支年 |
| tiangandizhimonth | monthPillar | 天干地支月 |
| tiangandizhiday | dayPillar | 天干地支日 |
| fitness | yi | 宜（以点号分隔） |
| taboo | ji | 忌（以点号分隔） |
| shenwei | jiShen | 神位信息 |
| chongsha | chongSha | 冲煞 |
| pengzu | pengZu | 彭祖百忌 |

### 节假日API数据映射

| 天行API字段 | 应用字段 | 说明 |
|------------|---------|------|
| name | name | 节假日名称 |
| vacation | startDate/endDate | 假期日期数组 |
| remark | workDay | 调休日数组 |
| tip | note | 放假提示 |
| rest | rest | 拼假建议 |

## 🎯 主要功能特性

### 1. 智能缓存机制
- **黄历数据**: 缓存 24 小时
- **节假日数据**: 缓存 7 天
- 自动检测缓存过期并清理
- 减少API调用，提升性能

### 2. 降级策略
- API调用失败时自动使用 Mock 数据
- 保证应用始终可用
- 错误日志记录便于排查

### 3. 数据转换
- 将天行API数据格式转换为应用所需格式
- 保持与原有Mock数据结构一致
- 无需修改UI组件代码

### 4. 错误处理
- HTTP错误捕获
- 业务错误码处理
- 详细的控制台日志输出

## 🧪 测试建议

### 黄历功能测试
1. 访问首页，查看"今日黄历"卡片
2. 进入黄历详情页，查看完整信息
3. 切换日期，验证不同日期数据

### 节假日功能测试
1. 访问节假日页面
2. 查看下一个节假日倒数
3. 查看全年节假日列表
4. 验证调休日显示

### 缓存测试
1. 首次请求观察网络调用
2. 再次请求同一数据，应使用缓存
3. 检查控制台缓存日志

### 降级测试
1. 关闭网络连接
2. 验证是否使用Mock数据
3. 检查错误日志输出

## 📱 运行方式

### 开发模式
```bash
# 微信小程序
npm run dev:weapp

# H5
npm run dev:h5
```

### 构建生产版本
```bash
# 微信小程序
npm run build:weapp

# H5
npm run build:h5
```

## 🔍 调试技巧

### 查看API请求日志
打开微信开发者工具控制台，筛选包含以下关键词的日志：
- `🌐 天行数据API请求:` - API请求信息
- `📥 天行数据API响应:` - API响应数据
- `📦 使用黄历缓存数据:` - 使用缓存
- `❌ 天行数据API请求失败:` - API错误

### 清除缓存
在控制台执行：
```javascript
import { clearAllCache } from '@/utils/cache'
clearAllCache()
```

## ⚠️ 注意事项

1. **API配额限制**
   - 普通会员: 100次/天
   - 合理使用缓存机制可大幅减少调用次数

2. **网络环境**
   - 小程序需要在微信公众平台配置服务器域名白名单
   - 域名: `apis.tianapi.com`

3. **数据更新**
   - 黄历数据每24小时自动更新
   - 节假日数据每7天自动更新
   - 可手动清除缓存强制刷新

4. **错误处理**
   - API失败会自动降级到Mock数据
   - 不影响用户正常使用
   - 建议监控错误日志

## 🚀 后续优化建议

1. **添加加载状态**
   - 在API请求时显示加载动画
   - 提升用户体验

2. **下拉刷新**
   - 允许用户手动刷新数据
   - 清除缓存重新获取

3. **离线支持**
   - 增强离线数据存储
   - 更长的缓存时间

4. **数据预加载**
   - 在应用启动时预加载常用数据
   - 提升首屏加载速度

## 📞 技术支持

- 天行数据官网: https://www.tianapi.com
- API文档: 
  - 黄历: https://www.tianapi.com/apiview/45-1
  - 节假日: https://www.tianapi.com/apiview/139

---

**实施完成时间**: 2025-12-01
**版本**: v1.0.0
