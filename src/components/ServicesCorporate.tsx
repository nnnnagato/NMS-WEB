'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesProps {
  locale: string;
}

export default function ServicesCorporate({ locale }: ServicesProps) {
  const isEs = locale === 'es';
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.refresh();

      // Animación en bloque: Todo el contenido entra en un solo movimiento uniforme y sincronizado
      gsap.fromTo(
        [contentWrapperRef.current, cardsWrapperRef.current],
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200 text-slate-900"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* ENCABEZADO CORPORATIVO SINCRONIZADO */}
        <div ref={contentWrapperRef} className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-200/80 border border-slate-300/80 text-slate-800 text-xs font-bold uppercase tracking-wider">
            {isEs ? 'Operaciones en Muelle y Bahía' : 'Pier & Harbor Operations'}
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isEs
              ? 'Abastecimiento y Logística para Remolcadores'
              : 'Provisioning & Logistics for Tugboat Fleets'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {isEs
              ? 'Suministro alimentario con estricta cadena de frío y entrega directa para tripulaciones en los puertos de Antofagasta y Mejillones.'
              : 'Food supplies with strict cold chain maintenance and direct boarding for crew operations in Antofagasta and Mejillones.'}
          </p>
        </div>

        {/* BLOQUE DE TARJETAS: Entran y se asientan todas al mismo tiempo */}
        <div
          ref={cardsWrapperRef}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* TARJETA 1: Víveres y Rancho */}
          <div className="flex flex-col justify-between rounded-xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden">
            <div>
              <div className="relative h-60 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                <Image
                  src="/comida.webp"
                  alt="Provisión de Rancho y Víveres"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider text-slate-700 uppercase bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded">
                    Ship Chandler
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">01</span>
                </div>

                <h3 className="mt-3.5 text-xl font-bold text-slate-900">
                  {isEs ? 'Provisión de Rancho y Víveres' : 'Provisions & Food Supply'}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {isEs
                    ? 'Abastecimiento de frutas, verduras seleccionadas, abarrotes y carnes al vacío. Pedidos armados según la dotación de tripulantes y días de turno.'
                    : 'Supply of fresh fruits, vegetables, dry groceries, and vacuum-sealed meats tailored to crew headcount and shift length.'}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-7 pt-0">
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/${locale}/catalog`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-800 hover:text-blue-900 transition-colors"
                >
                  {isEs ? 'Ver Catálogo y Cotizar' : 'View Catalog & Quote'}
                  <span className="text-slate-500">&rarr;</span>
                </Link>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {isEs ? 'Fresco & Seco' : 'Fresh & Dry'}
                </span>
              </div>
            </div>
          </div>

          {/* TARJETA 2: Cuarto de Frío */}
          <div className="flex flex-col justify-between rounded-xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden">
            <div>
              <div className="relative h-60 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                <Image
                  src="/bodega-frio.webp"
                  alt="Conservación en Cuarto de Frío"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider text-slate-700 uppercase bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded">
                    {isEs ? 'Control Térmico' : 'Cold Chain'}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">02</span>
                </div>

                <h3 className="mt-3.5 text-xl font-bold text-slate-900">
                  {isEs ? 'Cuarto de Frío y Conservación' : 'Cold Storage Facility'}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {isEs
                    ? 'Infraestructura de frío dedicada para garantizar la inocuidad y temperatura óptima de congelados y perecibles antes de la faena de embarque.'
                    : 'Dedicated cold room setup preserving freshness and regulatory food safety standards prior to vessel dispatch.'}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-7 pt-0">
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-800 hover:text-blue-900 transition-colors"
                >
                  {isEs ? 'Consultar Disponibilidad' : 'Check Availability'}
                  <span className="text-slate-500">&rarr;</span>
                </Link>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {isEs ? 'Inocuidad' : 'Certified'}
                </span>
              </div>
            </div>
          </div>

          {/* TARJETA 3: Despacho a Muelle y Bahía */}
          <div className="flex flex-col justify-between rounded-xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden">
            <div>
              <div className="relative h-60 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                <Image
                  src="/despacho-frio.webp"
                  alt="Entrega en Muelle y Bahía"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider text-slate-700 uppercase bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded">
                    {isEs ? 'Logística en Terreno' : 'Pier Logistics'}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">03</span>
                </div>

                <h3 className="mt-3.5 text-xl font-bold text-slate-900">
                  {isEs ? 'Entrega en Muelle y Bahía' : 'Pier & Harbor Delivery'}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {isEs
                    ? 'Despacho terrestre directo hasta el muelle de atraque o coordinación de entrega a bordo del remolcador, con flexibilidad ante cambios de hora.'
                    : 'Direct land transport to the berth or vessel side transfer, offering total schedule agility tailored to tug operations.'}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-7 pt-0">
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-800 hover:text-blue-900 transition-colors"
                >
                  {isEs ? 'Coordinar Despacho' : 'Coordinate Dispatch'}
                  <span className="text-slate-500">&rarr;</span>
                </Link>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {isEs ? 'Puntual 24/7' : '24/7 Boarding'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}