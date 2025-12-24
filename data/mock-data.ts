import type { Product, Category, Brand, ProductStatus } from '@/lib/types';

export const categories: Category[] = [
    {
        id: 1,
        name: 'Elektronik',
        slug: 'elektronik',
        parentId: null,
        imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
        children: [
            { id: 11, name: 'Telefon', slug: 'telefon', parentId: 1, imageUrl: null },
            { id: 12, name: 'Bilgisayar', slug: 'bilgisayar', parentId: 1, imageUrl: null },
            { id: 13, name: 'Televizyon', slug: 'televizyon', parentId: 1, imageUrl: null },
            { id: 14, name: 'Kulaklık', slug: 'kulaklik', parentId: 1, imageUrl: null },
        ],
    },
    {
        id: 2,
        name: 'Moda',
        slug: 'moda',
        parentId: null,
        imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
        children: [
            { id: 21, name: 'Kadın', slug: 'kadin', parentId: 2, imageUrl: null },
            { id: 22, name: 'Erkek', slug: 'erkek', parentId: 2, imageUrl: null },
            { id: 23, name: 'Çocuk', slug: 'cocuk', parentId: 2, imageUrl: null },
        ],
    },
    {
        id: 3,
        name: 'Ev & Yaşam',
        slug: 'ev-yasam',
        parentId: null,
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
        children: [
            { id: 31, name: 'Mobilya', slug: 'mobilya', parentId: 3, imageUrl: null },
            { id: 32, name: 'Dekorasyon', slug: 'dekorasyon', parentId: 3, imageUrl: null },
            { id: 33, name: 'Mutfak', slug: 'mutfak', parentId: 3, imageUrl: null },
        ],
    },
    {
        id: 4,
        name: 'Kozmetik',
        slug: 'kozmetik',
        parentId: null,
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
        children: [
            { id: 41, name: 'Makyaj', slug: 'makyaj', parentId: 4, imageUrl: null },
            { id: 42, name: 'Cilt Bakımı', slug: 'cilt-bakimi', parentId: 4, imageUrl: null },
            { id: 43, name: 'Parfüm', slug: 'parfum', parentId: 4, imageUrl: null },
        ],
    },
    {
        id: 5,
        name: 'Spor',
        slug: 'spor',
        parentId: null,
        imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
        children: [
            { id: 51, name: 'Spor Giyim', slug: 'spor-giyim', parentId: 5, imageUrl: null },
            { id: 52, name: 'Spor Ayakkabı', slug: 'spor-ayakkabi', parentId: 5, imageUrl: null },
            { id: 53, name: 'Fitness', slug: 'fitness', parentId: 5, imageUrl: null },
        ],
    },
    {
        id: 6,
        name: 'Kitap & Hobi',
        slug: 'kitap-hobi',
        parentId: null,
        imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
        children: [
            { id: 61, name: 'Kitap', slug: 'kitap', parentId: 6, imageUrl: null },
            { id: 62, name: 'Müzik Aletleri', slug: 'muzik-aletleri', parentId: 6, imageUrl: null },
        ],
    },
];

export const brands: Brand[] = [
    { id: 1, name: 'Apple', slug: 'apple', logoUrl: null },
    { id: 2, name: 'Samsung', slug: 'samsung', logoUrl: null },
    { id: 3, name: 'Nike', slug: 'nike', logoUrl: null },
    { id: 4, name: 'Adidas', slug: 'adidas', logoUrl: null },
    { id: 5, name: 'Sony', slug: 'sony', logoUrl: null },
    { id: 6, name: 'LG', slug: 'lg', logoUrl: null },
    { id: 7, name: 'Zara', slug: 'zara', logoUrl: null },
    { id: 8, name: 'H&M', slug: 'hm', logoUrl: null },
];

export const products: Product[] = [
    {
        id: 1,
        name: 'iPhone 15 Pro Max 256GB',
        slug: 'iphone-15-pro-max-256gb',
        description: 'Apple iPhone 15 Pro Max, A17 Pro çip, 48MP kamera sistemi, Titanium tasarım. En güçlü iPhone deneyimi.',
        brandId: 1,
        brandName: 'Apple',
        categoryId: 11,
        categoryName: 'Telefon',
        rating: 4.8,
        reviewCount: 1250,
        createdAt: '2024-01-15T10:00:00Z',
        status: 1 as ProductStatus,
        variants: [
            {
                id: 101,
                price: 74999,
                originalPrice: 79999,
                stock: 50,
                barcode: 'APL15PM256BLK',
                sku: 'IPH15PM-256-BLK',
                thumbnails: [
                    { id: 1, url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800', altText: 'iPhone 15 Pro Max' },
                    { id: 2, url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800', altText: 'iPhone Back' },
                ],
                options: [{ id: 1, title: 'Renk', value: 'Siyah Titanyum' }],
            },
            {
                id: 102,
                price: 74999,
                originalPrice: 79999,
                stock: 35,
                barcode: 'APL15PM256WHT',
                sku: 'IPH15PM-256-WHT',
                thumbnails: [
                    { id: 3, url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800', altText: 'iPhone 15 Pro Max White' },
                ],
                options: [{ id: 2, title: 'Renk', value: 'Beyaz Titanyum' }],
            },
        ],
    },
    {
        id: 2,
        name: 'Samsung Galaxy S24 Ultra 512GB',
        slug: 'samsung-galaxy-s24-ultra-512gb',
        description: 'Samsung Galaxy S24 Ultra, Galaxy AI ile donatılmış, S Pen dahil, 200MP kamera.',
        brandId: 2,
        brandName: 'Samsung',
        categoryId: 11,
        categoryName: 'Telefon',
        rating: 4.7,
        reviewCount: 890,
        createdAt: '2024-02-01T10:00:00Z',
        status: 1 as ProductStatus,
        variants: [
            {
                id: 201,
                price: 69999,
                originalPrice: 74999,
                stock: 40,
                barcode: 'SMS24U512BLK',
                sku: 'GS24U-512-BLK',
                thumbnails: [
                    { id: 4, url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800', altText: 'Galaxy S24 Ultra' },
                ],
                options: [{ id: 3, title: 'Renk', value: 'Titanium Black' }],
            },
        ],
    },
    {
        id: 3,
        name: 'Nike Air Max 270',
        slug: 'nike-air-max-270',
        description: 'Nike Air Max 270, maksimum konfor için Air yastıklama teknolojisi. Günlük kullanım için ideal.',
        brandId: 3,
        brandName: 'Nike',
        categoryId: 52,
        categoryName: 'Spor Ayakkabı',
        rating: 4.6,
        reviewCount: 2340,
        createdAt: '2024-01-20T10:00:00Z',
        status: 1 as ProductStatus,
        variants: [
            {
                id: 301,
                price: 3299,
                originalPrice: 3999,
                stock: 100,
                barcode: 'NKA270BLK42',
                sku: 'AM270-BLK-42',
                thumbnails: [
                    { id: 5, url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', altText: 'Nike Air Max 270' },
                ],
                options: [
                    { id: 4, title: 'Renk', value: 'Siyah' },
                    { id: 5, title: 'Numara', value: '42' },
                ],
            },
            {
                id: 302,
                price: 3299,
                originalPrice: 3999,
                stock: 80,
                barcode: 'NKA270WHT42',
                sku: 'AM270-WHT-42',
                thumbnails: [
                    { id: 6, url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800', altText: 'Nike Air Max 270 White' },
                ],
                options: [
                    { id: 6, title: 'Renk', value: 'Beyaz' },
                    { id: 7, title: 'Numara', value: '42' },
                ],
            },
        ],
    },
    {
        id: 4,
        name: 'Sony WH-1000XM5 Kablosuz Kulaklık',
        slug: 'sony-wh-1000xm5-kablosuz-kulaklik',
        description: 'Sony WH-1000XM5, sınıfının en iyi gürültü engelleme özelliği. 30 saat pil ömrü.',
        brandId: 5,
        brandName: 'Sony',
        categoryId: 14,
        categoryName: 'Kulaklık',
        rating: 4.9,
        reviewCount: 567,
        createdAt: '2024-01-25T10:00:00Z',
        status: 1 as ProductStatus,
        variants: [
            {
                id: 401,
                price: 9499,
                originalPrice: 11999,
                stock: 25,
                barcode: 'SNYWH1000XM5BLK',
                sku: 'WH1000XM5-BLK',
                thumbnails: [
                    { id: 7, url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', altText: 'Sony WH-1000XM5' },
                ],
                options: [{ id: 8, title: 'Renk', value: 'Siyah' }],
            },
            {
                id: 402,
                price: 9499,
                originalPrice: 11999,
                stock: 15,
                barcode: 'SNYWH1000XM5SLV',
                sku: 'WH1000XM5-SLV',
                thumbnails: [
                    { id: 8, url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800', altText: 'Sony WH-1000XM5 Silver' },
                ],
                options: [{ id: 9, title: 'Renk', value: 'Gümüş' }],
            },
        ],
    },
    {
        id: 5,
        name: 'MacBook Pro 14" M3 Pro',
        slug: 'macbook-pro-14-m3-pro',
        description: 'Apple MacBook Pro 14 inç, M3 Pro çip, 18GB RAM, 512GB SSD. Profesyoneller için tasarlandı.',
        brandId: 1,
        brandName: 'Apple',
        categoryId: 12,
        categoryName: 'Bilgisayar',
        rating: 4.9,
        reviewCount: 423,
        createdAt: '2024-02-10T10:00:00Z',
        status: 1 as ProductStatus,
        variants: [
            {
                id: 501,
                price: 89999,
                originalPrice: 94999,
                stock: 20,
                barcode: 'MBPM3P14512SG',
                sku: 'MBP14-M3P-512-SG',
                thumbnails: [
                    { id: 9, url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', altText: 'MacBook Pro' },
                ],
                options: [{ id: 10, title: 'Renk', value: 'Uzay Grisi' }],
            },
        ],
    },
    {
        id: 6,
        name: 'Adidas Ultraboost 22',
        slug: 'adidas-ultraboost-22',
        description: 'Adidas Ultraboost 22, enerji geri dönüşümlü BOOST orta taban. Koşu için mükemmel.',
        brandId: 4,
        brandName: 'Adidas',
        categoryId: 52,
        categoryName: 'Spor Ayakkabı',
        rating: 4.5,
        reviewCount: 1890,
        createdAt: '2024-01-18T10:00:00Z',
        status: 1 as ProductStatus,
        variants: [
            {
                id: 601,
                price: 3899,
                originalPrice: 4499,
                stock: 75,
                barcode: 'ADUB22BLK43',
                sku: 'UB22-BLK-43',
                thumbnails: [
                    { id: 10, url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800', altText: 'Adidas Ultraboost' },
                ],
                options: [
                    { id: 11, title: 'Renk', value: 'Siyah' },
                    { id: 12, title: 'Numara', value: '43' },
                ],
            },
        ],
    },
    {
        id: 7,
        name: 'LG 55" OLED 4K Smart TV',
        slug: 'lg-55-oled-4k-smart-tv',
        description: 'LG OLED55C3 serisi, sonsuz kontrast oranı, Dolby Vision & Atmos desteği.',
        brandId: 6,
        brandName: 'LG',
        categoryId: 13,
        categoryName: 'Televizyon',
        rating: 4.8,
        reviewCount: 312,
        createdAt: '2024-02-05T10:00:00Z',
        status: 1 as ProductStatus,
        variants: [
            {
                id: 701,
                price: 42999,
                originalPrice: 49999,
                stock: 15,
                barcode: 'LGOLED55C3',
                sku: 'OLED55C3-2024',
                thumbnails: [
                    { id: 11, url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800', altText: 'LG OLED TV' },
                ],
                options: [{ id: 13, title: 'Boyut', value: '55 inç' }],
            },
        ],
    },
    {
        id: 8,
        name: 'Zara Oversize Blazer Ceket',
        slug: 'zara-oversize-blazer-ceket',
        description: 'Zara koleksiyonundan şık oversize blazer ceket. Premium kumaş kalitesi.',
        brandId: 7,
        brandName: 'Zara',
        categoryId: 21,
        categoryName: 'Kadın',
        rating: 4.3,
        reviewCount: 178,
        createdAt: '2024-02-08T10:00:00Z',
        status: 1 as ProductStatus,
        variants: [
            {
                id: 801,
                price: 1299,
                originalPrice: 1799,
                stock: 45,
                barcode: 'ZRBLZRBLKS',
                sku: 'ZR-BLZ-BLK-S',
                thumbnails: [
                    { id: 12, url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800', altText: 'Zara Blazer' },
                ],
                options: [
                    { id: 14, title: 'Renk', value: 'Siyah' },
                    { id: 15, title: 'Beden', value: 'S' },
                ],
            },
            {
                id: 802,
                price: 1299,
                originalPrice: 1799,
                stock: 40,
                barcode: 'ZRBLZRBLKM',
                sku: 'ZR-BLZ-BLK-M',
                thumbnails: [
                    { id: 12, url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800', altText: 'Zara Blazer' },
                ],
                options: [
                    { id: 14, title: 'Renk', value: 'Siyah' },
                    { id: 16, title: 'Beden', value: 'M' },
                ],
            },
        ],
    },
];

// yardımcı fonksiyonlar
export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
}

export function getProductById(id: number): Product | undefined {
    return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: number): Product[] {
    return products.filter((p) => p.categoryId === categoryId);
}

export function getCategoryBySlug(slug: string): Category | undefined {
    const findCategory = (cats: Category[]): Category | undefined => {
        for (const cat of cats) {
            if (cat.slug === slug) return cat;
            if (cat.children) {
                const found = findCategory(cat.children);
                if (found) return found;
            }
        }
        return undefined;
    };
    return findCategory(categories);
}

export function searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return products.filter(
        (p) =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.description?.toLowerCase().includes(lowerQuery) ||
            p.brandName?.toLowerCase().includes(lowerQuery) ||
            p.categoryName.toLowerCase().includes(lowerQuery)
    );
}

export function getFeaturedProducts(): Product[] {
    return products.slice(0, 8);
}

export function getBestSellers(): Product[] {
    return [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 4);
}
