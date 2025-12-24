import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    return {
        metadataBase: new URL('https://o-o-nine.vercel.app'),
        title: {
            template: '%s | CaseTicaret',
            default: locale === 'tr'
                ? 'CaseTicaret - Online Alışveriş'
                : 'CaseTicaret - Online Shopping',
        },
        description: locale === 'tr'
            ? 'Türkiye\'nin en büyük online alışveriş platformu. Elektronik, moda, ev & yaşam ve daha fazlası.'
            : 'Turkey\'s largest online shopping platform. Electronics, fashion, home & living and more.',
        keywords: ['e-commerce', 'online shopping', 'electronics', 'fashion', 'deals'],
        alternates: {
            canonical: `/${locale}`,
            languages: {
                'tr': '/tr',
                'en': '/en',
            },
        },
        openGraph: {
            type: 'website',
            locale: locale === 'tr' ? 'tr_TR' : 'en_US',
            siteName: 'CaseTicaret',
        },
        twitter: {
            card: 'summary_large_image',
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as 'tr' | 'en')) {
        notFound();
    }

    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NextIntlClientProvider messages={messages}>
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer locale={locale} />
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
