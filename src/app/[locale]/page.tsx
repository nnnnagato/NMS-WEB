import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage({ params }: { params: { locale: string } }) {
  const tHero = useTranslations('Hero');
  const tValue = useTranslations('ValueProps');
  const tServices = useTranslations('Services');
  const tCompany = useTranslations('Company');

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* 1. HERO CORPORATIVO */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-5xl text-center">
          
          {/* Badge con acento anaranjado del logo */}
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/90 border border-slate-700 px-4 py-1.5 text-xs font-semibold text-slate-200">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            {tHero('badge')}
          </span>

          <h1 className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {tHero('title')}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {tHero('subtitle')}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${params.locale}/catalog`}
              className="rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-blue-500 transition-colors"
            >
              {tHero('ctaCatalog')}
            </Link>
            <Link
              href={`/${params.locale}/contact`}
              className="rounded-xl border border-slate-700 bg-slate-800/80 px-8 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
            >
              {tHero('ctaContact')}
            </Link>
          </div>

        </div>
      </section>

      {/* 2. PROPUESTA DE VALOR / VENTAJAS OPERATIVAS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {tValue('title')}
            </h2>
            <p className="mt-3 text-base text-slate-600">
              {tValue('subtitle')}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Custodia 72h con acento anaranjado */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:shadow-md hover:border-orange-300 transition-all">
              <div className="h-12 w-12 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-lg mb-5 shadow-sm">
                72h
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {tValue('custodyTitle')}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {tValue('custodyDesc')}
              </p>
            </div>

            {/* Verificación 24/7 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:shadow-md hover:border-blue-300 transition-all">
              <div className="h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm mb-5 shadow-sm">
                24/7
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {tValue('securityTitle')}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {tValue('securityDesc')}
              </p>
            </div>

            {/* Gestión Directa */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:shadow-md hover:border-blue-300 transition-all">
              <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {tValue('directTitle')}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {tValue('directDesc')}
              </p>
            </div>

            {/* Traslado Tripulación */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:shadow-md hover:border-blue-300 transition-all">
              <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {tValue('crewTitle')}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {tValue('crewDesc')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. LÍNEAS DE SERVICIO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {tServices('title')}
            </h2>
            <p className="mt-3 text-base text-slate-600">
              {tServices('subtitle')}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Provisión de Rancho */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  Ship Chandler
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-900">
                  {tServices('ranchoTitle')}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {tServices('ranchoDesc')}
                </p>
              </div>
              <Link
                href={`/${params.locale}/catalog`}
                className="mt-6 inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                {tHero('ctaCatalog')} &rarr;
              </Link>
            </div>

            {/* Logística Marítima */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Transporte & Repuestos
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-900">
                  {tServices('logisticsTitle')}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {tServices('logisticsDesc')}
                </p>
              </div>
              <Link
                href={`/${params.locale}/contact`}
                className="mt-6 inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                {tHero('ctaContact')} &rarr;
              </Link>
            </div>

            {/* Abastecimiento General */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Operaciones Portuarias
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-900">
                  {tServices('supplyTitle')}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {tServices('supplyDesc')}
                </p>
              </div>
              <Link
                href={`/${params.locale}/contact`}
                className="mt-6 inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                {tHero('ctaContact')} &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 4. IDENTIDAD CORPORATIVA & PILARES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
                Identidad Corporativa
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {tCompany('title')}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {tCompany('subtitle')}
              </p>

              <div className="space-y-4 pt-2">
                <div className="rounded-xl bg-slate-800/80 p-5 border border-slate-700">
                  <h3 className="text-sm font-bold text-blue-400">{tCompany('missionTitle')}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">{tCompany('missionDesc')}</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-5 border border-slate-700">
                  <h3 className="text-sm font-bold text-blue-400">{tCompany('visionTitle')}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">{tCompany('visionDesc')}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">
                {tCompany('pillarsTitle')}
              </h3>

              <div className="flex gap-4 items-start bg-slate-800/60 p-5 rounded-2xl border border-slate-700">
                <div className="h-10 w-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{tCompany('pillar1Title')}</h4>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">{tCompany('pillar1Desc')}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-slate-800/60 p-5 rounded-2xl border border-slate-700">
                <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{tCompany('pillar2Title')}</h4>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">{tCompany('pillar2Desc')}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-slate-800/60 p-5 rounded-2xl border border-slate-700">
                <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{tCompany('pillar3Title')}</h4>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">{tCompany('pillar3Desc')}</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}