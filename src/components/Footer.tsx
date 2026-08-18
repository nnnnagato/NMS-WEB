import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Footer({ locale }: { locale: string }) {
  const tNavbar = useTranslations('Navbar');
  const tFooter = useTranslations('Footer');

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* 1. Identidad Corporativa */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center space-x-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/Logo-NMS.png"
                  alt="North Maritime Services Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                NORTH MARITIME SERVICES
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              {tFooter('tagline')}
            </p>
            <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-semibold text-blue-400 border border-blue-500/20">
              {locale === 'es' ? 'Disponibilidad Operativa 24/7' : '24/7 Operational Support'}
            </span>
          </div>

          {/* 2. Enlaces Rápidos */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {tFooter('quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={`/${locale}`} className="hover:text-blue-400 transition-colors">
                  {tNavbar('home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/catalog`} className="hover:text-blue-400 transition-colors">
                  {tNavbar('catalog')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-blue-400 transition-colors">
                  {tNavbar('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Líneas de Servicio */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {tFooter('servicesTitle')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>{tFooter('service1')}</li>
              <li>{tFooter('service2')}</li>
              <li>{tFooter('service3')}</li>
              <li>{tFooter('service4')}</li>
            </ul>
          </div>

          {/* 4. Contacto y Base */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {tFooter('contactTitle')}
            </h4>
            <div className="space-y-2.5 text-xs">
              <p className="text-slate-300 font-medium">North Maritime Services SpA</p>
              <p className="text-slate-400">{tFooter('location')}</p>
              <p className="text-blue-400 font-semibold break-all">commercial@northmaritimeservices.com</p>
            </div>
          </div>

        </div>

        {/* Barra Inferior */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} North Maritime Services SpA. {tFooter('rights')}</p>
          <div className="flex space-x-6">
            <span>{locale === 'es' ? 'Antofagasta y Mejillones • Chile' : 'Antofagasta & Mejillones • Chile'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}