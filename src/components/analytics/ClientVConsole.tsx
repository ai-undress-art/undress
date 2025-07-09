'use client'
import { useEffect } from 'react'

export default function ClientVConsole() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // 动态引入，避免 SSR 报错
      import('vconsole').then(({ default: VConsole }) => {
        const vConsole = new VConsole({ theme: 'dark' })
        console.log('vConsole', vConsole)
      })
    }
  }, [])
  return null
} 