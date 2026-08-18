import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Esta línea es crucial: le dice al middleware que solo actúe en la raíz y en las rutas de los idiomas
  matcher: ['/', '/(es|en)/:path*']
};