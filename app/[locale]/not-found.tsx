'use client';

import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-background via-background to-orange-50 dark:to-orange-950/20 px-4">
            <div className="text-center max-w-2xl mx-auto">
                {/* Animated 404 */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    className="relative"
                >
                    <h1 className="text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 leading-none select-none">
                        404
                    </h1>
                    {/* Decorative circles */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl -z-10" />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl md:text-4xl font-bold mt-4 mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Sayfa Bulunamadı
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                        Belki yanlış bir adres girdiniz?
                    </p>
                </motion.div>

                {/* Illustration */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mb-8"
                >
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center">
                            <Search className="w-12 h-12 text-orange-500" />
                        </div>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 rounded-full border-2 border-dashed border-orange-300 dark:border-orange-700"
                        />
                    </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/tr">
                        <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/25">
                            <Home className="h-5 w-5 mr-2" />
                            Ana Sayfaya Dön
                        </Button>
                    </Link>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="border-2"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Geri Git
                    </Button>
                </motion.div>

                {/* Popular Links */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 pt-8 border-t border-border/50"
                >
                    <p className="text-sm text-muted-foreground mb-4">Popüler sayfalar:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {['Elektronik', 'Moda', 'Ev & Yaşam', 'Kozmetik'].map((cat) => (
                            <Link
                                key={cat}
                                href={`/tr/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ı/g, 'i')}`}
                                className="px-4 py-2 rounded-full bg-muted hover:bg-orange-100 dark:hover:bg-orange-900/30 text-sm transition-colors"
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
