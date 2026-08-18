import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/HeroSection';
import ServicesCorporate from '@/components/ServicesCorporate';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === 'es';

  const tValue = await getTranslations({ locale, namespace: 'ValueProps' });
  const tCompany = await getTranslations({ locale, namespace: 'Company' });

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 1. HERO RECREADO EXACTO AL BOCETO */}
      <HeroSection locale={locale} />

      {/* 2. TARJETAS CORPORATIVAS CON IMÁGENES & GSAP */}
      <ServicesCorporate locale={locale} />

      {/* 3. ESTÁNDAR DE OPERACIÓN */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              {isEs ? 'Estándar de Operación' : 'Operational Standards'}
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {tValue('title')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {tValue('subtitle')}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-6 hover:shadow-md hover:border-orange-300 transition-all duration-200">
              <div className="h-11 w-11 rounded-lg bg-orange-500 text-white flex items-center justify-center font-extrabold text-sm mb-4 shadow-sm">
                72h
              </div>
              <h3 className="text-base font-bold text-slate-900">{tValue('custodyTitle')}</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{tValue('custodyDesc')}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200">
              <div className="h-11 w-11 rounded-lg bg-slate-900 text-white flex items-center justify-center font-extrabold text-xs mb-4 shadow-sm">
                24/7
              </div>
              <h3 className="text-base font-bold text-slate-900">{tValue('securityTitle')}</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{tValue('securityDesc')}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200">
              <div className="h-11 w-11 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900">{tValue('directTitle')}</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{tValue('directDesc')}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200">
              <div className="h-11 w-11 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900">{tValue('crewTitle')}</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{tValue('crewDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. IDENTIDAD CORPORATIVA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
                {isEs ? 'Identidad Corporativa' : 'Corporate Identity'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {tCompany('title')}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {tCompany('subtitle')}
              </p>

              <div className="space-y-4 pt-2">
                <div className="rounded-xl bg-slate-800/80 p-5 border border-slate-700/80">
                  <h3 className="text-sm font-bold text-blue-300">{tCompany('missionTitle')}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">{tCompany('missionDesc')}</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-5 border border-slate-700/80">
                  <h3 className="text-sm font-bold text-blue-300">{tCompany('visionTitle')}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">{tCompany('visionDesc')}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">
                {tCompany('pillarsTitle')}
              </h3>

              <div className="flex gap-4 items-start bg-slate-800/60 p-5 rounded-xl border border-slate-700/80">
                <div className="h-9 w-9 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{tCompany('pillar1Title')}</h4>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed font-light">{tCompany('pillar1Desc')}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-slate-800/60 p-5 rounded-xl border border-slate-700/80">
                <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{tCompany('pillar2Title')}</h4>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed font-light">{tCompany('pillar2Desc')}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-slate-800/60 p-5 rounded-xl border border-slate-700/80">
                <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{tCompany('pillar3Title')}</h4>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed font-light">{tCompany('pillar3Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}