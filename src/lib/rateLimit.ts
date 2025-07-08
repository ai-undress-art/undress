// 简单的内存速率限制器
const requests = new Map<string, number[]>()

export function rateLimit(ip: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now()
  const windowStart = now - windowMs
  
  // 获取该IP的请求记录
  const ipRequests = requests.get(ip) || []
  
  // 过滤掉超出时间窗口的请求
  const recentRequests = ipRequests.filter(time => time > windowStart)
  
  // 检查是否超过限制
  if (recentRequests.length >= limit) {
    return false
  }
  
  // 添加当前请求时间
  recentRequests.push(now)
  requests.set(ip, recentRequests)
  
  // 清理旧的记录以防止内存泄漏
  if (requests.size > 1000) {
    const cutoff = now - windowMs * 2
    for (const [key, times] of Array.from(requests.entries())) {
      const validTimes = times.filter((time: number) => time > cutoff)
      if (validTimes.length === 0) {
        requests.delete(key)
      } else {
        requests.set(key, validTimes)
      }
    }
  }
  
  return true
} 