'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/molecules/ProductCard';
import { useFavoritesStore } from '@/lib/stores/favorites';
import { products } from '@/data/mock-data';

export default function FavoritesPage() {
    const t = useTranslations('common');
    const params = useParams();
    const locale = params.locale as string;

    const { favoriteIds, clearFavorites } = useFavoritesStore();
    const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id));

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Heart className="h-6 w-6 text-red-500" />
                        {t('favorites')}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {favoriteProducts.length}{' '}
                        {locale === 'tr' ? 'ürün favorilerinizde' : 'products in your favorites'}
                    </p>
                </div>
                {favoriteProducts.length > 0 && (
                    <Button variant="outline" size="sm" onClick={clearFavorites}>
                        {locale === 'tr' ? 'Tümünü Temizle' : 'Clear All'}
                    </Button>
                )}
            </div>

            {favoriteProducts.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                >
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                        <Heart className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{t('emptyFavorites')}</h2>
                    <p className="text-muted-foreground mb-6 max-w-md">
                        {locale === 'tr'
                            ? 'Beğendiğiniz ürünleri favorilerinize ekleyerek daha sonra kolayca ulaşabilirsiniz.'
                            : 'Add products you like to your favorites for easy access later.'}
                    </p>
                    <Link href={`/${locale}`}>
                        <Button className="bg-orange-500 hover:bg-orange-600">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            {t('continueShopping')}
                        </Button>
                    </Link>
                </motion.div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {favoriteProducts.map((product) => (
                        <ProductCard key={product.id} product={product} locale={locale} />
                    ))}
                </div>
            )}
        </div>
    );
}
