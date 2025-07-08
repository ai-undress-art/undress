# Google Analytics 4 (GA4) 设置指南

## 📊 概述

本项目已集成了 Google Analytics 4，使用 Next.js 官方的 `@next/third-parties` 包，提供优化的性能和易用性。

## 🛠️ 安装和配置

### 1. 创建 Google Analytics 属性

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建新账户或选择现有账户
3. 创建新的 GA4 属性
4. 获取您的测量 ID（格式：G-XXXXXXXXXX）

### 2. 配置环境变量

在项目根目录创建 `.env.local` 文件并添加：

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**注意：** 将 `G-XXXXXXXXXX` 替换为您的实际测量 ID。

### 2.1 Content Security Policy (CSP) 配置

项目已经在 `next.config.js` 中配置了正确的 CSP 头部，允许 Google Analytics 脚本加载：

```javascript
"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com"
"connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://region1.google-analytics.com"
"img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com"
```

这解决了 `Refused to load the script` 的 CSP 错误。

### 3. 验证集成

1. 启动开发服务器：`npm run dev`
2. 在生产环境构建：`npm run build && npm start`
3. 使用 Google Analytics 调试工具或浏览器开发者工具验证事件发送

## 📈 已集成的事件跟踪

### 自动跟踪的事件

- **页面浏览量**：自动跟踪路由变化
- **图片上传**：跟踪文件大小和类型
- **图片处理**：跟踪处理时间和成功率
- **图片下载**：跟踪下载次数
- **语言切换**：跟踪用户语言偏好
- **联系表单提交**：跟踪表单提交成功率
- **错误事件**：跟踪应用错误

### 自定义事件示例

```typescript
import { analytics } from '@/lib/analytics'

// 发送自定义事件
analytics.buttonClick('hero-cta', 'homepage')

// 发送错误事件
analytics.error('payment_failed', 'Insufficient funds')

// 发送页面浏览事件
analytics.pageView('/special-page')
```

## 🎯 在 Google Analytics 中查看数据

### 实时报告
- 转到 Analytics > 实时 > 概览
- 查看当前活跃用户和实时事件

### 事件报告
- 转到 Analytics > 报告 > 参与度 > 事件
- 查看自定义事件数据

### 转化跟踪
- 转到 Analytics > 配置 > 转化
- 将重要事件标记为转化目标

## 🔧 高级配置

### 1. 增强型电子商务（如需要）

如果您的应用涉及电子商务，可以添加更多事件：

```typescript
// 购买事件
analytics.trackEvent('purchase', {
  transaction_id: 'T12345',
  value: 25.25,
  currency: 'USD',
  items: [{
    item_id: 'SKU123',
    item_name: 'AI Image Processing',
    category: 'Digital Service',
    quantity: 1,
    price: 25.25
  }]
})
```

### 2. 用户属性

```typescript
// 设置用户属性
analytics.trackEvent('set_user_properties', {
  user_type: 'premium',
  preferred_language: 'zh'
})
```

### 3. 自定义维度

在 GA4 中设置自定义维度来跟踪特定的业务指标。

## 🛡️ 隐私和合规性

### GDPR 合规性

如果您需要 GDPR 合规性，请考虑：

1. 添加 Cookie 同意横幅
2. 只有在用户同意后才加载 GA
3. 提供数据删除选项

### Cookie 同意实现示例

```typescript
// 条件加载 GA
if (cookieConsent === 'accepted') {
  return <GoogleAnalyticsProvider />
}
```

## 📱 测试和调试

### 1. 开发环境调试

- 在开发环境中，GA 不会加载以避免测试数据污染
- 使用 `console.log` 查看事件是否被触发

### 2. 生产环境测试

- 使用 Google Analytics DebugView
- 安装 Google Analytics Debugger 浏览器扩展
- 检查网络标签页中的 GA 请求

### 3. 实时验证

- 在 GA4 实时报告中查看事件
- 使用 GA4 的测试环境进行验证

## 📊 报告和分析

### 关键指标仪表板

建议跟踪的 KPI：

1. **用户参与度**
   - 图片上传次数
   - 处理成功率
   - 平均处理时间

2. **用户行为**
   - 页面停留时间
   - 跳出率
   - 转化漏斗

3. **技术性能**
   - 错误率
   - API 响应时间
   - 用户设备和浏览器分布

### 自定义报告

1. 创建自定义仪表板
2. 设置定期报告
3. 配置异常检测

## 🔄 维护和更新

### 定期检查

1. 验证事件仍在发送
2. 检查新功能的跟踪需求
3. 更新事件参数以获得更好的洞察

### 版本控制

- 记录对跟踪代码的更改
- 在部署前测试新的跟踪代码
- 使用 GA4 的版本控制功能

## 📞 支持和故障排除

### 常见问题

1. **CSP 错误：Refused to load the script**
   - **错误消息**：`Refused to load the script 'https://www.googletagmanager.com/gtag/js' because it violates the following Content Security Policy directive`
   - **解决方案**：项目已在 `next.config.js` 中配置了正确的 CSP，允许 Google Analytics 域名
   - **验证**：检查浏览器开发者工具的网络标签，确认 GA 脚本正在加载

2. **事件未显示**
   - 检查测量 ID 是否正确
   - 确认在生产环境中运行
   - 验证网络请求是否发送

3. **开发环境中的事件**
   - GA 在开发环境中被禁用
   - 使用控制台日志进行调试

4. **实时数据延迟**
   - GA4 实时数据可能有 5-10 分钟延迟
   - 标准报告可能需要 24-48 小时

### 获取帮助

- [Google Analytics 帮助中心](https://support.google.com/analytics)
- [GA4 开发者文档](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js 第三方库文档](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries)

---

通过正确配置和使用 Google Analytics，您可以获得有价值的用户行为洞察，帮助改进产品和用户体验。 