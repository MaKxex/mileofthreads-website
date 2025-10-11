import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from '@/i18n';
import {routing} from './i18n/routing';
import createMiddleware from 'next-intl/middleware';

// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   // Check if the pathname is missing a locale
//   const pathnameIsMissingLocale = i18n.locales.every(
//     (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
//   );

//   if (pathnameIsMissingLocale) {
//     // Get the preferred locale from the Accept-Language header
//     const preferredLocale = request.headers.get('accept-language')?.split(',')[0].split('-')[0];
//     const locale = i18n.locales.includes(preferredLocale as any) ? preferredLocale : i18n.defaultLocale;

//     return NextResponse.redirect(
//       new URL(`/${locale}${pathname}`, request.url)
//     );
//   }
// }

export default createMiddleware(routing);

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - sitemap.xml (sitemap file)
     * - robots.txt (robots file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.webp$|robots.txt|sitemap.xml|sitemap-.*\\.xml).*)',
  ],
};
