import { supabase } from '@/lib/supabase';
import CatalogClient from '@/components/CatalogClient';

export const revalidate = 60;

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

const fallbackProducts: Product[] = [
  {
    id: '1',
    name_es: 'Carne Vacuno (Lomo / Posta)',
    name_en: 'Beef Meat (Loin / Cut)',
    category: 'Provisión Fresca & Congelada',
    unit: 'Kg',
    price: 12.5,
    stock_status: 'In Stock',
    image_url: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    name_es: 'Pechuga de Pollo',
    name_en: 'Chicken Breast',
    category: 'Provisión Fresca & Congelada',
    unit: 'Kg',
    price: 6.8,
    stock_status: 'In Stock',
    image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    name_es: 'Pescado Fresco / Congelado (Salmón/Reineta)',
    name_en: 'Fresh / Frozen Fish (Salmon/Reineta)',
    category: 'Provisión Fresca & Congelada',
    unit: 'Kg',
    price: 14.0,
    stock_status: 'In Stock',
    image_url: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '4',
    name_es: 'Arroz Grano Largo (Saco 25kg)',
    name_en: 'Long Grain Rice (25kg Bag)',
    category: 'Víveres Secos & Rancho',
    unit: 'Saco / Bag',
    price: 28.0,
    stock_status: 'In Stock',
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '5',
    name_es: 'Aceite Vegetal / Maravilla (Caja 12x1L)',
    name_en: 'Vegetable Oil (Box 12x1L)',
    category: 'Víveres Secos & Rancho',
    unit: 'Caja / Box',
    price: 32.0,
    stock_status: 'In Stock',
    image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '6',
    name_es: 'Agua Mineral Sin Gas (Pack 6x1.5L)',
    name_en: 'Still Mineral Water (Pack 6x1.5L)',
    category: 'Bebidas & Consumo',
    unit: 'Pack',
    price: 7.5,
    stock_status: 'In Stock',
    image_url: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '7',
    name_es: 'Frutas de Estación (Manzanas, Naranjas, Plátanos)',
    name_en: 'Seasonal Fresh Fruits (Apples, Oranges, Bananas)',
    category: 'Frutas & Verduras Frescas',
    unit: 'Kg',
    price: 3.2,
    stock_status: 'In Stock',
    image_url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '8',
    name_es: 'Verduras Variadas (Papas, Cebollas, Tomates)',
    name_en: 'Assorted Fresh Vegetables (Potatoes, Onions, Tomatoes)',
    category: 'Frutas & Verduras Frescas',
    unit: 'Kg',
    price: 2.8,
    stock_status: 'In Stock',
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
  }
];

export default async function CatalogPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let products: Product[] = fallbackProducts;

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('category', { ascending: true });

    if (!error && data && data.length > 0) {
      products = data as Product[];
    }
  } catch (err) {
    console.error('Error fetching products from Supabase, using fallback:', err);
  }

  return <CatalogClient products={products} locale={locale} />;
}