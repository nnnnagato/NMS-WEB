'use client';

import React, { useState } from 'react';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default function ContactPage({ params }: ContactPageProps) {
  const [locale, setLocale] = useState('es');

  React.useEffect(() => {
    params.then((p) => setLocale(p.locale));
  }, [params]);

  const isEs = locale === 'es';

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', company: '', email: '', phone: '', message: '' });
    }, 1000);
  };

  return (
    <main className="h-[calc(100vh-7rem)] bg-white text-slate-900 px-6 sm:px-12 lg:px-20 flex flex-col justify-center overflow-hidden">
      <div className="mx-auto max-w-7xl w-full flex flex-col justify-between h-[92%] py-2">
        
        {/* ENCABEZADO */}
        <div className="text-center max-w-3xl mx-auto shrink-0 mb-3 sm:mb-5">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {isEs ? 'Contacto y Coordinación Operativa' : 'Contact & Operational Dispatch'}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {isEs
              ? 'Estamos disponibles las 24 horas del día, los 7 días de la semana para atender emergencias, provisión de rancho y logística en puerto.'
              : 'Available 24/7 for immediate provisions, emergencies, and port logistical coordination.'}
          </p>
        </div>

        {/* 2 COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch flex-grow">
          
          {/* COLUMNA IZQUIERDA: CANALES DIRECTOS + TARJETA CLARA */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 h-full">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 shadow-sm flex flex-col justify-between flex-grow">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight mb-2">
                {isEs ? 'Canales Directos' : 'Direct Channels'}
              </h2>

              <div className="flex flex-col justify-around gap-4 flex-grow">
                
                {/* UBICACIÓN */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 border border-orange-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                      {isEs ? 'Ubicación Base' : 'Base Location'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block leading-snug">
                      Antofagasta y Mejillones, Región de Antofagasta, Chile.
                    </span>
                  </div>
                </div>

                {/* TELÉFONO */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 border border-orange-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                      {isEs ? 'Teléfono Directo & Guardia 24/7' : 'Direct Phone & 24/7 Duty'}
                    </span>
                    <a
                      href="tel:+56950029686"
                      className="text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors block font-mono"
                    >
                      +56 9 5002 9686
                    </a>
                  </div>
                </div>

                {/* BUZÓN */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 border border-orange-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                      {isEs ? 'Buzón Comercial & Operaciones' : 'Commercial & Ops Mail'}
                    </span>
                    <a
                      href="mailto:commercial@northmaritimeservices.com"
                      className="text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors block"
                    >
                      commercial@northmaritimeservices.com
                    </a>
                  </div>
                </div>

                {/* ATENCIÓN */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 border border-orange-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                      {isEs ? 'Atención & Coordinación 24/7' : '24/7 Coordination'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block leading-tight">
                      Guardia y Coordinación 24/7 en Terreno
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* TARJETA INFERIOR CLARA */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5 shadow-sm shrink-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  {isEs ? 'Custodia 72h Sin Costo' : 'Free 72h Warehousing'}
                </h3>
              </div>
              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                {isEs
                  ? 'Si requiere recepción anticipada de repuestos o encomiendas en Antofagasta y Mejillones, indíquelo en el formulario.'
                  : 'If you require advance receiving of spares or parcels in Antofagasta and Mejillones, please specify in the form.'}
              </p>
            </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight mb-2">
              {isEs ? 'Enviar Requerimiento Directo' : 'Send Direct Inquiry'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-3 flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    {isEs ? 'Nombre Completo *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                  <span className="text-xs text-slate-500 font-medium mt-1 block">
                    Ej. Juan Pérez
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    {isEs ? 'Empresa / Nave / Remolcador' : 'Company / Vessel / Tug'}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                  <span className="text-xs text-slate-500 font-medium mt-1 block">
                    Ej. SAAM Towage / M/V Pacific Star
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    {isEs ? 'Correo Electrónico *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                  <span className="text-xs text-slate-500 font-medium mt-1 block">
                    operaciones@agencia.com
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    {isEs ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                  <span className="text-xs text-slate-500 font-medium mt-1 block">
                    +56 9 1234 5678
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  {isEs ? 'Detalle del Requerimiento *' : 'Inquiry Details *'}
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                />
                <span className="text-xs text-slate-500 font-medium mt-1 block">
                  {isEs
                    ? 'Indique requerimientos de víveres, repuestos, traslado de tripulación, ETA o solicitud de custodia gratuita por 72h...'
                    : 'Specify provisions, spare parts, crew transport, ETA or 72h free warehousing request...'}
                </span>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-xl bg-[#E45B25] hover:bg-[#d04e1c] py-3.5 px-6 text-xs sm:text-sm font-bold text-white shadow-sm transition-colors disabled:opacity-70 flex items-center justify-center cursor-pointer mt-1"
              >
                {status === 'loading'
                  ? isEs
                    ? 'Enviando...'
                    : 'Sending...'
                  : isEs
                  ? 'Enviar Mensaje a Comercial'
                  : 'Send Message to Commercial Desk'}
              </button>

              {status === 'success' && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-center text-xs font-semibold text-emerald-800">
                  {isEs
                    ? '✓ Mensaje enviado correctamente. Nuestro equipo de operaciones se contactará a la brevedad.'
                    : '✓ Message sent successfully. Our operations team will get in touch shortly.'}
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </main>
  );
}