# 天行 API 密钥注入方案对比

## 方案 A：编译期环境变量注入（无后端最简）
- 适用：需要立即去掉硬编码且无后端/函数能力，接受客户端可被反编译/抓包的风险。
- 步骤
  1. 新增 `.env.development`、`.env.production`（加入 `.gitignore`）写入：`TARO_APP_TIANXING_KEY=xxxx`。
  2. 在 `config/index.js` 的 `defineConstants` 注入：`'process.env.TARO_APP_TIANXING_KEY': JSON.stringify(process.env.TARO_APP_TIANXING_KEY)`。
  3. `src/config/api.js` 读取：
     ```js
     const TIANXING_API_KEY = process.env.TARO_APP_TIANXING_KEY;
     if (!TIANXING_API_KEY) throw new Error('Missing TARO_APP_TIANXING_KEY');
     ```
  4. 构建/验证：`npm run dev:weapp`、`npm run build:weapp`，抓包确认请求不再带明文硬编码；`rg "TARO_APP_TIANXING_KEY"` 确认仅在注入处出现。
- 优点：改动最少，不需要额外服务；Key 不再出现在仓库/提交记录中。
- 风险/注意：Key 仍随包下发，抓包可见；需在天行后台设置域名白名单、QPS/日限额、告警，定期轮换 Key。

## 方案 B：托管式 KV/配置服务注入（更易运维）
- 适用：有平台级配置中心/远程配置（如微信小程序远程配置、腾讯云/阿里云应用配置、Vercel/Cloudflare 环境变量）可用，但暂不搭建代理。
- 步骤
  1. 在配置服务创建条目 `TIANXING_API_KEY`，限制读取范围（APPID、环境、密钥访问权限），开启审计与阈值告警。
  2. CI/CD 构建时从配置服务读取该值并注入 `TARO_APP_TIANXING_KEY` 环境变量，继续使用方案 A 的 `defineConstants` 方式带入前端代码。
  3. 如使用“远程配置下发”（平台提供 SDK），启动时拉取配置，再写入全局单例，但要考虑缓存与超时；仍需避免在日志中输出完整值。
- 优点：密钥不出现在本地文件和仓库，轮换/吊销集中化；CI 可一键切换，不用改代码。
- 风险/注意：仍是客户端直连，抓包可见；配置服务若读权限过宽会增加泄露面。远程配置需考虑失效兜底（如默认拒绝调用并提示配置缺失）。

## 选择建议
- 快速止血且无额外服务：选方案 A，并配合白名单/限流/告警/轮换。
- 需要团队化运维与审计、但暂时无代理：选方案 B（集中管理密钥），未来再迁移到云函数代理以真正隐藏 Key。
