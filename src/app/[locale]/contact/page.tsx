'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { supabase } from '@/lib/supabase';

export default function ContactPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('Contact');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      // 1. Guardar en base de datos Supabase
      const { error: dbError } = await supabase.from('quote_requests').insert([
        {
          vessel_name: formData.company || 'Consulta General',
          port: 'Antofagasta / Mejillones',
          contact_email: formData.email,
          requirements: `CONTACTO WEB NMS:\nNombre: ${formData.name}\nTeléfono: ${formData.phone || 'No especificado'}\nEmpresa/Nave: ${formData.company || 'No especificado'}\nMensaje: ${formData.message}`
        }
      ]);

      if (dbError) {
        console.error('Error guardando en base de datos:', dbError);
      }

      // 2. Envío de correo a través del endpoint API
      const res = await fetch('/api/quote/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          locale: params.locale
        })
      });

      if (!res.ok) {
        throw new Error('Error al enviar el correo');
      }

      setSuccess(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-semibold text-blue-700">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            {t('badge')}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Panel Lateral Informativo */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                {t('infoTitle')}
              </h2>

              <div className="space-y-6">
                
                {/* Ubicación */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t('addressTitle')}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {t('addressDesc')}
                    </p>
                  </div>
                </div>

                {/* Correo Oficial */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t('emailTitle')}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-blue-600 break-all">
                      commercial@northmaritimeservices.com
                    </p>
                  </div>
                </div>

                {/* Atención 24/7 */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t('phoneTitle')}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      Guardia y Coordinación 24/7 en Terreno
                    </p>
                  </div>
                </div>

              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="rounded-2xl bg-slate-900 text-white p-5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Custodia 72h Sin Costo
                  </h4>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    Si requiere recepción anticipada de repuestos o encomiendas en Antofagasta y Mejillones, indíquelo en el formulario.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario con Indicaciones Inferiores */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                {t('formTitle')}
              </h2>

              {success && (
                <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-emerald-900">
                  <h3 className="font-bold text-sm">{t('successTitle')}</h3>
                  <p className="text-xs mt-1">{t('successDesc')}</p>
                </div>
              )}

              {error && (
                <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-5 text-red-900">
                  <p className="text-xs font-semibold">{t('errorMsg')}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Nombre */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {t('nameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:ring-blue-600"
                    />
                    <span className="block text-xs text-slate-400 mt-1 ml-1">
                      {t('namePlaceholder')}
                    </span>
                  </div>

                  {/* Empresa / Nave */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {t('companyLabel')}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:ring-blue-600"
                    />
                    <span className="block text-xs text-slate-400 mt-1 ml-1">
                      {t('companyPlaceholder')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Correo Electrónico */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {t('emailLabel')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:ring-blue-600"
                    />
                    <span className="block text-xs text-slate-400 mt-1 ml-1">
                      {t('emailPlaceholder')}
                    </span>
                  </div>

                  {/* Teléfono / WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {t('phoneLabel')}
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:ring-blue-600"
                    />
                    <span className="block text-xs text-slate-400 mt-1 ml-1">
                      {t('phonePlaceholder')}
                    </span>
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t('messageLabel')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:ring-blue-600"
                  />
                  <span className="block text-xs text-slate-400 mt-1 ml-1 leading-relaxed">
                    {t('messagePlaceholder')}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 py-3.5 px-6 text-sm font-bold text-white shadow-md hover:bg-blue-500 transition-colors disabled:opacity-50"
                >
                  {loading ? t('submittingBtn') : t('submitBtn')}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}