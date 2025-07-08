# Vercel 部署指南

## 1. 准备部署

确保你已经完成了Supabase的设置（参考 `SUPABASE_SETUP.md`）

## 2. 连接到Vercel

### 方法一：通过GitHub自动部署
1. 将代码推送到GitHub仓库
2. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
3. 点击 "New Project"
4. 选择你的GitHub仓库
5. Vercel会自动检测这是一个Next.js项目

### 方法二：使用Vercel CLI
```bash
# 安装Vercel CLI
npm install -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel
```

## 3. 配置环境变量

在Vercel Dashboard中配置以下环境变量：

### 生产环境变量
1. 进入项目设置 -> Environment Variables
2. 添加以下变量：

```
NEXT_PUBLIC_SUPABASE_URL=你的supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的supabase匿名密钥
SUPABASE_SERVICE_ROLE_KEY=你的supabase服务角色密钥
```

### 环境配置说明
- `NEXT_PUBLIC_` 前缀的变量会暴露给客户端
- `SUPABASE_SERVICE_ROLE_KEY` 只在服务器端使用，保持安全

## 4. 部署配置优化

项目已包含 `vercel.json` 配置文件，包含以下优化：

- **函数超时**: 设置为30秒
- **区域配置**: 优先使用亚洲和美国西海岸区域
- **CORS头**: 自动配置API跨域访问

## 5. 部署后测试

1. 访问你的Vercel部署URL
2. 测试联系表单功能
3. 检查Supabase数据库中是否有新记录

## 6. 自定义域名（可选）

1. 在Vercel Dashboard中进入项目设置
2. 选择 "Domains"
3. 添加你的自定义域名
4. 配置DNS记录指向Vercel

## 7. 监控和日志

### 查看函数日志
1. Vercel Dashboard -> 项目 -> Functions 标签
2. 点击 `/api/contact` 查看执行日志

### 错误监控
Vercel自动提供：
- 函数执行时间监控
- 错误率统计
- 性能指标

## 8. 常见问题

### 环境变量不生效
- 确保在Vercel Dashboard中正确设置了环境变量
- 重新部署项目以应用新的环境变量

### API超时
- 检查Supabase连接是否正常
- 确认网络连接稳定
- 查看Vercel函数日志

### CORS错误
- 项目已配置CORS头
- 如果仍有问题，检查 `vercel.json` 配置

## 9. 生产环境最佳实践

### 安全性
- 定期轮换Supabase API密钥
- 监控API使用情况
- 启用Supabase行级安全性

### 性能
- 利用Vercel的边缘网络
- 监控函数执行时间
- 考虑添加数据库连接池（如果需要）

### 维护
- 定期检查依赖更新
- 监控Vercel和Supabase的服务状态
- 备份重要数据 