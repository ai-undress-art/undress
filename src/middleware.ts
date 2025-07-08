import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 匹配所有路径，除了api、_next等内部路径和静态资源
  matcher: [
    // 匹配所有请求路径，除了以下开头的：
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - images (static images)
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ]
}; 