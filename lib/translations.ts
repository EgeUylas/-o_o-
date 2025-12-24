// mock data için çeviri tablosu
// kategoriler, ürün seçenekleri vs.

export const categoryTranslations: Record<string, { tr: string; en: string }> = {
    'Elektronik': { tr: 'Elektronik', en: 'Electronics' },
    'Telefon': { tr: 'Telefon', en: 'Phones' },
    'Bilgisayar': { tr: 'Bilgisayar', en: 'Computers' },
    'Televizyon': { tr: 'Televizyon', en: 'TV' },
    'Kulaklık': { tr: 'Kulaklık', en: 'Headphones' },
    'Moda': { tr: 'Moda', en: 'Fashion' },
    'Kadın': { tr: 'Kadın', en: 'Women' },
    'Erkek': { tr: 'Erkek', en: 'Men' },
    'Çocuk': { tr: 'Çocuk', en: 'Kids' },
    'Ev & Yaşam': { tr: 'Ev & Yaşam', en: 'Home & Living' },
    'Mobilya': { tr: 'Mobilya', en: 'Furniture' },
    'Dekorasyon': { tr: 'Dekorasyon', en: 'Decor' },
    'Mutfak': { tr: 'Mutfak', en: 'Kitchen' },
    'Kozmetik': { tr: 'Kozmetik', en: 'Cosmetics' },
    'Makyaj': { tr: 'Makyaj', en: 'Makeup' },
    'Cilt Bakımı': { tr: 'Cilt Bakımı', en: 'Skincare' },
    'Parfüm': { tr: 'Parfüm', en: 'Perfume' },
    'Spor': { tr: 'Spor', en: 'Sports' },
    'Spor Giyim': { tr: 'Spor Giyim', en: 'Sportswear' },
    'Spor Ayakkabı': { tr: 'Spor Ayakkabı', en: 'Sport Shoes' },
    'Fitness': { tr: 'Fitness', en: 'Fitness' },
    'Kitap & Hobi': { tr: 'Kitap & Hobi', en: 'Books & Hobby' },
    'Kitap': { tr: 'Kitap', en: 'Books' },
    'Müzik Aletleri': { tr: 'Müzik Aletleri', en: 'Musical Instruments' },
};

export const optionTranslations: Record<string, { tr: string; en: string }> = {
    'Renk': { tr: 'Renk', en: 'Color' },
    'Numara': { tr: 'Numara', en: 'Size' },
    'Beden': { tr: 'Beden', en: 'Size' },
    'Boyut': { tr: 'Boyut', en: 'Size' },
    'Siyah': { tr: 'Siyah', en: 'Black' },
    'Beyaz': { tr: 'Beyaz', en: 'White' },
    'Gümüş': { tr: 'Gümüş', en: 'Silver' },
    'Siyah Titanyum': { tr: 'Siyah Titanyum', en: 'Black Titanium' },
    'Beyaz Titanyum': { tr: 'Beyaz Titanyum', en: 'White Titanium' },
    'Titanium Black': { tr: 'Titanium Black', en: 'Titanium Black' },
    'Uzay Grisi': { tr: 'Uzay Grisi', en: 'Space Gray' },
};

// çeviri fonksiyonları
export function translateCategory(name: string, locale: string): string {
    const translation = categoryTranslations[name];
    if (translation) {
        return locale === 'en' ? translation.en : translation.tr;
    }
    return name;
}

export function translateOption(text: string, locale: string): string {
    const translation = optionTranslations[text];
    if (translation) {
        return locale === 'en' ? translation.en : translation.tr;
    }
    return text;
}
