import { sendGAEvent } from '@next/third-parties/google'

// Google Analytics 事件跟踪
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    sendGAEvent('event', eventName, {
      ...parameters,
      event_timestamp: Date.now()
    })
  }
}

// 预定义的事件类型
export const analytics = {
  // 页面浏览事件
  pageView: (page: string) => {
    trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page: page
    })
  },

  // 图片上传事件
  imageUpload: (fileSize: number, fileType: string) => {
    trackEvent('image_upload', {
      file_size: fileSize,
      file_type: fileType,
      category: 'engagement'
    })
  },

  // 图片处理事件
  imageProcess: (processingTime: number, success: boolean) => {
    trackEvent('image_process', {
      processing_time: processingTime,
      success: success,
      category: 'conversion'
    })
  },

  // 图片下载事件
  imageDownload: () => {
    trackEvent('image_download', {
      category: 'engagement'
    })
  },

  // 语言切换事件
  languageChange: (from: string, to: string) => {
    trackEvent('language_change', {
      from_language: from,
      to_language: to,
      category: 'user_preference'
    })
  },

  // 错误事件
  error: (errorType: string, errorMessage: string) => {
    trackEvent('error', {
      error_type: errorType,
      error_message: errorMessage,
      category: 'error'
    })
  },

  // 联系表单提交
  contactSubmit: (success: boolean) => {
    trackEvent('contact_submit', {
      success: success,
      category: 'lead'
    })
  },

  // 按钮点击事件
  buttonClick: (buttonName: string, location: string) => {
    trackEvent('button_click', {
      button_name: buttonName,
      click_location: location,
      category: 'engagement'
    })
  }
} 