# Supabase 联系表单设置指南

## 1. 创建Supabase项目

1. 访问 [Supabase](https://supabase.com/) 并创建一个新项目
2. 等待项目初始化完成

## 2. 设置数据库表

1. 在Supabase控制台中，进入 "SQL Editor"
2. 运行项目根目录下的 `supabase_setup.sql` 文件中的SQL语句
3. 这将创建 `contact_submissions` 表以及相关的索引和安全策略

## 3. 获取API密钥

在Supabase项目设置中找到以下信息：

1. **Project URL**: 在 Settings -> API 中找到
2. **Anon Key**: 在 Settings -> API 中找到（public anon key）
3. **Service Role Key**: 在 Settings -> API 中找到（service_role secret key）

## 4. 配置环境变量

创建 `.env.local` 文件在项目根目录，添加以下内容：

```env
# Supabase配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

将 `your_supabase_project_url`、`your_supabase_anon_key` 和 `your_supabase_service_role_key` 替换为从Supabase控制台获取的实际值。

## 5. 测试设置

1. 重启开发服务器：`npm run dev`
2. 访问联系页面并提交表单
3. 在Supabase控制台的 "Table Editor" 中检查 `contact_submissions` 表是否有新记录

## 6. 数据库表结构

`contact_submissions` 表包含以下字段：

- `id`: UUID主键，自动生成
- `name`: 联系人姓名
- `email`: 联系人邮箱
- `subject`: 消息主题
- `message`: 消息内容
- `submitted_at`: 提交时间
- `ip_address`: 提交者IP地址
- `created_at`: 记录创建时间
- `updated_at`: 记录更新时间

## 7. 安全性

- 表启用了行级安全性（RLS）
- 只有service role可以插入和查看数据
- 敏感的service role密钥仅在服务器端使用

## 8. 可选：邮件通知

如果需要在收到新联系时发送邮件通知，可以：

1. 集成邮件服务（如SendGrid、Resend等）
2. 在API路由中添加邮件发送逻辑
3. 或者使用Supabase的Edge Functions创建数据库触发器 