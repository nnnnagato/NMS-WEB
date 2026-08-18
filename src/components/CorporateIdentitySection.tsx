'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface IdentityProps {
  locale: string;
}

export default function CorporateIdentitySection({ locale }: IdentityProps) {
  const isEs = locale === 'es';

  const sectionRef = useRef<HTMLElement>(null);
  const heroBlockRef = useRef<HTMLDivElement>(null);
  const interactivePanelRef = useRef<HTMLDivElement>(null);
  const contentDisplayRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);

  const pillars = [
    {
      id: 'mision',
      tag: isEs ? 'Misión' : 'Mission',
      title: isEs
        ? 'Garantizar la Continuidad Operativa de la Flota'
        : 'Ensuring Fleet Operational Continuity',
      desc: isEs
        ? 'Optimizar la cadena de suministro de cada embarcación mediante entregas ágiles, seguras y personalizadas, disminuyendo al mínimo los tiempos de estadía en muelle.'
        : 'Optimizing each vessel’s supply chain with agile, secure, and tailored deliveries, minimizing downtime and turn-around hours at berth.',
      keypoint: isEs ? 'Entregas a pie de muelle sin retrasos' : 'On-time berth-side deliveries',
    },
    {
      id: 'vision',
      tag: isEs ? 'Visión' : 'Vision',
      title: isEs
        ? 'Ser el Operador y Proveedor Referente en el Norte'
        : 'Northern Maritime Supply Benchmark',
      desc: isEs
        ? 'Consolidarnos como el socio estratégico indiscutido en servicios navieros y aprovisionamiento de víveres en Antofagasta y Mejillones, reconocidos por nuestra integridad y respuesta inmediata.'
        : 'Establishing ourselves as the undisputed benchmark in maritime supply and provisioning across Antofagasta and Mejillones, recognized for integrity and instant response.',
      keypoint: isEs ? 'Liderazgo en la II Región' : 'Leadership across northern ports',
    },
    {
      id: 'compromiso',
      tag: isEs ? 'Compromiso' : 'Commitment',
      title: isEs
        ? 'Rigor, Inocuidad y Disponibilidad 24/7'
        : 'Precision, Cold-Chain & 24/7 Readiness',
      desc: isEs
        ? 'Tres principios en cada maniobra: cumplimiento de las ventanas de recalada, preservación estricta de la cadena de frío en cámara propia y personal presencial continuo.'
        : 'Three uncompromising pillars: precise arrival window execution, strict cold-chain food safety preservation, and continuous round-the-clock port personnel.',
      keypoint: isEs ? 'Cadena de frío (-18°C / 4°C) garantizada' : 'Guaranteed cold chain integrity',
    },
  ];

  // 1. Rotación automática (6.5s por sección) que se cancela definitivamente al interactuar de forma manual
  useEffect(() => {
    if (isManual) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % pillars.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [isManual, pillars.length]);

  // Manejador de clic manual
  const handleManualSelect = (index: number) => {
    setIsManual(true);
    setActiveIndex(index);
  };

  // 2. Animación GSAP de Difuminado y Transición al cambiar de pestaña activa
  useEffect(() => {
    const el = contentDisplayRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 15, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power2.out',
      }
    );
  }, [activeIndex]);

  // 3. Animación inicial de entrada con ScrollTrigger
  useGSAP(
    () => {
      ScrollTrigger.refresh();

      gsap.fromTo(
        heroBlockRef.current,
        { opacity: 0, y: 35, filter: 'blur(12px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroBlockRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        interactivePanelRef.current,
        { opacity: 0, y: 40, filter: 'blur(12px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: interactivePanelRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const activePillar = pillars[activeIndex];

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="relative bg-white text-slate-900 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-b border-slate-200 overflow-hidden scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* BLOQUE SUPERIOR: LOGO MONUMENTAL EMPAREJADO CON EL TEXTO LATERAL */}
        <div
          ref={heroBlockRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pb-20 border-b border-slate-200"
        >
          {/* Logo en escala monumental */}
          <div className="lg:col-span-6 flex items-center justify-start">
            <div className="relative w-full h-56 sm:h-72 lg:h-80 max-w-xl">
              <Image
                src="/Logo-NMS.png"
                alt="North Maritime Services Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>

          {/* Texto de identidad sobrio (sin acentos naranjas) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase mb-3 block">
              {isEs ? 'Identidad & Respaldo Portuario' : 'Corporate Standing'}
            </span>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {isEs
                ? 'Soluciones logísticas integrales y provisión de rancho de alta exigencia.'
                : 'Comprehensive maritime logistics and high-standard provisions supply.'}
            </h2>
            
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              {isEs
                ? 'Operamos como el socio estratégico para armadores y agencias navieras en Antofagasta y la bahía de Mejillones, asegurando la continuidad de faena con estricto control de inocuidad y resguardo de cadena de frío.'
                : 'Serving as the strategic partner for fleet operators and shipping agencies across Antofagasta and Mejillones Bay, ensuring uninterrupted operations through strict food safety and unbroken cold-chain logistics.'}
            </p>
          </div>
        </div>

        {/* BLOQUE INFERIOR: MISIÓN, VISIÓN Y COMPROMISO */}
        <div ref={interactivePanelRef} className="mt-20">
          
          {/* Selector horizontal con líneas dinámicas y barra de progreso si es automático */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {pillars.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => handleManualSelect(idx)}
                  className="text-left group flex flex-col focus:outline-none transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between pb-3">
                    <span
                      className={`text-xs font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-md border transition-all ${
                        isActive
                          ? 'text-slate-900 border-slate-300 bg-slate-100 font-bold'
                          : 'text-slate-400 border-slate-200 bg-slate-50 group-hover:text-slate-700'
                      }`}
                    >
                      {item.tag}
                    </span>
                    <span
                      className={`text-xs font-mono transition-colors ${
                        isActive ? 'text-slate-900 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                  </div>

                  {/* Línea de navegación / progreso */}
                  <div className="w-full h-[2px] bg-slate-200 relative overflow-hidden rounded-full">
                    {isActive ? (
                      <div
                        key={`${idx}-${isManual}`}
                        className={`h-full bg-slate-900 rounded-full ${
                          !isManual
                            ? 'w-full origin-left animate-[grow_6.5s_linear]'
                            : 'w-full'
                        }`}
                        style={{
                          animation: !isManual ? 'progress 6.5s linear' : 'none',
                          width: isManual ? '100%' : undefined,
                        }}
                      />
                    ) : (
                      <div className="w-0 group-hover:w-1/3 h-full bg-slate-400 transition-all duration-300 rounded-full" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Contenido dinámico con difuminación al cambiar */}
          <div
            ref={contentDisplayRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[180px]"
          >
            <div className="lg:col-span-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {activePillar.title}
              </h3>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between gap-4">
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                {activePillar.desc}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono font-semibold text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                <span>{activePillar.keypoint}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}