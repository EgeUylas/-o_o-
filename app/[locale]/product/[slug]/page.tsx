import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProductDetailClient } from '@/components/organisms/ProductDetailClient';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { products, getProductBySlug } from '@/data/mock-data';
import type { Metadata } from 'next';

export function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        return { title: 'Product Not Found' };
    }

    const variant = product.variants[0];
    const imageUrl = variant?.thumbnails[0]?.url;

    return {
        title: product.name,
        description: product.description || `${product.name} - ${product.brandName}`,
        openGraph: {
            title: product.name,
            description: product.description || undefined,
            images: imageUrl ? [{ url: imageUrl, width: 800, height: 800 }] : undefined,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
            description: product.description || undefined,
            images: imageUrl ? [imageUrl] : undefined,
        },
        alternates: {
            canonical: `/${locale}/product/${slug}`,
            languages: {
                tr: `/tr/product/${slug}`,
                en: `/en/product/${slug}`,
            },
        },
    };
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const product = getProductBySlug(slug);
    if (!product) {
        notFound();
    }

    const t = await getTranslations('common');

    // benzer ürünler
    const similarProducts = products
        .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
        .slice(0, 4);

    // SEO
    const variant = product.variants[0];
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: variant?.thumbnails.map((t) => t.url),
        brand: {
            '@type': 'Brand',
            name: product.brandName,
        },
        offers: {
            '@type': 'Offer',
            price: variant?.price,
            priceCurrency: 'TRY',
            availability: variant?.stock && variant.stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
        },
    };

    const translations = {
        addToCart: t('addToCart'),
        addedToCart: t('addedToCart'),
        addToFavorites: t('addToFavorites'),
        removeFromFavorites: t('removeFromFavorites'),
        buyNow: t('buyNow'),
        inStock: t('inStock'),
        outOfStock: t('outOfStock'),
        quantity: locale === 'tr' ? 'Adet' : 'Quantity',
        freeShipping: t('freeShipping'),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="text-sm mb-6 text-muted-foreground">
                    <ol className="flex items-center gap-2">
                        <li>
                            <a href={`/${locale}`} className="hover:text-foreground">
                                {locale === 'tr' ? 'Ana Sayfa' : 'Home'}
                            </a>
                        </li>
                        <li>/</li>
                        <li>
                            <a
                                href={`/${locale}/category/${product.categoryName.toLowerCase()}`}
                                className="hover:text-foreground"
                            >
                                {product.categoryName}
                            </a>
                        </li>
                        <li>/</li>
                        <li className="text-foreground font-medium truncate max-w-[200px]">
                            {product.name}
                        </li>
                    </ol>
                </nav>

                {/* Product Detail */}
                <ProductDetailClient
                    product={product}
                    locale={locale}
                    translations={translations}
                />

                {/* Similar Products */}
                {similarProducts.length > 0 && (
                    <section className="mt-16">
                        <h2 className="text-2xl font-bold mb-6">
                            {locale === 'tr' ? 'Benzer Ürünler' : 'Similar Products'}
                        </h2>
                        <ProductGrid products={similarProducts} locale={locale} />
                    </section>
                )}
            </div>
        </>
    );
}
