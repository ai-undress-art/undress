import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({

  locales: ['am', 'ar', 'bn', 'de', 'en', 'es', 'fa', 'fr', 'hi', 'id', 'ja', 'ko', 'pt', 'ru', 'th', 'tl', 'tr', 'ur', 'vi', 'zh'],
  defaultLocale: 'en',
  // 启用基于 Accept-Language 头的语言检测
  localeDetection: true,
  // 可选：配置语言检测的来源
  localePrefix: 'as-needed'
});

export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing); 