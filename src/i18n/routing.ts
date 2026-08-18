import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // Tus idiomas disponibles
  locales: ['en', 'es'],
  // El idioma por defecto si el usuario entra a la raíz '/'
  defaultLocale: 'en' 
});

// ¡ESTA ES LA LÍNEA CLAVE QUE FALTABA!
// Genera y exporta los componentes de navegación envueltos con tu configuración de idiomas
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);