-- 创建联系表单提交表
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address VARCHAR(45),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_submissions(submitted_at);

-- 创建触发器以自动更新 updated_at 字段
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_submissions_updated_at 
    BEFORE UPDATE ON contact_submissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 启用行级安全性（RLS）
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 创建策略：只允许服务角色插入和查看数据
CREATE POLICY "Enable insert for service role only" ON contact_submissions
    FOR INSERT 
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Enable read for service role only" ON contact_submissions
    FOR SELECT 
    USING (auth.role() = 'service_role');

-- 给表添加注释
COMMENT ON TABLE contact_submissions IS '联系表单提交记录表';
COMMENT ON COLUMN contact_submissions.id IS '主键UUID';
COMMENT ON COLUMN contact_submissions.name IS '联系人姓名';
COMMENT ON COLUMN contact_submissions.email IS '联系人邮箱';
COMMENT ON COLUMN contact_submissions.subject IS '消息主题';
COMMENT ON COLUMN contact_submissions.message IS '消息内容';
COMMENT ON COLUMN contact_submissions.submitted_at IS '提交时间';
COMMENT ON COLUMN contact_submissions.ip_address IS '提交者IP地址'; 