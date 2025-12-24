'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { Search, Heart, ShoppingCart, Menu, Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { useFavoritesStore } from '@/lib/stores/favorites';
import { useCartStore } from '@/lib/stores/cart';
import { useUIStore } from '@/lib/stores/ui';
import { categories, searchProducts } from '@/data/mock-data';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { cn, formatPrice } from '@/lib/utils';
import { translateCategory } from '@/lib/translations';
import type { Product } from '@/lib/types';

export function Header() {
    const t = useTranslations('common');
    const params = useParams();
    const pathname = usePathname();
    const locale = params.locale as string;
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const favoriteCount = useFavoritesStore((state) => state.favoriteIds.length);
    const cartItemCount = useCartStore((state) => state.getItemCount());
    const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    // dışarı tıklayınca kapat
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // arama sonuçları
    const searchResults = useMemo(() => {
        if (searchQuery.trim().length < 1) return [];
        return searchProducts(searchQuery).slice(0, 5); // max 5 sonuç
    }, [searchQuery]);

    const switchLocale = (newLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;
        return segments.join('/');
    };

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setShowResults(true);
    }, []);

    const handleProductClick = useCallback(() => {
        setSearchQuery('');
        setShowResults(false);
    }, []);

    // arama dropdown
    const SearchResultsDropdown = ({ results, isMobile = false }: { results: Product[]; isMobile?: boolean }) => {
        if (results.length === 0 || !showResults) return null;

        return (
            <div className={cn(
                "absolute left-0 right-0 bg-background border rounded-lg shadow-lg z-50 overflow-hidden",
                isMobile ? "top-full mt-1" : "top-full mt-1"
            )}>
                {results.map((product) => {
                    const variant = product.variants[0];
                    const imageUrl = variant?.thumbnails[0]?.url || '/images/placeholder.jpg';

                    return (
                        <Link
                            key={product.id}
                            href={`/${locale}/product/${product.slug}`}
                            onClick={handleProductClick}
                            className="flex items-center gap-3 p-3 hover:bg-muted transition-colors border-b last:border-b-0"
                        >
                            <div className="relative w-12 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                                <Image
                                    src={imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-orange-500">
                                        {formatPrice(variant?.price || 0, locale === 'tr' ? 'tr-TR' : 'en-US')}
                                    </span>
                                    {product.brandName && (
                                        <span className="text-xs text-muted-foreground">{product.brandName}</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        );
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* Top bar */}
            <div className="hidden md:block border-b bg-muted/30">
                <div className="container mx-auto px-4 py-1.5 flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                        <span>{t('freeShipping')}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href={`/${locale}`} className="hover:text-foreground transition-colors">
                            {t('login')}
                        </Link>
                        <span>|</span>
                        <Link href={`/${locale}`} className="hover:text-foreground transition-colors">
                            {t('register')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main header */}
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                    {/* Mobile menu button */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={toggleMobileMenu}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                            <div className="flex flex-col gap-4 mt-6">
                                <h3 className="font-semibold text-lg">{t('allCategories')}</h3>
                                <nav className="flex flex-col gap-2">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={`/${locale}/category/${category.slug}`}
                                            className="py-2 px-3 rounded-lg hover:bg-muted transition-colors"
                                            onClick={closeMobileMenu}
                                        >
                                            {translateCategory(category.name, locale)}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Logo */}
                    <Link href={`/${locale}`} className="flex items-center gap-2">
                        <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            {t('siteName')}
                        </span>
                    </Link>

                    {/* Search bar - Desktop */}
                    <div ref={searchRef} className="hidden md:flex flex-1 max-w-xl mx-4 relative">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                            <Input
                                type="search"
                                placeholder={t('searchPlaceholder')}
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={() => setShowResults(true)}
                                className="pl-10 pr-4 h-10 w-full"
                            />
                        </div>
                        <SearchResultsDropdown results={searchResults} />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 md:gap-2">
                        {/* Search - Mobile toggle (hidden for now, mobile search is below) */}
                        <Button variant="ghost" size="icon" className="md:hidden" aria-label={locale === 'tr' ? 'Ara' : 'Search'}>
                            <Search className="h-5 w-5" />
                        </Button>

                        {/* Theme toggle */}
                        {mounted && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                aria-label={locale === 'tr' ? 'Tema değiştir' : 'Toggle theme'}
                            >
                                {theme === 'dark' ? (
                                    <Sun className="h-5 w-5" />
                                ) : (
                                    <Moon className="h-5 w-5" />
                                )}
                            </Button>
                        )}

                        {/* Language switcher */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label={locale === 'tr' ? 'Dil seç' : 'Select language'}>
                                    <Globe className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href={switchLocale('tr')} className={cn(locale === 'tr' && 'font-bold')}>
                                        🇹🇷 Türkçe
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={switchLocale('en')} className={cn(locale === 'en' && 'font-bold')}>
                                        🇬🇧 English
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Favorites */}
                        <Link href={`/${locale}/favorites`} aria-label={locale === 'tr' ? 'Favoriler' : 'Favorites'}>
                            <Button variant="ghost" size="icon" className="relative" aria-label={locale === 'tr' ? 'Favoriler' : 'Favorites'}>
                                <Heart className="h-5 w-5" />
                                {mounted && favoriteCount > 0 && (
                                    <Badge
                                        variant="destructive"
                                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                                    >
                                        {favoriteCount}
                                    </Badge>
                                )}
                            </Button>
                        </Link>

                        {/* Cart */}
                        <Link href={`/${locale}/cart`} aria-label={locale === 'tr' ? 'Sepet' : 'Cart'}>
                            <Button variant="ghost" size="icon" className="relative" aria-label={locale === 'tr' ? 'Sepet' : 'Cart'}>
                                <ShoppingCart className="h-5 w-5" />
                                {mounted && cartItemCount > 0 && (
                                    <Badge
                                        variant="destructive"
                                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                                    >
                                        {cartItemCount > 99 ? '99+' : cartItemCount}
                                    </Badge>
                                )}
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile search */}
                <div className="md:hidden mt-3 relative" ref={searchRef}>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                        <Input
                            type="search"
                            placeholder={t('searchPlaceholder')}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => setShowResults(true)}
                            className="pl-10 pr-4 h-10 w-full"
                        />
                    </div>
                    <SearchResultsDropdown results={searchResults} isMobile />
                </div>
            </div>

            {/* Category navigation - Desktop */}
            <nav className="hidden md:block border-t bg-muted/30">
                <div className="container mx-auto px-4">
                    <ul className="flex items-center gap-6 py-2 overflow-x-auto">
                        <li>
                            <Link
                                href={`/${locale}`}
                                className="text-sm font-medium hover:text-orange-500 transition-colors whitespace-nowrap"
                            >
                                {t('home')}
                            </Link>
                        </li>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Link
                                    href={`/${locale}/category/${category.slug}`}
                                    className="text-sm font-medium hover:text-orange-500 transition-colors whitespace-nowrap"
                                >
                                    {translateCategory(category.name, locale)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
