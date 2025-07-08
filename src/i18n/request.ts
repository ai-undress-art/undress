import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // 1. 优先使用 URL 中指定的语言
  let locale = await requestLocale;
  
  // 2. 如果没有有效的语言代码，回退到默认语言（英文）
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
}); 