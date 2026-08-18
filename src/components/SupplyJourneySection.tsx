'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SupplyJourneyProps {
  locale: string;
}

export default function SupplyJourneySection({ locale }: SupplyJourneyProps) {
  const isEs = locale === 'es';
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const slidesContainerRef = useRef<HTMLDivElement>(null);

  const stepsData = [
    {
      step: '01',
      tag: isEs ? 'Control Térmico & Inocuidad' : 'Cold Chain & Food Safety',
      title: isEs
        ? 'Recepción, Selección y Control Térmico'
        : 'Receiving, Selection & Thermal Control',
      desc: isEs
        ? 'Inspección minuciosa de cada partida de alimentos perecibles y carnes al vacío. Almacenamiento inmediato en cámara de frío propia para preservar la máxima frescura e inocuidad antes del embarque.'
        : 'Rigorous inspection of all perishable goods and vacuum-sealed meats. Immediate cold-room storage preserving maximum freshness and strict food safety compliance prior to dispatch.',
      specs: [
        { label: isEs ? 'Rango Térmico' : 'Temp Range', val: isEs ? '-18°C a 4°C Monitoreado' : '-18°C to 4°C Monitored' },
        { label: isEs ? 'Custodia Gratuita' : 'Free Warehousing', val: isEs ? 'Hasta 72h garantizadas' : 'Up to 72h guaranteed' },
      ],
      img: '/bodega-frio.webp',
      alt: 'Cámara de frío y almacenamiento seguro NMS',
    },
    {
      step: '02',
      tag: isEs ? 'Despacho Terrestre' : 'Ground Logistics',
      title: isEs
        ? 'Logística Terrestre y Monitoreo Continuo'
        : 'Ground Transport & Continuous Monitoring',
      desc: isEs
        ? 'Flota de transporte acondicionada para traslados directos hacia los terminales de Antofagasta y la bahía de Mejillones. Coordinación sincronizada con los turnos y recaladas de su flota.'
        : 'Dedicated fleet equipped for direct ground transfers to Antofagasta terminals and Mejillones Bay, strictly aligned with fleet schedules and port vessel arrivals.',
      specs: [
        { label: isEs ? 'Cobertura' : 'Coverage', val: isEs ? 'Antofagasta & Mejillones' : 'Antofagasta & Mejillones' },
        { label: isEs ? 'Disponibilidad' : 'Availability', val: isEs ? 'Operativa 24/7' : '24/7 Operational Desk' },
      ],
      img: '/despacho-frio.webp',
      alt: 'Logística de despacho directo NMS',
    },
    {
      step: '03',
      tag: isEs ? 'Entrega a Bordo' : 'Pier & Onboard Handover',
      title: isEs
        ? 'Entrega en Muelle y Asistencia a Tripulaciones'
        : 'Berth Delivery & Crew Assistance',
      desc: isEs
        ? 'Puntualidad rigurosa a pie de muelle o a la gira. Entrega ágil y rotulada por áreas para facilitar la estiba inmediata a bordo de remolcadores y buques en faena.'
        : 'Punctual berth or anchorage delivery. Clearly labeled packages segmented by storage zone to streamline immediate stowage aboard tugboats and working vessels.',
      specs: [
        { label: isEs ? 'Modalidad' : 'Handover Type', val: isEs ? 'Muelle Fiscal y Terminales Privados' : 'Berth & Private Terminals' },
        { label: isEs ? 'Servicio Complementario' : 'Crew Transit', val: isEs ? 'Traslado terrestre de dotaciones' : 'Crew ground transport' },
      ],
      img: '/remolcador.webp',
      alt: 'Entrega a bordo de remolcador en bahía',
    },
  ];

  useGSAP(
    () => {
      ScrollTrigger.refresh();

      const slides = slidesContainerRef.current?.children;
      if (!slides || slides.length === 0) return;

      const slideArray = Array.from(slides);

      // Estado inicial: solo la slide 0 visible, las demás abajo y difuminadas
      slideArray.forEach((slide, i) => {
        if (i !== 0) {
          gsap.set(slide, {
            opacity: 0,
            y: 40,
            filter: 'blur(16px)',
            pointerEvents: 'none',
          });
        } else {
          gsap.set(slide, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
          });
        }
      });

      // Timeline Pinned: El contenedor se queda fijo en pantalla durante 2500px de recorrido de scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=2500',
          pin: pinContainerRef.current,
          scrub: 0.8, // Fluidez continua al scrollear
          invalidateOnRefresh: true,
        },
      });

      // Transición Slide 1 -> Slide 2
      tl.to(slideArray[0], {
        opacity: 0,
        y: -40,
        filter: 'blur(16px)',
        duration: 1,
        ease: 'power2.inOut',
      })
      .to(
        slideArray[1],
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.inOut',
        },
        '-=0.3' // Leve solapamiento para que no quede vacía la pantalla
      )
      // Pausa para lectura cómoda en la Slide 2
      .to({}, { duration: 0.6 })

      // Transición Slide 2 -> Slide 3
      .to(slideArray[1], {
        opacity: 0,
        y: -40,
        filter: 'blur(16px)',
        duration: 1,
        ease: 'power2.inOut',
      })
      .to(
        slideArray[2],
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.inOut',
        },
        '-=0.3'
      )
      // Pausa final en Slide 3
      .to({}, { duration: 0.6 });
    },
    { scope: triggerRef }
  );

  return (
    <div ref={triggerRef} className="relative w-full bg-white">
      {/* Contenedor que queda fijo (Pinned) durante el scroll */}
      <div
        ref={pinContainerRef}
        className="w-full h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-16 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl w-full">
          
          {/* 1. ENCABEZADO SUPERIOR FIJO */}
          <div className="max-w-3xl mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
              {isEs ? 'Trazabilidad y Eficiencia Operativa' : 'Traceability & Operational Flow'}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {isEs
                ? 'El Estándar de Abastecimiento NMS'
                : 'The NMS Supply Standard'}
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              {isEs
                ? 'Control estricto en cada eslabón logístico para garantizar que su flota reciba víveres frescos y repuestos en el momento exacto de su recalada.'
                : 'Strict end-to-end control ensuring your fleet receives fresh provisions and technical items right on schedule.'}
            </p>
          </div>

          {/* 2. CONTENEDOR RELATIVO DONDE APARECEN Y DESAPARECEN LAS TARJETAS */}
          <div ref={slidesContainerRef} className="relative w-full h-[460px] sm:h-[480px]">
            {stepsData.map((item, index) => (
              <div
                key={index}
                className="absolute inset-0 w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center will-change-[transform,opacity,filter]"
              >
                
                {/* TARJETA INFORMATIVA (IZQUIERDA) */}
                <div className="lg:col-span-6 h-full flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-slate-50/90 border border-slate-200 shadow-sm backdrop-blur-sm">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-md">
                        {item.tag}
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-slate-400 font-mono">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {item.title}
                    </h3>

                    <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-5 border-t border-slate-200">
                    {item.specs.map((spec, idx) => (
                      <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-inner">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          {spec.label}
                        </span>
                        <span className="mt-0.5 text-xs sm:text-sm font-bold text-slate-900 block">
                          {spec.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FOTO ALINEADA (DERECHA) */}
                <div className="lg:col-span-6 relative h-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xl">
                  <Image
                    src={item.img}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}