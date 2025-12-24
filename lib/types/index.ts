// ürün tipleri
export interface ProductVariantOption {
    id: number;
    title: string;
    value: string;
}

export interface ProductImage {
    id: number;
    url: string;
    altText: string | null;
}

export interface ProductVariant {
    id: number;
    price: number;
    originalPrice?: number;
    stock: number;
    barcode: string;
    sku: string;
    thumbnails: ProductImage[];
    options: ProductVariantOption[];
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    brandId: number | null;
    brandName: string | null;
    categoryId: number;
    categoryName: string;
    variants: ProductVariant[];
    rating: number;
    reviewCount: number;
    createdAt: string;
    status: ProductStatus;
}

export enum ProductStatus {
    Draft = 0,
    Active = 1,
    Archived = 2,
    Deleted = 3,
}

// kategori tipleri
export interface Category {
    id: number;
    name: string;
    slug: string;
    parentId: number | null;
    imageUrl: string | null;
    children?: Category[];
}

// sepet tipleri
export interface CartItem {
    id: number;
    productId: number;
    variantId: number;
    quantity: number;
    isSelected: boolean;
    product: Product;
    variant: ProductVariant;
}

export interface Cart {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

// marka
export interface Brand {
    id: number;
    name: string;
    slug: string;
    logoUrl: string | null;
}

// arama ve filtreleme
export interface SearchFilters {
    query?: string;
    categoryId?: number;
    brandIds?: number[];
    minPrice?: number;
    maxPrice?: number;
    sortBy: SortBy;
    page: number;
    limit: number;
}

export enum SortBy {
    Newest = 0,
    Oldest = 1,
    PriceLowToHigh = 2,
    PriceHighToLow = 3,
    MostPopular = 4,
    BestRating = 5,
    MostReviewed = 6,
    Alphabetical = 7,
}

// sayfalama
export interface PaginatedResponse<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

// yorumlar
export interface ProductComment {
    id: number;
    userId: number;
    userName: string;
    starCount: number;
    text: string;
    createdAt: string;
}

// UI tipleri
export type Theme = 'light' | 'dark' | 'system';

export type Locale = 'tr' | 'en';
