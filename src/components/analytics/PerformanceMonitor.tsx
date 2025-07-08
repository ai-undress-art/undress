'use client'

import { useEffect } from 'react'
import { reportWebVitals } from '@/app/web-vitals'

export default function PerformanceMonitor() {
  useEffect(() => {
    // 初始化Web Vitals监控
    reportWebVitals()

    // 监控页面加载性能
    if (typeof window !== 'undefined') {
      // 页面加载完成后记录性能指标
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const paintEntries = performance.getEntriesByType('paint')
        
        const performanceData = {
          // 页面加载时间
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          // DOM内容加载时间
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          // 首次内容绘制
          firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
          // 最大内容绘制
          largestContentfulPaint: paintEntries.find(entry => entry.name === 'largest-contentful-paint')?.startTime || 0,
          // 网络延迟
          networkLatency: navigation.responseStart - navigation.requestStart,
          // 服务器响应时间
          serverResponseTime: navigation.responseEnd - navigation.responseStart,
          // 页面大小
          transferSize: navigation.transferSize,
          // 连接类型
          connectionType: (navigator as any).connection?.effectiveType || 'unknown',
          // 设备内存
          deviceMemory: (navigator as any).deviceMemory || 'unknown',
          // 用户代理
          userAgent: navigator.userAgent,
          // 页面URL
          url: window.location.href,
          // 时间戳
          timestamp: Date.now(),
        }

        // 发送性能数据到分析服务
        fetch('/api/performance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(performanceData),
        }).catch(console.error)
      })

      // 监控页面可见性变化
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          // 页面隐藏时记录会话时间
          const sessionData = {
            type: 'session_end',
            duration: performance.now(),
            url: window.location.href,
            timestamp: Date.now(),
          }

          // 使用sendBeacon确保数据发送
          if (navigator.sendBeacon) {
            navigator.sendBeacon('/api/analytics', JSON.stringify(sessionData))
          }
        }
      })

      // 监控错误
      window.addEventListener('error', (event) => {
        const errorData = {
          type: 'javascript_error',
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error?.stack,
          url: window.location.href,
          timestamp: Date.now(),
        }

        fetch('/api/errors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(errorData),
        }).catch(console.error)
      })

      // 监控未处理的Promise拒绝
      window.addEventListener('unhandledrejection', (event) => {
        const errorData = {
          type: 'unhandled_promise_rejection',
          reason: event.reason?.toString(),
          url: window.location.href,
          timestamp: Date.now(),
        }

        fetch('/api/errors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(errorData),
        }).catch(console.error)
      })
    }
  }, [])

  return null // 这是一个无渲染组件
} 