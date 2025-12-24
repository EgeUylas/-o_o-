import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface FooterProps {
    locale: string;
}

export function Footer({ locale }: FooterProps) {
    const t = useTranslations('footer');
    const tCommon = useTranslations('common');

    const footerLinks = {
        company: [
            { label: t('aboutUs'), href: `/${locale}` },
            { label: t('careers'), href: `/${locale}` },
            { label: t('blog'), href: `/${locale}` },
        ],
        support: [
            { label: t('helpCenter'), href: `/${locale}` },
            { label: t('contactUs'), href: `/${locale}` },
            { label: t('returns'), href: `/${locale}` },
            { label: t('shipping'), href: `/${locale}` },
        ],
        legal: [
            { label: t('termsOfService'), href: `/${locale}` },
            { label: t('privacyPolicy'), href: `/${locale}` },
        ],
    };

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Youtube, href: '#', label: 'YouTube' },
    ];

    return (
        <footer className="bg-muted/30 border-t mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand & Newsletter */}
                    <div className="lg:col-span-1">
                        <Link href={`/${locale}`} className="inline-block mb-4">
                            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                {tCommon('siteName')}
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4">
                            {locale === 'tr'
                                ? 'Türkiye\'nin en büyük online alışveriş platformu.'
                                : 'Turkey\'s largest online shopping platform.'}
                        </p>
                        <div className="space-y-2">
                            <h4 className="font-medium text-sm">{t('newsletter')}</h4>
                            <div className="flex gap-2">
                                <Input
                                    type="email"
                                    placeholder={t('newsletterPlaceholder')}
                                    className="h-9"
                                />
                                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                                    {t('subscribe')}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold mb-4">
                            {locale === 'tr' ? 'Şirket' : 'Company'}
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="font-semibold mb-4">
                            {locale === 'tr' ? 'Destek' : 'Support'}
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Social */}
                    <div>
                        <h4 className="font-semibold mb-4">
                            {locale === 'tr' ? 'Yasal' : 'Legal'}
                        </h4>
                        <ul className="space-y-2 mb-6">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h4 className="font-semibold mb-3">{t('followUs')}</h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>{t('copyright')}</p>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded bg-muted text-xs font-medium">Visa</span>
                        <span className="px-3 py-1 rounded bg-muted text-xs font-medium">Mastercard</span>
                        <span className="px-3 py-1 rounded bg-muted text-xs font-medium">PayPal</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
