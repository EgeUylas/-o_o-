import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { Category } from '@/lib/types';
import { translateCategory } from '@/lib/translations';

interface CategoryCardProps {
    category: Category;
    locale: string;
}

// kategori kartı
export const CategoryCard = memo(function CategoryCard({ category, locale }: CategoryCardProps) {
    const translatedName = translateCategory(category.name, locale);

    return (
        <Link href={`/${locale}/category/${category.slug}`}>
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                        {category.imageUrl ? (
                            <Image
                                src={category.imageUrl}
                                alt={translatedName}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-white font-semibold text-lg group-hover:text-orange-300 transition-colors">
                                {translatedName}
                            </h3>
                            {category.children && category.children.length > 0 && (
                                <p className="text-white/70 text-sm mt-1">
                                    {category.children.length}{' '}
                                    {locale === 'tr' ? 'alt kategori' : 'subcategories'}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
});

CategoryCard.displayName = 'CategoryCard';
