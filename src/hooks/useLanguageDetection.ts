'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

type SupportedLocale = typeof routing.locales[number];

export function useLanguageDetection() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 只在客户端运行
    if (typeof window === 'undefined') return;

    // 检查是否已经检测过语言
    const hasDetected = localStorage.getItem('language-detected');
    if (hasDetected) return;

    // 获取浏览器首选语言
    const detectBrowserLanguage = (): SupportedLocale => {
      const browserLanguages = navigator.languages || [navigator.language];
      
      for (const browserLang of browserLanguages) {
        // 提取主要语言代码（例如 'zh-CN' -> 'zh'）
        const langCode = browserLang.split('-')[0].toLowerCase();
        
        // 检查是否为支持的语言
        if (routing.locales.includes(langCode as SupportedLocale)) {
          return langCode as SupportedLocale;
        }
      }
      
      // 如果没有匹配的语言，返回默认语言
      return routing.defaultLocale;
    };

    const detectedLanguage = detectBrowserLanguage();
    
    // 如果检测到的语言与当前语言不同，进行重定向
    if (detectedLanguage !== currentLocale) {
      // 标记已检测，避免重复检测
      localStorage.setItem('language-detected', 'true');
      localStorage.setItem('user-preferred-language', detectedLanguage);
      
      // 重定向到检测到的语言版本
      router.replace(pathname, { locale: detectedLanguage });
    } else {
      // 即使语言相同，也标记已检测
      localStorage.setItem('language-detected', 'true');
      localStorage.setItem('user-preferred-language', currentLocale);
    }
  }, [currentLocale, router, pathname]);

  // 提供手动重置检测的方法
  const resetLanguageDetection = () => {
    localStorage.removeItem('language-detected');
    localStorage.removeItem('user-preferred-language');
  };

  return { resetLanguageDetection };
} 