import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HeroBanner } from '@/components/organisms/HeroBanner';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { CategoryCard } from '@/components/molecules/CategoryCard';
import { products, categories, getFeaturedProducts, getBestSellers } from '@/data/mock-data';
import type { Metadata } from 'next';

export const revalidate = 3600; // 1 saat sonra yenile

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'common' });

    return {
        title: t('siteName'),
        alternates: {
            canonical: `/${locale}`,
            languages: {
                'tr': '/tr',
                'en': '/en',
            },
        },
    };
}

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('home');
    const featuredProducts = getFeaturedProducts();
    const bestSellers = getBestSellers();

    // SEO için JSON-LD
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'CaseTicaret',
        url: `https://caseticaret.vercel.app/${locale}`,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `https://caseticaret.vercel.app/${locale}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-4 py-6 space-y-12">
                {/* Hero Banner */}
                <HeroBanner
                    title={t('heroBanner.title')}
                    subtitle={t('heroBanner.subtitle')}
                    cta={t('heroBanner.cta')}
                    locale={locale}
                />

                {/* Popular Categories */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">{t('popularCategories')}</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} locale={locale} />
                        ))}
                    </div>
                </section>

                {/* Featured Products */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">{t('featuredProducts')}</h2>
                    </div>
                    <ProductGrid products={featuredProducts} locale={locale} />
                </section>

                {/* Best Sellers */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">{t('bestSellers')}</h2>
                    </div>
                    <ProductGrid products={bestSellers} locale={locale} />
                </section>

            </div>
        </>
    );
}
