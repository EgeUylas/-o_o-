# CaseTicaret - Pazaryeri Frontend

Modern, ölçeklenebilir bir e-ticaret pazaryeri frontend uygulaması. Next.js 16, TypeScript, Tailwind CSS ve shadcn/ui ile geliştirilmiştir.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)
![React](https://img.shields.io/badge/React-19-61dafb)

---

## 📋 İçindekiler

1. [Kurulum & Çalıştırma](#-kurulum--çalıştırma)
2. [Proje Mimarisi](#-proje-mimarisi)
3. [Rendering & State Kararları](#-rendering--state-kararları)
4. [Varsayımlar ve Trade-off'lar](#-varsayımlar-ve-trade-offlar)
5. [Özellikler](#-özellikler)
6. [Teknolojiler](#-kullanılan-teknolojiler)

---

## 🛠️ Kurulum & Çalıştırma

### Gereksinimler
- Node.js 20.x veya üzeri
- npm 10.x veya üzeri

### Kurulum

```bash
# Repository'yi klonla
git clone https://github.com/[username]/caseticaret.git
cd caseticaret

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.
- Türkçe: http://localhost:3000/tr
- İngilizce: http://localhost:3000/en

### Diğer Komutlar

```bash
# Production build
npm run build

# Production sunucusu
npm start

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

### Docker ile Çalıştırma

```bash
# Production build & run
docker-compose up --build

# Sadece build
docker build -t caseticaret .
docker run -p 3000:3000 caseticaret
```

---

## 🏗️ Proje Mimarisi

### Klasör Yapısı

```
caseticaret/
├── app/                        # Next.js App Router
│   ├── [locale]/               # i18n dynamic routing (tr/en)
│   │   ├── page.tsx            # Ana Sayfa
│   │   ├── layout.tsx          # Locale Layout (Header, Footer, Providers)
│   │   ├── product/[slug]/     # Ürün Detay Sayfası
│   │   ├── category/[slug]/    # Kategori Sayfası
│   │   ├── favorites/          # Favoriler Sayfası
│   │   ├── cart/               # Sepet Sayfası
│   │   ├── not-found.tsx       # 404 Hata Sayfası
│   │   └── error.tsx           # 500 Hata Sayfası
│   ├── layout.tsx              # Root Layout
│   ├── globals.css             # Global Styles
│   ├── sitemap.ts              # Dynamic Sitemap
│   └── robots.ts               # Robots.txt
│
├── components/                 # React Components (Atomic Design)
│   ├── ui/                     # shadcn/ui Atoms (Button, Input, Badge...)
│   ├── molecules/              # Molecules (ProductCard, CategoryCard)
│   ├── organisms/              # Organisms (Header, Footer, ProductGrid)
│   └── providers/              # Context Providers (ThemeProvider)
│
├── lib/                        # Core Utilities
│   ├── stores/                 # Zustand State Management
│   │   ├── favorites.ts        # Favori ürünler store
│   │   ├── cart.ts             # Sepet store
│   │   └── ui.ts               # UI state (theme, sidebar)
│   ├── types/                  # TypeScript Interfaces
│   │   └── index.ts            # Product, Category, Cart types
│   └── utils.ts                # Helper functions
│
├── data/                       # Data Layer
│   └── mock-data.ts            # Mock ürün ve kategori verileri
│
├── messages/                   # Internationalization
│   ├── tr.json                 # Türkçe çeviriler
│   └── en.json                 # İngilizce çeviriler
│
├── i18n/                       # next-intl Configuration
│   ├── request.ts              # Server request config
│   └── routing.ts              # Locale routing config
│
└── middleware.ts               # i18n Middleware
```

### Component Mimarisi (Atomic Design)

```
┌─────────────────────────────────────────────────────────────┐
│                        PAGES                                 │
│  (app/[locale]/page.tsx, app/[locale]/product/[slug]/...)   │
├─────────────────────────────────────────────────────────────┤
│                      ORGANISMS                               │
│      Header, Footer, ProductGrid, HeroBanner, etc.          │
├─────────────────────────────────────────────────────────────┤
│                      MOLECULES                               │
│           ProductCard, CategoryCard                          │
├─────────────────────────────────────────────────────────────┤
│                        ATOMS                                 │
│      Button, Badge, Input, Card, Skeleton (shadcn/ui)       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Rendering & State Kararları

### Rendering Stratejileri

| Sayfa | Strateji | Sebep | Kod |
|-------|----------|-------|-----|
| **Ana Sayfa** | SSG + ISR (1h) | Statik içerik, düzenli güncelleme | `revalidate = 3600` |
| **Ürün Detay** | SSG | Build time'da generate, SEO için kritik | `generateStaticParams` |
| **Kategori** | SSG | Build time'da generate | `generateStaticParams` |
| **Favoriler** | CSR | Kullanıcıya özel, client state | `'use client'` |
| **Sepet** | CSR | Kullanıcıya özel, client state | `'use client'` |

#### Neden Bu Stratejiler?

1. **SSG + ISR (Ana Sayfa)**: 
   - Hızlı ilk yükleme (pre-rendered HTML)
   - ISR ile içerik güncellemesi (her 1 saat)
   - CDN cache'leme avantajı

2. **SSG (Ürün/Kategori)**:
   - Build time'da tüm sayfalar generate edilir
   - SEO için kritik (Google indexleme)
   - Vercel Edge'de cache'lenir

3. **CSR (Favoriler/Sepet)**:
   - Kullanıcıya özel state gerektirir
   - localStorage'dan veri okunur
   - Server'da render edilmesi anlamsız

### State Management (Zustand)

#### Neden Zustand?

| Kriter | Redux | Context API | Zustand ✅ |
|--------|-------|-------------|------------|
| Boilerplate | Yüksek | Orta | **Minimal** |
| TypeScript | İyi | Orta | **Mükemmel** |
| Persist | Ek paket | Manuel | **Built-in middleware** |
| Bundle Size | 7kb | 0 | **2kb** |
| Learning Curve | Yüksek | Düşük | **Düşük** |

#### Store Yapısı

```typescript
// 3 ayrı store - Separation of Concerns
├── favorites.ts    # Favori ürün ID'leri, localStorage persist
├── cart.ts         # Sepet items, quantity, selection, localStorage persist
└── ui.ts           # Theme, sidebar states
```

#### Performans Optimizasyonları

```typescript
// React.memo ile component memoization
export const ProductCard = memo(function ProductCard({ product, locale }) {
  // useMemo ile pahalı hesaplamalar önbelleğe alınır
  const formattedPrice = useMemo(() => formatPrice(variant?.price), [variant?.price, locale]);
  
  // useCallback ile event handler referansları korunur
  const handleAddToCart = useCallback(() => addToCart(product, variant), [product, variant]);
  
  return <Card>...</Card>;
});
```

---

## ⚖️ Varsayımlar ve Trade-off'lar

### Varsayımlar

1. **API Yapısı**: 
   - `https://api.meshur.co/docs` şeması referans alındı
   - Product, Category, Cart modelleri API'ye uygun tasarlandı
   - Real API yerine mock data kullanıldı (case gereği)

2. **Kullanıcı Akışları**:
   - Trendyol benzeri e-ticaret akışı bekleniyor
   - Auth/Login gerekliliği yok (case kapsamı dışı)
   - Ödeme entegrasyonu yok (case kapsamı dışı)

3. **Browser Desteği**:
   - Modern browsers (Chrome, Firefox, Safari, Edge son 2 versiyon)
   - ES2020+ JavaScript özellikleri

### Trade-off'lar

| Karar | Alternatif | Neden Bu Tercih |
|-------|------------|-----------------|
| **Mock Data** | Real API | Case için yeterli, API olmadan çalışabilir |
| **shadcn/ui** | Sadece Tailwind | Component consistency, hızlı geliştirme |
| **Zustand** | Redux/Context | Minimal boilerplate, TypeScript uyumu |
| **next-intl** | next-i18next | App Router native desteği |
| **Storybook yok** | Storybook | React 19 uyumsuzluğu (peer deps) |
| **Test yok** | Jest/RTL | Zaman kısıtı, yapı test-ready |

### Storybook Hakkında

> ⚠️ **Not**: Case'te Storybook istense de, React 19 ile uyumluluk sorunu nedeniyle eklenemedi. 
> Storybook 8.x, React 19'u henüz tam desteklemiyor (peer dependency conflict).
> Component yapısı Atomic Design'a uygun olduğundan, React 19 desteği geldiğinde kolayca eklenebilir.

### Gelecekte Eklenebilir

- [ ] Gerçek API entegrasyonu (`lib/api/` service layer)
- [ ] Jest/React Testing Library testleri
- [ ] Storybook (React 19 desteği sonrası)
- [ ] Search sayfası ve filtreleme
- [ ] Kullanıcı authentication
- [ ] Checkout flow

---

## 🚀 Özellikler

| Özellik | Durum | Açıklama |
|---------|-------|----------|
| **Ana Sayfa** | ✅ | Hero banner, kategoriler, öne çıkan ürünler |
| **Ürün Detay** | ✅ | Galeri, varyantlar, sepete ekle |
| **Favoriler** | ✅ | Favori ürün listesi, localStorage persist |
| **Sepet** | ✅ | Miktar, seçim, toplam hesaplama |
| **Kategori** | ✅ | Alt kategoriler, ürün grid |
| **i18n (TR/EN)** | ✅ | URL tabanlı, next-intl |
| **Dark Mode** | ✅ | Sistem tercihi + manuel toggle |
| **SEO** | ✅ | Metadata, JSON-LD, sitemap, robots |
| **Responsive** | ✅ | Mobile-first tasarım |
| **Performans** | ✅ | Memoization, lazy loading, ISR |

---

## 📦 Kullanılan Teknolojiler

| Kategori | Teknoloji | Sürüm |
|----------|-----------|-------|
| **Framework** | Next.js | 16.1.1 |
| **UI Library** | React | 19.2.3 |
| **Language** | TypeScript | 5.x (strict) |
| **Styling** | Tailwind CSS | 4.0 |
| **UI Components** | shadcn/ui | latest |
| **State** | Zustand | 5.x |
| **i18n** | next-intl | latest |
| **Animation** | Framer Motion | 12.x |
| **Icons** | Lucide React | latest |
| **Theme** | next-themes | latest |

---

## 🌍 API & Veri Katmanı

### Mevcut Durum: Mock Data

```typescript
// data/mock-data.ts
export const products: Product[] = [...];
export const categories: Category[] = [...];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined;
export function getProductsByCategory(categoryId: number): Product[];
```

### Gerçek API'ye Geçiş

```typescript
// lib/api/products.ts (önerilen yapı)
export async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://api.meshur.co/api/products');
  return res.json();
}
```

API Referansı: https://api.meshur.co/docs

---

## 🐳 Docker Desteği

```bash
# Production
docker-compose up --build

# Development (hot reload)
docker-compose --profile dev up dev
```

Dosyalar:
- `Dockerfile` - Multi-stage production build
- `Dockerfile.dev` - Development with hot reload
- `docker-compose.yml` - Service orchestration

---

## 📄 Lisans

MIT License

---

**Frontend Developer Case Study** için hazırlanmıştır.
