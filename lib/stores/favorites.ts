import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesState {
    favoriteIds: number[];
    addFavorite: (productId: number) => void;
    removeFavorite: (productId: number) => void;
    toggleFavorite: (productId: number) => void;
    isFavorite: (productId: number) => boolean;
    clearFavorites: () => void;
    getFavoriteCount: () => number;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favoriteIds: [],

            addFavorite: (productId: number) => {
                set((state) => {
                    if (state.favoriteIds.includes(productId)) return state;
                    return { favoriteIds: [...state.favoriteIds, productId] };
                });
            },

            removeFavorite: (productId: number) => {
                set((state) => ({
                    favoriteIds: state.favoriteIds.filter((id) => id !== productId),
                }));
            },

            toggleFavorite: (productId: number) => {
                const { favoriteIds } = get();
                if (favoriteIds.includes(productId)) {
                    get().removeFavorite(productId);
                } else {
                    get().addFavorite(productId);
                }
            },

            isFavorite: (productId: number) => {
                return get().favoriteIds.includes(productId);
            },

            clearFavorites: () => {
                set({ favoriteIds: [] });
            },

            getFavoriteCount: () => {
                return get().favoriteIds.length;
            },
        }),
        {
            name: 'favorites-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
