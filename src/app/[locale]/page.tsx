import HeroSection from '@/components/HeroSection';
import SupplyJourneySection from '@/components/SupplyJourneySection';
import ServicesCorporate from '@/components/ServicesCorporate';
import CorporateIdentitySection from '@/components/CorporateIdentitySection';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-slate-800 selection:text-white">
      {/* 1. HERO A PANTALLA COMPLETA */}
      <HeroSection locale={locale} />

      {/* 2. SPLIT-SCREEN PINNED: LA TRAVESÍA DEL SUMINISTRO (3 FASES EN EL MISMO LUGAR) */}
      <SupplyJourneySection locale={locale} />

      {/* 3. TARJETAS CORPORATIVAS CON IMÁGENES & GSAP */}
      <ServicesCorporate locale={locale} />

      {/* 4. IDENTIDAD CORPORATIVA (REWORK TOTAL CON LOGO GRANDE, MANIFIESTO Y PILARES) */}
      <CorporateIdentitySection locale={locale} />
    </main>
  );
}