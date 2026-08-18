'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/') || `/${newLocale}`;
    router.push(newPath);
  };

  const navLinks = [
    { name: t('home'), href: `/${locale}` },
    { name: t('catalog'), href: `/${locale}/catalog` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Corporativo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3 group">
            <div className="relative h-12 w-12 flex-shrink-0 transition-transform group-hover:scale-105">
              <Image
                src="/Logo-NMS.png"
                alt="North Maritime Services Logo"
                fill
                priority
                sizes="48px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg leading-none">
                NORTH MARITIME SERVICES
              </span>
              <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mt-1">
                {locale === 'es' ? 'Antofagasta y Mejillones' : 'Antofagasta & Mejillones'}
              </span>
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors ${
                    isActive 
                      ? 'text-blue-600 font-bold' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Selector de Idiomas */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => switchLocale('es')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  locale === 'es'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => switchLocale('en')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  locale === 'en'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Botón Menú Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => switchLocale('es')}
                className={`px-2 py-1 text-xs font-bold rounded-lg ${
                  locale === 'es' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => switchLocale('en')}
                className={`px-2 py-1 text-xs font-bold rounded-lg ${
                  locale === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl p-2.5 text-slate-700 hover:bg-slate-100"
              aria-label="Abrir Menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Menú Desplegable Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block rounded-xl px-4 py-2.5 text-base font-semibold transition-colors ${
                pathname === link.href
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}