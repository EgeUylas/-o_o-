'use client';

import { memo, useMemo } from 'react';
import { ProductCard } from '@/components/molecules/ProductCard';
import type { Product } from '@/lib/types';

interface ProductGridProps {
    products: Product[];
    locale: string;
}

// ürün grid
export const ProductGrid = memo(function ProductGrid({ products, locale }: ProductGridProps) {
    // ürün listesini memo'la
    const productCards = useMemo(
        () =>
            products.map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
            )),
        [products, locale]
    );

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {productCards}
        </div>
    );
});

ProductGrid.displayName = 'ProductGrid';
