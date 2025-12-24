'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Minus, Plus, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useFavoritesStore } from '@/lib/stores/favorites';
import { useCartStore } from '@/lib/stores/cart';
import type { Product, ProductVariant } from '@/lib/types';
import { formatPrice, calculateDiscount, cn } from '@/lib/utils';

interface ProductDetailClientProps {
    product: Product;
    locale: string;
    translations: {
        addToCart: string;
        addedToCart: string;
        addToFavorites: string;
        removeFromFavorites: string;
        buyNow: string;
        inStock: string;
        outOfStock: string;
        quantity: string;
        freeShipping: string;
    };
}

export function ProductDetailClient({ product, locale, translations }: ProductDetailClientProps) {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const { toggleFavorite, isFavorite } = useFavoritesStore();
    const { addToCart, isInCart } = useCartStore();

    const discount = selectedVariant?.originalPrice
        ? calculateDiscount(selectedVariant.originalPrice, selectedVariant.price)
        : 0;
    const isFav = isFavorite(product.id);
    const inCart = isInCart(selectedVariant?.id || 0);

    const handleAddToCart = () => {
        if (selectedVariant) {
            addToCart(product, selectedVariant, quantity);
        }
    };

    const handleBuyNow = () => {
        handleAddToCart();
        window.location.href = `/${locale}/cart`;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
                <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative aspect-square rounded-xl overflow-hidden bg-muted"
                >
                    <Image
                        src={selectedVariant?.thumbnails[selectedImage]?.url || '/images/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    {discount > 0 && (
                        <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-lg px-3 py-1">
                            -{discount}%
                        </Badge>
                    )}
                </motion.div>

                {/* Thumbnails */}
                {selectedVariant?.thumbnails.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {selectedVariant.thumbnails.map((thumb, idx) => (
                            <button
                                key={thumb.id}
                                onClick={() => setSelectedImage(idx)}
                                className={cn(
                                    'relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors',
                                    selectedImage === idx ? 'border-orange-500' : 'border-transparent'
                                )}
                            >
                                <Image src={thumb.url} alt="" fill className="object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
                {/* Brand */}
                {product.brandName && (
                    <p className="text-sm font-medium text-orange-500 uppercase tracking-wide">
                        {product.brandName}
                    </p>
                )}

                {/* Title */}
                <h1 className="text-2xl lg:text-3xl font-bold">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={cn(
                                    'h-5 w-5',
                                    i < Math.floor(product.rating)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                )}
                            />
                        ))}
                    </div>
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">
                        ({product.reviewCount} {locale === 'tr' ? 'değerlendirme' : 'reviews'})
                    </span>
                </div>

                {/* Price */}
                <div className="space-y-1">
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-orange-500">
                            {formatPrice(selectedVariant?.price || 0, locale === 'tr' ? 'tr-TR' : 'en-US')}
                        </span>
                        {selectedVariant?.originalPrice && selectedVariant.originalPrice > selectedVariant.price && (
                            <span className="text-xl text-muted-foreground line-through">
                                {formatPrice(selectedVariant.originalPrice, locale === 'tr' ? 'tr-TR' : 'en-US')}
                            </span>
                        )}
                    </div>
                </div>

                <Separator />

                {/* Variant Options */}
                {product.variants.length > 1 && (
                    <div className="space-y-3">
                        <p className="font-medium">
                            {selectedVariant?.options[0]?.title || (locale === 'tr' ? 'Seçenekler' : 'Options')}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {product.variants.map((variant) => (
                                <Button
                                    key={variant.id}
                                    variant={selectedVariant?.id === variant.id ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => {
                                        setSelectedVariant(variant);
                                        setSelectedImage(0);
                                    }}
                                    className={cn(
                                        selectedVariant?.id === variant.id && 'bg-orange-500 hover:bg-orange-600'
                                    )}
                                >
                                    {variant.options.map((o) => o.value).join(' / ')}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quantity */}
                <div className="space-y-3">
                    <p className="font-medium">{translations.quantity}</p>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            disabled={quantity <= 1}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(Math.min(selectedVariant?.stock || 10, quantity + 1))}
                            disabled={quantity >= (selectedVariant?.stock || 10)}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            {selectedVariant?.stock} {locale === 'tr' ? 'adet stokta' : 'in stock'}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        size="lg"
                        className={cn(
                            'flex-1',
                            inCart ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'
                        )}
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        {inCart ? translations.addedToCart : translations.addToCart}
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1" onClick={handleBuyNow}>
                        {translations.buyNow}
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className={cn(isFav && 'text-red-500')}
                        onClick={() => toggleFavorite(product.id)}
                    >
                        <Heart className={cn('h-5 w-5', isFav && 'fill-current')} />
                    </Button>
                </div>

                <Separator />

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Truck className="h-5 w-5 text-orange-500" />
                        <span className="text-sm">{translations.freeShipping}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Shield className="h-5 w-5 text-orange-500" />
                        <span className="text-sm">{locale === 'tr' ? 'Güvenli Ödeme' : 'Secure Payment'}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <RotateCcw className="h-5 w-5 text-orange-500" />
                        <span className="text-sm">{locale === 'tr' ? '14 Gün İade' : '14 Day Return'}</span>
                    </div>
                </div>

                {/* Description */}
                {product.description && (
                    <div className="space-y-3">
                        <h3 className="font-semibold">{locale === 'tr' ? 'Açıklama' : 'Description'}</h3>
                        <p className="text-muted-foreground">{product.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
