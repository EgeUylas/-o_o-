'use client';

import { memo, useMemo, useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFavoritesStore } from '@/lib/stores/favorites';
import { useCartStore } from '@/lib/stores/cart';
import type { Product } from '@/lib/types';
import { formatPrice, calculateDiscount, cn } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
    locale: string;
}

// re-render önlemek için memo
export const ProductCard = memo(function ProductCard({ product, locale }: ProductCardProps) {
    const { toggleFavorite, isFavorite } = useFavoritesStore();
    const { addToCart, isInCart } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // hesaplanmış değerler
    const variant = useMemo(() => product.variants[0], [product.variants]);

    const imageUrl = useMemo(
        () => variant?.thumbnails[0]?.url || '/images/placeholder.jpg',
        [variant?.thumbnails]
    );

    const discount = useMemo(
        () => variant?.originalPrice ? calculateDiscount(variant.originalPrice, variant.price) : 0,
        [variant?.originalPrice, variant?.price]
    );

    // hydration hatası olmasın diye mount sonrası oku
    const isFav = mounted ? isFavorite(product.id) : false;
    const inCart = mounted ? isInCart(variant?.id || 0) : false;

    // fiyat formatla
    const formattedPrice = useMemo(
        () => formatPrice(variant?.price || 0, locale === 'tr' ? 'tr-TR' : 'en-US'),
        [variant?.price, locale]
    );

    const formattedOriginalPrice = useMemo(
        () => (variant?.originalPrice && variant.originalPrice > variant.price)
            ? formatPrice(variant.originalPrice, locale === 'tr' ? 'tr-TR' : 'en-US')
            : null,
        [variant?.originalPrice, variant?.price, locale]
    );

    // callback'ler
    const handleAddToCart = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (variant) {
            addToCart(product, variant);
        }
    }, [addToCart, product, variant]);

    const handleToggleFavorite = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(product.id);
    }, [toggleFavorite, product.id]);

    // buton yazısı
    const cartButtonText = useMemo(() => {
        if (inCart) {
            return locale === 'tr' ? 'Sepette' : 'In Cart';
        }
        return locale === 'tr' ? 'Sepete Ekle' : 'Add to Cart';
    }, [inCart, locale]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -4 }}
        >
            <Link href={`/${locale}/product/${product.slug}`}>
                <Card className="group overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0">
                        {/* Image container */}
                        <div className="relative aspect-square overflow-hidden bg-muted">
                            <Image
                                src={imageUrl}
                                alt={product.name}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            {/* Discount badge */}
                            {discount > 0 && (
                                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                    -{discount}%
                                </Badge>
                            )}

                            {/* Favorite button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    'absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm',
                                    isFav && 'text-red-500'
                                )}
                                onClick={handleToggleFavorite}
                            >
                                <Heart className={cn('h-4 w-4', isFav && 'fill-current')} />
                            </Button>

                            {/* Quick add to cart */}
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Button
                                    size="sm"
                                    className={cn(
                                        'w-full',
                                        inCart
                                            ? 'bg-green-500 hover:bg-green-600'
                                            : 'bg-orange-500 hover:bg-orange-600'
                                    )}
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    {cartButtonText}
                                </Button>
                            </div>
                        </div>

                        {/* Product info */}
                        <div className="p-3 space-y-2">
                            {/* Brand */}
                            {product.brandName && (
                                <p className="text-xs font-medium text-orange-500 uppercase tracking-wide">
                                    {product.brandName}
                                </p>
                            )}

                            {/* Title */}
                            <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">
                                {product.name}
                            </h3>

                            {/* Rating */}
                            <div className="flex items-center gap-1">
                                <div className="flex items-center">
                                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs font-medium ml-1">{product.rating}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    ({product.reviewCount})
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2 pt-1">
                                <span className="text-lg font-bold text-orange-500">
                                    {formattedPrice}
                                </span>
                                {formattedOriginalPrice && (
                                    <span className="text-sm text-muted-foreground line-through">
                                        {formattedOriginalPrice}
                                    </span>
                                )}
                            </div>

                            {/* Free shipping badge */}
                            {variant && variant.price >= 100 && (
                                <Badge variant="secondary" className="text-xs">
                                    {locale === 'tr' ? 'Ücretsiz Kargo' : 'Free Shipping'}
                                </Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
});

// Display name for debugging
ProductCard.displayName = 'ProductCard';
