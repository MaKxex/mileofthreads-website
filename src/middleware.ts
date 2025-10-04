// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { i18n } from '@/i18n';
// import {routing} from './i18n/routing';
// import createMiddleware from 'next-intl/middleware';

// CSP Headers
// const cspHeader = {
//   'Content-Security-Policy': `
//     default-src 'self';
//     script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google-analytics.com *.googletagmanager.com https://challenges.cloudflare.com;
//     style-src 'self' 'unsafe-inline';
//     img-src 'self' data: blob: ${process.env.NEXT_PUBLIC_STRAPI_URL || 'https://localhost:1337'} *.google-analytics.com;
//     font-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     form-action 'self';
//     frame-ancestors 'none';
//     frame-src https://challenges.cloudflare.com;
//     connect-src 'self' ${process.env.NEXT_PUBLIC_STRAPI_URL || 'https://localhost:1337'} *.google-analytics.com;
//     upgrade-insecure-requests;
//   `.replace(/\s{2,}/g, ' ').trim()
// };

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

// const intlMiddleware = createMiddleware(routing);

// export default async function middleware(request: NextRequest) {
//   // Get response from intl middleware
//   const response = await intlMiddleware(request);

//   // Add CORS headers for API routes
//   if (request.nextUrl.pathname.startsWith('/api')) {
//     response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || '*');
//     response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     response.headers.set('Access-Control-Max-Age', '86400');

//     // Handle preflight requests
//     if (request.method === 'OPTIONS') {
//       return new NextResponse(null, { headers: response.headers });
//     }
//   }

//   // Add CSP headers
//   Object.entries(cspHeader).forEach(([key, value]) => {
//     response.headers.set(key, value);
//   });

//   return response;
// }

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
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.webp$|robots.txt|sitemap.xml).*)',
  ],
};
