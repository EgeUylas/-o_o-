'use client';

import { useEffect } from 'react';
import { RefreshCw, Home, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-background via-background to-red-50 dark:to-red-950/20 px-4">
            <div className="text-center max-w-2xl mx-auto">
                {/* Animated 500 */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    className="relative"
                >
                    <h1 className="text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 leading-none select-none">
                        500
                    </h1>
                    {/* Decorative circles */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-500/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl -z-10" />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl md:text-4xl font-bold mt-4 mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Bir Hata Oluştu
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                        Sunucuda beklenmeyen bir hata oluştu. Endişelenmeyin,
                        ekibimiz durumdan haberdar edildi.
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
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                            className="w-32 h-32 rounded-full bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 flex items-center justify-center"
                        >
                            <AlertTriangle className="w-12 h-12 text-red-500" />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 rounded-full border-2 border-dashed border-red-300 dark:border-red-700"
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
                    <Button
                        size="lg"
                        onClick={reset}
                        className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-lg shadow-red-500/25"
                    >
                        <RefreshCw className="h-5 w-5 mr-2" />
                        Tekrar Dene
                    </Button>
                    <Link href="/tr">
                        <Button size="lg" variant="outline" className="border-2">
                            <Home className="h-5 w-5 mr-2" />
                            Ana Sayfaya Dön
                        </Button>
                    </Link>
                </motion.div>

                {/* Error Info */}
                {error.digest && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 pt-8 border-t border-border/50"
                    >
                        <p className="text-xs text-muted-foreground">
                            Hata Kodu: <code className="px-2 py-1 bg-muted rounded">{error.digest}</code>
                        </p>
                    </motion.div>
                )}

                {/* Quick Links */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8"
                >
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.history.back()}
                        className="text-muted-foreground"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Önceki sayfaya dön
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
