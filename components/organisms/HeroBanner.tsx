'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroBannerProps {
    title: string;
    subtitle: string;
    cta: string;
    locale: string;
}

export function HeroBanner({ title, subtitle, cta, locale }: HeroBannerProps) {
    return (
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
            {/* LCP optimized background image */}
            <Image
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920"
                alt=""
                fill
                priority
                fetchPriority="high"
                className="object-cover opacity-20 mix-blend-overlay"
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 lg:p-16">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-white text-center lg:text-left mb-8 lg:mb-0"
                >
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/95 mb-6 max-w-md">
                        {subtitle}
                    </p>
                    <Link href={`/${locale}/category/elektronik`}>
                        <Button
                            size="lg"
                            className="bg-white text-orange-600 hover:bg-white/90 font-semibold"
                        >
                            {cta}
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
                >
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl" />
                    <Image
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
                        alt="Featured Product"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </section>
    );
}
