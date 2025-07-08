import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware({
  ...routing,
  // 默认语言（如果检测不到支持的语言则使用）
  defaultLocale: 'en',
  // 启用语言检测
  localeDetection: true,
  // 当 URL 中没有语言前缀时，基于 Accept-Language 头进行重定向
  localePrefix: 'as-needed',
  // 可选：自定义语言检测逻辑
  alternateLinks: false
});

export const config = {
  // 匹配所有路径，除了api、_next等内部路径和静态资源
  matcher: [
    // 匹配所有请求路径，除了以下开头的：
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - images (static images)
    // - robots.txt, sitemap.xml 等 SEO 文件
    '/((?!api|_next/static|_next/image|favicon.ico|images|robots.txt|sitemap|manifest).*)',
  ]
}; 