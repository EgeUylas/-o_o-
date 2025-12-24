import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product, ProductVariant } from '@/lib/types';

export interface CartItemData {
    productId: number;
    variantId: number;
    quantity: number;
    isSelected: boolean;
    product: Product;
    variant: ProductVariant;
}

interface CartState {
    items: CartItemData[];
    addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
    removeFromCart: (variantId: number) => void;
    updateQuantity: (variantId: number, quantity: number) => void;
    toggleItemSelection: (variantId: number) => void;
    selectAll: (isSelected: boolean) => void;
    clearCart: () => void;
    getItemCount: () => number;
    getSelectedItemCount: () => number;
    getTotalPrice: () => number;
    getSelectedTotalPrice: () => number;
    isInCart: (variantId: number) => boolean;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (product: Product, variant: ProductVariant, quantity: number = 1) => {
                set((state) => {
                    const existingItem = state.items.find((item) => item.variantId === variant.id);

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.variantId === variant.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                        };
                    }

                    const newItem: CartItemData = {
                        productId: product.id,
                        variantId: variant.id,
                        quantity,
                        isSelected: true,
                        product,
                        variant,
                    };

                    return { items: [...state.items, newItem] };
                });
            },

            removeFromCart: (variantId: number) => {
                set((state) => ({
                    items: state.items.filter((item) => item.variantId !== variantId),
                }));
            },

            updateQuantity: (variantId: number, quantity: number) => {
                if (quantity < 1) {
                    get().removeFromCart(variantId);
                    return;
                }

                set((state) => ({
                    items: state.items.map((item) =>
                        item.variantId === variantId ? { ...item, quantity } : item
                    ),
                }));
            },

            toggleItemSelection: (variantId: number) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.variantId === variantId
                            ? { ...item, isSelected: !item.isSelected }
                            : item
                    ),
                }));
            },

            selectAll: (isSelected: boolean) => {
                set((state) => ({
                    items: state.items.map((item) => ({ ...item, isSelected })),
                }));
            },

            clearCart: () => {
                set({ items: [] });
            },

            getItemCount: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getSelectedItemCount: () => {
                return get()
                    .items.filter((item) => item.isSelected)
                    .reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce(
                    (total, item) => total + item.variant.price * item.quantity,
                    0
                );
            },

            getSelectedTotalPrice: () => {
                return get()
                    .items.filter((item) => item.isSelected)
                    .reduce(
                        (total, item) => total + item.variant.price * item.quantity,
                        0
                    );
            },

            isInCart: (variantId: number) => {
                return get().items.some((item) => item.variantId === variantId);
            },
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
