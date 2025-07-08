'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import { useEffect } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function GoogleAnalyticsProvider() {
  useEffect(() => {
    // 只在生产环境中启用
    if (process.env.NODE_ENV === 'production' && GA_MEASUREMENT_ID) {
      console.log('Google Analytics initialized with ID:', GA_MEASUREMENT_ID)
    }
  }, [])

  // 只在生产环境且有GA ID时渲染
  if (process.env.NODE_ENV !== 'production' || !GA_MEASUREMENT_ID) {
    return null
  }

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
} 