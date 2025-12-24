import type { MetadataRoute } from 'next';
import { products, categories } from '@/data/mock-data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://caseticaret.vercel.app';
    const locales = ['tr', 'en'];

    const staticPages = locales.flatMap((locale) => [
        {
            url: `${baseUrl}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/${locale}/favorites`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/${locale}/cart`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.5,
        },
    ]);

    const productPages = locales.flatMap((locale) =>
        products.map((product) => ({
            url: `${baseUrl}/${locale}/product/${product.slug}`,
            lastModified: new Date(product.createdAt),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))
    );

    const getAllCategories = (cats: typeof categories): typeof categories => {
        return cats.flatMap((cat) => [cat, ...(cat.children ? getAllCategories(cat.children) : [])]);
    };

    const categoryPages = locales.flatMap((locale) =>
        getAllCategories(categories).map((category) => ({
            url: `${baseUrl}/${locale}/category/${category.slug}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.7,
        }))
    );

    return [...staticPages, ...productPages, ...categoryPages];
}
