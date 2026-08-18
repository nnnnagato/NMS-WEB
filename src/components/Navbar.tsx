'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const isEs = locale === 'es';

  const headerRef = useRef<HTMLElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const navCenterRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '+=100',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        headerRef.current,
        {
          height: 64,
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
          borderBottomColor: 'rgba(226, 232, 240, 0.9)',
          ease: 'none',
        },
        0
      )
      .to(
        logoContainerRef.current,
        {
          scale: 0.58,
          transformOrigin: 'center center',
          ease: 'none',
        },
        0
      )
      .to(
        navCenterRef.current,
        {
          scale: 0.95,
          ease: 'none',
        },
        0
      );
    },
    { scope: headerRef }
  );

  const getLanguagePath = (targetLocale: string) => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split('/');
    segments[1] = targetLocale;
    return segments.join('/') || `/${targetLocale}`;
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 h-28 bg-white border-b border-slate-200 transition-colors will-change-transform"
    >
      <div className="relative w-full h-full px-8 lg:px-16 flex items-center justify-between">
        
        {/* ISOTIPO ANCLADO EN LA LÍNEA DE CORTE */}
        <div
          ref={logoContainerRef}
          className="absolute left-8 lg:left-16 top-full -translate-y-1/2 z-50 will-change-transform pointer-events-auto"
        >
          <Link
            href={`/${locale}`}
            className="block relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 drop-shadow-xl hover:scale-105 transition-transform duration-200"
          >
            <Image
              src="/Isotipo-NMS.png"
              alt="North Maritime Services Isotipo"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* ESPACIO DE RESERVA IZQUIERDO */}
        <div className="w-24 sm:w-32 lg:w-40 shrink-0" />

        {/* ENLACES DE NAVEGACIÓN EN EL CENTRO EXACTO CON DISTRIBUCIÓN AMPLIA */}
        <nav
          ref={navCenterRef}
          className="hidden md:flex items-center gap-10 lg:gap-14"
        >
          <Link
            href={`/${locale}`}
            className={`font-bold text-sm lg:text-base transition-all duration-200 relative py-1.5 ${
              pathname === `/${locale}`
                ? 'text-blue-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-700'
                : 'text-slate-700 hover:text-blue-700'
            }`}
          >
            {isEs ? 'Inicio' : 'Home'}
          </Link>

          <Link
            href={`/${locale}#nosotros`}
            className="font-bold text-sm lg:text-base text-slate-700 hover:text-blue-700 transition-all duration-200 relative py-1.5"
          >
            {isEs ? 'Nosotros' : 'About Us'}
          </Link>

          <Link
            href={`/${locale}/catalog`}
            className={`font-bold text-sm lg:text-base transition-all duration-200 relative py-1.5 ${
              pathname.includes('/catalog')
                ? 'text-blue-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-700'
                : 'text-slate-700 hover:text-blue-700'
            }`}
          >
            {isEs ? 'Catálogo & Cotización' : 'Catalog & Quotation'}
          </Link>

          <Link
            href={`/${locale}/contact`}
            className={`font-bold text-sm lg:text-base transition-all duration-200 relative py-1.5 ${
              pathname.includes('/contact')
                ? 'text-blue-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-700'
                : 'text-slate-700 hover:text-blue-700'
            }`}
          >
            {isEs ? 'Contacto' : 'Contact'}
          </Link>
        </nav>

        {/* SELECTOR DE IDIOMA A LA DERECHA */}
        <div className="flex items-center">
          <div className="inline-flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 shadow-inner">
            <Link
              href={getLanguagePath('es')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                isEs
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ES
            </Link>
            <Link
              href={getLanguagePath('en')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                !isEs
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}