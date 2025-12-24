'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore } from '@/lib/stores/cart';
import { useFavoritesStore } from '@/lib/stores/favorites';
import { formatPrice, cn } from '@/lib/utils';

export default function CartPage() {
    const t = useTranslations('cart');
    const tCommon = useTranslations('common');
    const params = useParams();
    const locale = params.locale as string;

    const {
        items,
        removeFromCart,
        updateQuantity,
        toggleItemSelection,
        selectAll,
        getSelectedTotalPrice,
        getSelectedItemCount,
    } = useCartStore();

    const { toggleFavorite, isFavorite } = useFavoritesStore();

    const allSelected = items.length > 0 && items.every((item) => item.isSelected);
    const selectedTotal = getSelectedTotalPrice();
    const selectedCount = getSelectedItemCount();
    const shippingFree = selectedTotal >= 100;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-8">
                <ShoppingCart className="h-6 w-6" />
                <h1 className="text-2xl font-bold">{t('title')}</h1>
                <Badge variant="secondary">{items.length} {locale === 'tr' ? 'ürün' : 'items'}</Badge>
            </div>

            {items.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                >
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{tCommon('emptyCart')}</h2>
                    <p className="text-muted-foreground mb-6 max-w-md">
                        {locale === 'tr'
                            ? 'Sepetinizde ürün bulunmuyor. Alışverişe başlamak için ürünleri keşfedin.'
                            : 'Your cart is empty. Start shopping by exploring products.'}
                    </p>
                    <Link href={`/${locale}`}>
                        <Button className="bg-orange-500 hover:bg-orange-600">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            {tCommon('continueShopping')}
                        </Button>
                    </Link>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Select All */}
                        <Card>
                            <CardContent className="p-4 flex items-center gap-3">
                                <Checkbox
                                    checked={allSelected}
                                    onCheckedChange={(checked) => selectAll(!!checked)}
                                />
                                <span className="font-medium">{t('selectAll')}</span>
                            </CardContent>
                        </Card>

                        {/* Items */}
                        <AnimatePresence>
                            {items.map((item) => (
                                <motion.div
                                    key={item.variantId}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <Card>
                                        <CardContent className="p-4">
                                            <div className="flex gap-4">
                                                {/* Checkbox */}
                                                <Checkbox
                                                    checked={item.isSelected}
                                                    onCheckedChange={() => toggleItemSelection(item.variantId)}
                                                    className="mt-4"
                                                />

                                                {/* Image */}
                                                <Link href={`/${locale}/product/${item.product.slug}`}>
                                                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                                        <Image
                                                            src={item.variant.thumbnails[0]?.url || '/images/placeholder.jpg'}
                                                            alt={item.product.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </Link>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <Link href={`/${locale}/product/${item.product.slug}`}>
                                                        <h3 className="font-medium hover:text-orange-500 transition-colors line-clamp-2">
                                                            {item.product.name}
                                                        </h3>
                                                    </Link>
                                                    {item.variant.options.length > 0 && (
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            {item.variant.options.map((o) => `${o.title}: ${o.value}`).join(', ')}
                                                        </p>
                                                    )}

                                                    <div className="flex items-center gap-4 mt-3">
                                                        {/* Quantity */}
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </Button>
                                                            <span className="w-8 text-center">{item.quantity}</span>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                                                disabled={item.quantity >= item.variant.stock}
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </Button>
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => toggleFavorite(item.productId)}
                                                                className={isFavorite(item.productId) ? 'text-red-500' : ''}
                                                            >
                                                                <Heart className={`h-4 w-4 ${isFavorite(item.productId) ? 'fill-current' : ''}`} />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-destructive"
                                                                onClick={() => removeFromCart(item.variantId)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <p className="font-bold text-lg text-orange-500">
                                                        {formatPrice(item.variant.price * item.quantity, locale === 'tr' ? 'tr-TR' : 'en-US')}
                                                    </p>
                                                    {item.quantity > 1 && (
                                                        <p className="text-xs text-muted-foreground">
                                                            {formatPrice(item.variant.price, locale === 'tr' ? 'tr-TR' : 'en-US')} / {locale === 'tr' ? 'adet' : 'each'}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardContent className="p-6 space-y-4">
                                <h2 className="font-bold text-lg">{t('orderSummary')}</h2>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            {locale === 'tr' ? 'Seçili Ürünler' : 'Selected Items'} ({selectedCount})
                                        </span>
                                        <span>{formatPrice(selectedTotal, locale === 'tr' ? 'tr-TR' : 'en-US')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            {locale === 'tr' ? 'Kargo' : 'Shipping'}
                                        </span>
                                        <span className={cn(shippingFree && 'text-green-500')}>
                                            {shippingFree ? (locale === 'tr' ? 'Ücretsiz' : 'Free') : formatPrice(29.99, locale === 'tr' ? 'tr-TR' : 'en-US')}
                                        </span>
                                    </div>
                                </div>

                                {!shippingFree && (
                                    <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 text-sm">
                                        <p className="text-orange-600 dark:text-orange-400">
                                            {locale === 'tr'
                                                ? `${formatPrice(100 - selectedTotal, 'tr-TR')} daha ekleyin, kargo bedava!`
                                                : `Add ${formatPrice(100 - selectedTotal, 'en-US')} more for free shipping!`}
                                        </p>
                                    </div>
                                )}

                                <Separator />

                                <div className="flex justify-between font-bold text-lg">
                                    <span>{tCommon('total')}</span>
                                    <span className="text-orange-500">
                                        {formatPrice(selectedTotal + (shippingFree ? 0 : 29.99), locale === 'tr' ? 'tr-TR' : 'en-US')}
                                    </span>
                                </div>

                                <Button
                                    size="lg"
                                    className="w-full bg-orange-500 hover:bg-orange-600"
                                    disabled={selectedCount === 0}
                                >
                                    {t('proceedToCheckout')}
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>

                                <Link href={`/${locale}`} className="block">
                                    <Button variant="outline" size="lg" className="w-full">
                                        {tCommon('continueShopping')}
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
