import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { categories, products, getCategoryBySlug } from '@/data/mock-data';
import { translateCategory } from '@/lib/translations';
import type { Metadata } from 'next';

export function generateStaticParams() {
    const getAllSlugs = (cats: typeof categories): { slug: string }[] => {
        return cats.flatMap((cat) => [
            { slug: cat.slug },
            ...(cat.children ? getAllSlugs(cat.children) : []),
        ]);
    };
    return getAllSlugs(categories);
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const category = getCategoryBySlug(slug);

    if (!category) {
        return { title: 'Category Not Found' };
    }

    return {
        title: category.name,
        description: locale === 'tr'
            ? `${category.name} kategorisindeki tüm ürünleri keşfedin.`
            : `Discover all products in ${category.name} category.`,
        openGraph: {
            title: category.name,
            images: category.imageUrl ? [{ url: category.imageUrl }] : undefined,
        },
        alternates: {
            canonical: `/${locale}/category/${slug}`,
            languages: {
                tr: `/tr/category/${slug}`,
                en: `/en/category/${slug}`,
            },
        },
    };
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const category = getCategoryBySlug(slug);
    if (!category) {
        notFound();
    }

    // bu kategorideki ürünleri al
    const getCategoryIds = (cat: typeof category): number[] => {
        const ids = [cat.id];
        if (cat.children) {
            cat.children.forEach((child) => {
                ids.push(...getCategoryIds(child));
            });
        }
        return ids;
    };

    const categoryIds = getCategoryIds(category);
    const categoryProducts = products.filter((p) => categoryIds.includes(p.categoryId));

    // SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: category.name,
        url: `https://o-o-nine.vercel.app/${locale}/category/${slug}`,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-4 py-8">
                <nav className="text-sm mb-6 text-muted-foreground">
                    <ol className="flex items-center gap-2">
                        <li>
                            <a href={`/${locale}`} className="hover:text-foreground">
                                {locale === 'tr' ? 'Ana Sayfa' : 'Home'}
                            </a>
                        </li>
                        <li>/</li>
                        <li className="text-foreground font-medium">{translateCategory(category.name, locale)}</li>
                    </ol>
                </nav>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">{translateCategory(category.name, locale)}</h1>
                    <p className="text-muted-foreground">
                        {categoryProducts.length} {locale === 'tr' ? 'ürün bulundu' : 'products found'}
                    </p>
                </div>

                {/* Subcategories */}
                {category.children && category.children.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {category.children.map((child) => (
                            <a
                                key={child.id}
                                href={`/${locale}/category/${child.slug}`}
                                className="px-4 py-2 rounded-full bg-muted hover:bg-orange-100 dark:hover:bg-orange-950 transition-colors text-sm font-medium"
                            >
                                {translateCategory(child.name, locale)}
                            </a>
                        ))}
                    </div>
                )}

                {/* Products */}
                {categoryProducts.length > 0 ? (
                    <ProductGrid products={categoryProducts} locale={locale} />
                ) : (
                    <div className="py-16 text-center text-muted-foreground">
                        {locale === 'tr'
                            ? 'Bu kategoride henüz ürün bulunmuyor.'
                            : 'No products found in this category yet.'}
                    </div>
                )}
            </div>
        </>
    );
}
