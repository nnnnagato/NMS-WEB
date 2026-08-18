'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface HeroProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const isEs = locale === 'es';

  // Solo las 4 frases solicitadas
  const phrases = isEs
    ? [
        'Custodia y Almacenamiento Gratuito 72h',
        'Recepción y Verificación 24/7',
        'Gestión Directa en Muelle',
        'Traslado Terrestre de Tripulación',
      ]
    : [
        'Free 72h Storage & Warehousing',
        '24/7 Receiving & Verification',
        'Direct Pier Operations',
        'Crew Land Transportation',
      ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Loop suave del video de fondo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime > video.duration - 0.6) {
        gsap.to(video, { opacity: 0.35, duration: 0.5, ease: 'power2.inOut' });
      }
    };

    const handleSeekedOrEnded = () => {
      gsap.to(video, { opacity: 0.95, duration: 0.7, ease: 'power2.out' });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('seeked', handleSeekedOrEnded);
    video.addEventListener('ended', handleSeekedOrEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('seeked', handleSeekedOrEnded);
      video.removeEventListener('ended', handleSeekedOrEnded);
    };
  }, []);

  // Animación Cinética Extendida directa al texto (1 a la vez)
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % phrases.length);
        },
      });

      // Estado inicial: desplazado, difuminado y oculto
      gsap.set(el, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        filter: 'blur(16px)',
      });

      // ENTRADA EXTENDIDA
      tl.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power3.out',
      })
      // PERMANENCIA
      .to({}, { duration: 1.8 })
      // SALIDA EXTENDIDA
      .to(el, {
        opacity: 0,
        y: -30,
        scale: 1.02,
        filter: 'blur(14px)',
        duration: 0.8,
        ease: 'power2.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [currentIndex, phrases.length]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-7rem)] w-full overflow-hidden bg-slate-950 flex flex-col justify-end"
    >
      {/* Video de fondo */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-95 pointer-events-none"
      >
        <source src="/videos/hero-ship.mp4" type="video/mp4" />
      </video>

      {/* Gradiente sutil inferior para legibilidad sin oscurecer de más */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent z-10 pointer-events-none" />

      {/* Contenedor del texto directo en la esquina inferior izquierda */}
      <div className="relative z-20 px-8 sm:px-14 pb-12 sm:pb-16 max-w-3xl">
        <h2
          ref={textRef}
          className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] will-change-transform"
        >
          {phrases[currentIndex]}
        </h2>
      </div>
    </section>
  );
}