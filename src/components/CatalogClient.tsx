'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';
import { generateQuotePDF } from '@/lib/pdfGenerator';
import { useTranslations } from 'next-intl';

export interface Product {
  id: string;
  name_en: string;
  name_es: string;
  category: string;
  unit: string;
  price: number;
  stock_status: string;
  image_url?: string;
}

// Mapeo preciso de imágenes HD garantizadas según el tipo de producto
const getAccurateProductImage = (product: Product): string => {
  const name = (product.name_es + ' ' + product.name_en).toLowerCase();

  if (name.includes('agua') || name.includes('water') || name.includes('mineral') || name.includes('beverage')) {
    return 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('lácteo') || name.includes('leche') || name.includes('dairy') || name.includes('milk')) {
    return 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('carne') || name.includes('vacuno') || name.includes('beef') || name.includes('meat') || name.includes('lomo')) {
    return 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('pollo') || name.includes('chicken') || name.includes('pechuga')) {
    return 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('pescado') || name.includes('fish') || name.includes('salmón') || name.includes('salmon')) {
    return 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('fruta') || name.includes('fruit') || name.includes('manzana')) {
    return 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('verdura') || name.includes('vegetable') || name.includes('papa') || name.includes('tomate')) {
    return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('arroz') || name.includes('rice') || name.includes('grano')) {
    return 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80';
  }
  if (name.includes('aceite') || name.includes('oil')) {
    return 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80';
  }

  return 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80';
};

const CATEGORY_TRANSLATIONS: Record<string, { es: string; en: string }> = {
  'beverages & consumption': { es: 'Bebidas & Consumo', en: 'Beverages & Consumption' },
  'bebidas & consumo': { es: 'Bebidas & Consumo', en: 'Beverages & Consumption' },
  'beverages': { es: 'Bebidas & Consumo', en: 'Beverages & Consumption' },
  'fresh & frozen provisions': { es: 'Provisión Fresca & Congelada', en: 'Fresh & Frozen Provisions' },
  'provisión fresca & congelada': { es: 'Provisión Fresca & Congelada', en: 'Fresh & Frozen Provisions' },
  'cold chain': { es: 'Provisión Fresca & Congelada', en: 'Fresh & Frozen Provisions' },
  'fresh fruits & vegetables': { es: 'Frutas & Verduras Frescas', en: 'Fresh Fruits & Vegetables' },
  'frutas & verduras frescas': { es: 'Frutas & Verduras Frescas', en: 'Fresh Fruits & Vegetables' },
  'dry provisions & supplies': { es: 'Víveres Secos & Rancho', en: 'Dry Provisions & Supplies' },
  'víveres secos & rancho': { es: 'Víveres Secos & Rancho', en: 'Dry Provisions & Supplies' },
  'provisions': { es: 'Víveres Secos & Rancho', en: 'Dry Provisions & Supplies' }
};

export default function CatalogClient({ products, locale }: { products: Product[], locale: string }) {
  const t = useTranslations('Catalog');
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('ALL');
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  const [vesselName, setVesselName] = useState('');
  const [port, setPort] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [notes, setNotes] = useState('');

  const USD_TO_CLP = 950;

  const getCategoryLabel = (rawCategory: string) => {
    const key = rawCategory.toLowerCase().trim();
    if (CATEGORY_TRANSLATIONS[key]) {
      return locale === 'es' ? CATEGORY_TRANSLATIONS[key].es : CATEGORY_TRANSLATIONS[key].en;
    }
    return rawCategory;
  };

  const formatUnit = (unitStr: string) => {
    const lower = unitStr.toLowerCase().trim();
    if (lower.includes('caja') || lower.includes('box')) return locale === 'es' ? 'Caja' : 'Box';
    if (lower.includes('saco') || lower.includes('bag')) return locale === 'es' ? 'Saco' : 'Bag';
    if (lower.includes('pack')) return 'Pack';
    if (lower.includes('kg')) return 'Kg';
    if (lower.includes('lit') || lower.includes('lt')) return locale === 'es' ? 'Litro' : 'Liter';
    if (lower.includes('unid') || lower.includes('unit')) return locale === 'es' ? 'Unidad' : 'Unit';
    return unitStr;
  };

  const formatStock = (stockStr: string) => {
    const lower = (stockStr || '').toLowerCase();
    if (lower.includes('stock') || lower.includes('avail') || lower.includes('disp')) {
      return locale === 'es' ? 'En Stock' : 'In Stock';
    }
    return locale === 'es' ? 'Bajo Pedido' : 'On Demand';
  };

  const categoriesList = useMemo(() => {
    const keys = new Set<string>();
    products.forEach(p => {
      const normalized = getCategoryLabel(p.category);
      if (normalized) keys.add(normalized);
    });
    return ['ALL', ...Array.from(keys)];
  }, [products, locale]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const initialQuantities: Record<string, number> = {};
    searchParams.forEach((value, key) => {
      if (key.startsWith('qty_')) {
        const productId = key.replace('qty_', '');
        const qty = parseInt(value, 10);
        if (qty > 0) {
          initialQuantities[productId] = qty;
        }
      }
    });
    setQuantities(initialQuantities);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const name = locale === 'es' ? product.name_es : product.name_en;
      const categoryLabel = getCategoryLabel(product.category);
      
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategoryKey === 'ALL' || categoryLabel === selectedCategoryKey;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategoryKey, locale]);

  const handleQuantityChange = (id: string, delta: number) => {
    const current = quantities[id] || 0;
    const updated = Math.max(0, current + delta);
    
    const newQuantities = { ...quantities };
    if (updated === 0) {
      delete newQuantities[id];
    } else {
      newQuantities[id] = updated;
    }

    setQuantities(newQuantities);

    const params = new URLSearchParams(searchParams.toString());
    if (updated === 0) {
      params.delete(`qty_${id}`);
    } else {
      params.set(`qty_${id}`, updated.toString());
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const formatPriceNumber = (priceInUSD: number) => {
    if (locale === 'es') {
      return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(priceInUSD * USD_TO_CLP);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(priceInUSD);
  };

  const totalItemsCount = Object.values(quantities).reduce((a, b) => a + b, 0);

  const totalPriceUSD = Object.entries(quantities).reduce((sum, [id, qty]) => {
    const prod = products.find(p => p.id === id);
    return sum + (prod ? prod.price * qty : 0);
  }, 0);

  const getActiveItems = () => {
    return Object.entries(quantities)
      .filter(([id, qty]) => qty > 0)
      .map(([id, qty]) => {
        const prod = products.find(p => p.id === id);
        const name = locale === 'es' ? prod?.name_es : prod?.name_en;
        const rawPrice = prod?.price || 0;
        const unitPrice = locale === 'es' ? rawPrice * USD_TO_CLP : rawPrice;
        return {
          id,
          name: name || 'Product',
          quantity: qty,
          unitPrice,
          currency: (locale === 'es' ? 'CLP' : 'USD') as 'CLP' | 'USD'
        };
      });
  };

  const handleDownloadPDF = async () => {
    const activeItems = getActiveItems();
    if (activeItems.length > 0) {
      await generateQuotePDF(
        activeItems, 
        locale === 'es' ? 'CLP' : 'USD', 
        locale,
        { vesselName, port, contactEmail }
      );
    }
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const activeItems = getActiveItems();
    const curr = locale === 'es' ? 'CLP' : 'USD';
    const itemizedList = activeItems.map(item => 
      `${item.quantity}x ${item.name} -> Unit: $${item.unitPrice.toLocaleString()} ${curr} | Subtotal: $${(item.quantity * item.unitPrice).toLocaleString()} ${curr}`
    ).join('\n');

    const calculatedTotal = activeItems.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
    const fullRequirements = `--- COTIZACIÓN AUTOMÁTICA NMS ---\n${itemizedList}\n\n${notes ? `OBSERVACIONES / ETA: ${notes}\n\n` : ''}TOTAL ESTIMADO: $${calculatedTotal.toLocaleString()} ${curr}`;

    const { error: dbError } = await supabase.from('quote_requests').insert([
      {
        vessel_name: vesselName,
        port: port,
        contact_email: contactEmail,
        requirements: fullRequirements
      }
    ]);

    if (dbError) {
      alert('Error al registrar en la base de datos.');
      console.error(dbError);
      setSubmitting(false);
      return;
    }

    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vesselName,
          port,
          contactEmail,
          items: activeItems,
          total: calculatedTotal,
          currency: curr,
          locale
        })
      });
    } catch (emailErr) {
      console.error('Error enviando el correo:', emailErr);
    }

    setSubmitting(false);
    setSuccess(true);
    setQuantities({});
    setNotes('');
    router.replace('?', { scroll: false });
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 pb-32">
      <div className="mx-auto max-w-7xl">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-2.5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Buscador Centrado */}
        <div className="mt-8 flex justify-center">
          <div ref={categoryMenuRef} className="relative w-full max-w-2xl">
            <div className="flex items-center rounded-2xl bg-white border border-slate-300 shadow-sm p-1.5 focus-within:ring-2 focus-within:ring-[#E45B25] focus-within:border-[#E45B25] transition-all">
              
              {/* Botón Categorías */}
              <button
                type="button"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isCategoryMenuOpen || selectedCategoryKey !== 'ALL'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="hidden sm:inline">
                  {selectedCategoryKey === 'ALL' 
                    ? (locale === 'es' ? 'Categorías' : 'Categories') 
                    : selectedCategoryKey}
                </span>
                <svg className={`w-3.5 h-3.5 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="relative flex-grow ml-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full bg-transparent border-0 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:ring-0 focus:outline-none"
                />
              </div>

              <div className="pr-3 text-slate-400 flex items-center">
                {searchQuery ? (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
                  >
                    &times;
                  </button>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </div>
            </div>

            {/* Menú Desplegable de Categorías */}
            {isCategoryMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-40">
                <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                  {locale === 'es' ? 'Seleccionar Categoría' : 'Select Category'}
                </div>
                <div className="space-y-1 max-h-60 overflow-y-auto">
                  {categoriesList.map((catLabel) => (
                    <button
                      key={catLabel}
                      onClick={() => {
                        setSelectedCategoryKey(catLabel);
                        setIsCategoryMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        selectedCategoryKey === catLabel
                          ? 'bg-orange-50 text-[#E45B25] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{catLabel === 'ALL' ? t('allCategories') : catLabel}</span>
                      {selectedCategoryKey === catLabel && (
                        <svg className="w-4 h-4 text-[#E45B25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mensaje de Confirmación */}
        {success && (
          <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center text-emerald-900 shadow-sm">
            <h3 className="text-xl font-bold">{t('successTitle')}</h3>
            <p className="mt-2 text-sm">{t('successDesc')}</p>
            <button 
              onClick={() => setSuccess(false)}
              className="mt-4 rounded-xl bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 cursor-pointer"
            >
              {t('newQuote')}
            </button>
          </div>
        )}

        {/* Grilla de Productos */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            const qty = quantities[product.id] || 0;
            const imageUrl = getAccurateProductImage(product);
            const categoryLabel = getCategoryLabel(product.category);

            return (
              <div 
                key={product.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all hover:shadow-md"
              >
                {/* Imagen */}
                <div className="relative h-44 w-full bg-slate-100">
                  <Image
                    src={imageUrl}
                    alt={locale === 'es' ? product.name_es : product.name_en}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 rounded-md bg-slate-900/85 backdrop-blur px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                    {categoryLabel}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-2 leading-snug">
                      {locale === 'es' ? product.name_es : product.name_en}
                    </h3>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-slate-400 font-mono block">
                          {locale === 'es' ? 'Precio / ' : 'Price / '}{formatUnit(product.unit)}
                        </span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
                            {formatPriceNumber(product.price)}
                          </span>
                          <span className="text-[10px] font-bold text-[#E45B25] font-mono">
                            {locale === 'es' ? 'CLP' : 'USD'}
                          </span>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-100">
                        {formatStock(product.stock_status)}
                      </span>
                    </div>

                    {/* Botones de Cantidad */}
                    <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 p-1.5 border border-slate-200">
                      <span className="text-xs font-medium text-slate-600 pl-2 font-mono">
                        {t('quantityLabel')}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="h-7 w-7 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 shadow-sm hover:bg-slate-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-bold text-slate-900 text-sm font-mono">{qty}</span>
                        <button 
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="h-7 w-7 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 shadow-sm hover:bg-slate-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-12 text-center text-slate-500">
            <p className="text-base">{t('noProducts')}</p>
          </div>
        )}

        {/* BARRA FLOTANTE DE RESUMEN Y COTIZACIÓN (GRIS PERLA ELEGANTE CON CONTRASTE DEFINIDO) */}
        {totalItemsCount > 0 && !success && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-100/95 backdrop-blur-md border-t border-slate-300 shadow-[0_-10px_30px_rgba(15,23,42,0.12)] py-4 px-6 sm:px-12 lg:px-16 transition-all duration-300">
            <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* DATOS DE RESUMEN */}
              <div className="flex items-center gap-6 text-left">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                    {t('selectedItems')}
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {totalItemsCount} {locale === 'es' ? 'productos' : 'products'}
                  </span>
                </div>

                <div className="h-8 w-[1px] bg-slate-300" />

                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                    {t('estimatedTotal')}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl sm:text-2xl font-black text-slate-950 font-mono tracking-tight">
                      {formatPriceNumber(totalPriceUSD)}
                    </span>
                    <span className="text-xs font-bold font-mono text-[#E45B25]">
                      {locale === 'es' ? 'CLP' : 'USD'}
                    </span>
                  </div>
                </div>
              </div>

              {/* BOTONES DE ACCIÓN */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleDownloadPDF}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 transition-colors shadow-sm cursor-pointer"
                >
                  <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t('downloadPdf')}
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#E45B25] hover:bg-[#d04e1c] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  {t('submitQuote')}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Modal de Envío de Cotización */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto border border-slate-100">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {t('modalTitle')}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-2xl cursor-pointer"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSubmitQuote} className="mt-6 space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    {t('vesselName')} *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={vesselName}
                    onChange={e => setVesselName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-[#E45B25] focus:ring-1 focus:ring-[#E45B25] focus:outline-none transition-all"
                  />
                  <span className="text-xs text-slate-500 font-medium mt-1 block">
                    {locale === 'es' ? 'Ej. M/V North Star / Remolcador SAAM' : 'E.g. M/V North Star'}
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    {t('port')} *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={port}
                    onChange={e => setPort(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-[#E45B25] focus:ring-1 focus:ring-[#E45B25] focus:outline-none transition-all"
                  />
                  <span className="text-xs text-slate-500 font-medium mt-1 block">
                    {locale === 'es' ? 'Ej. Puerto de Antofagasta / Mejillones' : 'E.g. Port of Antofagasta'}
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    {t('contactEmail')} *
                  </label>
                  <input 
                    type="email" 
                    required
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-[#E45B25] focus:ring-1 focus:ring-[#E45B25] focus:outline-none transition-all"
                  />
                  <span className="text-xs text-slate-500 font-medium mt-1 block">
                    agent@shipping.com
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    {t('notes')}
                  </label>
                  <textarea 
                    rows={2}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-[#E45B25] focus:ring-1 focus:ring-[#E45B25] focus:outline-none transition-all resize-none"
                  />
                  <span className="text-xs text-slate-500 font-medium mt-1 block">
                    {t('notesPlaceholder')}
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                  <p className="text-xs font-semibold text-slate-500 mb-0.5 font-mono">
                    {t('autoDestination')}
                  </p>
                  <p className="text-sm font-bold text-slate-900">commercial@northmaritimeservices.com</p>
                </div>

                <div className="mt-6 flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 rounded-xl border border-slate-200 py-3 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 rounded-xl bg-[#E45B25] hover:bg-[#d04e1c] py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? t('submitting') : t('send')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}