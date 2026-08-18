'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Registrar ScrollTrigger de forma segura en el cliente
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesProps {
  locale: string;
  title: string;
  subtitle: string;
  ranchoTitle: string;
  ranchoDesc: string;
  logisticsTitle: string;
  logisticsDesc: string;
  supplyTitle: string;
  supplyDesc: string;
  ctaCatalog: string;
  ctaContact: string;
}

export default function ServicesSection({
  locale,
  title,
  subtitle,
  ranchoTitle,
  ranchoDesc,
  logisticsTitle,
  logisticsDesc,
  supplyTitle,
  supplyDesc,
  ctaCatalog,
  ctaContact,
}: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Animación de entrada para el encabezado con ScrollTrigger
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // 2. Animación escalonada (Stagger) para las 3 tarjetas de servicio
      const cards = cardsContainerRef.current?.children || [];
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: 'power3.out',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Encabezado */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100/70 border border-orange-200 px-3 py-1 rounded-full">
            {locale === 'es' ? 'Atención a Remolcadores y Flotas' : 'Tugboat & Fleet Provisioning'}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Grid de Tarjetas de Servicio con Imágenes Reales */}
        <div
          ref={cardsContainerRef}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* TARJETA 1: Víveres Frescos & Rancho */}
          <div className="group rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col overflow-hidden">
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
              <Image
                src="/comida.webp"
                alt="Víveres Frescos y Rancho"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs font-bold uppercase tracking-wider text-orange-400">
                Ship Chandler
              </span>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {ranchoTitle}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {ranchoDesc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/${locale}/catalog`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group-hover:translate-x-1 duration-200"
                >
                  {ctaCatalog} &rarr;
                </Link>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                  {locale === 'es' ? 'Fresco & Seco' : 'Fresh & Dry'}
                </span>
              </div>
            </div>
          </div>

          {/* TARJETA 2: Logística & Cadena de Frío */}
          <div className="group rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col overflow-hidden">
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
              <Image
                src="/bodega-frio.webp"
                alt="Cadena de Frío y Conservación"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs font-bold uppercase tracking-wider text-blue-400">
                {locale === 'es' ? 'Cadena de Frío' : 'Cold Chain'}
              </span>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {logisticsTitle}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {logisticsDesc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group-hover:translate-x-1 duration-200"
                >
                  {ctaContact} &rarr;
                </Link>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                  {locale === 'es' ? 'Cámara Dedicada' : 'Dedicated Storage'}
                </span>
              </div>
            </div>
          </div>

          {/* TARJETA 3: Despacho Directo al Remolcador */}
          <div className="group rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col overflow-hidden">
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
              <Image
                src="/remolcador.webp"
                alt="Entrega a Bordo de Remolcadores"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs font-bold uppercase tracking-wider text-blue-400">
                {locale === 'es' ? 'Entrega en Muelle' : 'Berth Delivery'}
              </span>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {supplyTitle}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {supplyDesc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group-hover:translate-x-1 duration-200"
                >
                  {ctaContact} &rarr;
                </Link>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                  {locale === 'es' ? 'A Bordo 24/7' : 'Onboard 24/7'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}