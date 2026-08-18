// src/components/Hero.tsx
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative overflow-hidden bg-slate-900">
      {/* Background gradient + subtle route-line pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950" />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="route-lines" width="120" height="120" patternUnits="userSpaceOnUse">
            <path
              d="M0 60 Q30 20 60 60 T120 60"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#route-lines)" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="max-w-3xl">
          {/* Cold-chain badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-1.5">
            <svg
              className="h-4 w-4 text-blue-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M4.93 4.93l14.14 14.14M4.93 4.93l1 4M4.93 4.93l4-1M19.07 19.07l-1-4M19.07 19.07l-4 1M19.07 4.93L4.93 19.07M19.07 4.93l-4 1M19.07 4.93l1 4M4.93 19.07l4-1M4.93 19.07l-1-4" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wide text-blue-200">
              {t('coldChainBadge')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center rounded-md bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-400"
            >
              {t('ctaCatalog')}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-slate-400 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
            >
              {t('ctaContact')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}