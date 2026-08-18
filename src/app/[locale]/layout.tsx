import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../globals.css';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';

  const title = isEs 
    ? 'North Maritime Services | Abastecimiento y Provisiones en Antofagasta y Mejillones' 
    : 'North Maritime Services | Port Ship Supply & Provisioning in Antofagasta & Mejillones';
    
  const description = isEs
    ? 'Servicio integral de ship supply y abastecimiento de buques en Antofagasta y Mejillones. Operaciones 24/7 y cadena de frío garantizada.'
    : 'Full-service ship chandler and provisioning in Antofagasta & Mejillones. 24/7 maritime supply and cold-chain compliance.';

  return {
    title,
    description,
    metadataBase: new URL('https://northmaritimeservices.com'),
    icons: {
      icon: '/Logo-NMS.png',
      shortcut: '/Logo-NMS.png',
      apple: '/Logo-NMS.png',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'es-CL': '/es',
        'en-US': '/en',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://northmaritimeservices.com/${locale}`,
      siteName: 'North Maritime Services',
      images: [
        {
          url: '/Logo-NMS.png',
          width: 800,
          height: 600,
          alt: 'North Maritime Services',
        },
      ],
      locale: isEs ? 'es_CL' : 'en_US',
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/Logo-NMS.png" type="image/png" />
      </head>
      <body className="min-h-screen flex flex-col justify-between antialiased bg-slate-50 text-slate-900">
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <div className="flex-grow">
            {children}
          </div>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}