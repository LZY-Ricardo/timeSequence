# Repository Guidelines

## 项目结构与模块组织
- 核心代码：`src/`（`pages/` 页面路由，`components/` 复用组件，`services/` API 封装，`utils/` 通用工具，`styles/` 全局样式，`assets/` 静态资源）。
- 配置：`src/config/` 按环境的 Taro 配置，`app.config.js` 统一页面/分包注册。
- 规格文档与验收：`specs/1-timesequence-miniapp/` 需求、计划与检查清单；发布产物位于 `dist/`。
- WeChat 开发者配置：`project.config.json`；构建模板信息见 `package.json`。

## 构建、开发与本地运行
- 安装：`pnpm install`（有 `pnpm-lock.yaml`，保持锁定版本）。
- 开发：`npm run dev:weapp`（默认微信小程序热更新）；H5 调试用 `npm run dev:h5`。
- 构建：`npm run build:weapp` 或 `npm run build:h5` 输出到 `dist/`；其他端按需使用 `build:*` 脚本。
- 运行 Taro CLI：如需自定义，使用 `npx taro --help` 查看平台参数。

## 编码风格与命名
- 缩进 2 空格、UTF-8、行尾换行，`.editorconfig` 已定义；Markdown 允许尾随空格。
- ESLint 继承 `taro/react`，已关闭 React 17 时代的 JSX 导入要求；推荐 `npx eslint src --ext .js,.jsx` 自查。
- 组件/页面文件用帕斯卡命名（`CountdownPanel.jsx`），函数与变量用驼峰，Sass 类名建议 BEM。
- 保持无副作用的 `services/` 调用与纯函数 `utils/` 复用，页面内逻辑分层清晰。

## 测试与质量
- 现有自动化较少，优先补充单测可用 `@tarojs/test-utils-react`；文件命名 `*.test.jsx` 置于同目录或 `__tests__/`。
- 手动验收：对照 `specs/.../checklists`，在微信开发者工具/浏览器分别验证主要流（首页、倒数日、农历/黄历、假期）。
- 构建前确保 ESLint 通过，必要时添加截图或录屏验证交互。

## 提交与 PR
- 提交格式遵循 Git 历史：`<type>(scope): message`，类型常用 `feat|fix|docs|style|chore`，允许中文描述。
- PR 需包含：变更摘要、关联需求/问题编号、影响范围、测试或验收结果（命令输出/截图）、如改动样式附对比图。
- 若涉及配置或 API Key，使用环境变量文件且勿提交；更新后同步说明到团队。
