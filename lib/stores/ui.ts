import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Theme } from '@/lib/types';

interface UIState {
    theme: Theme;
    isMobileMenuOpen: boolean;
    isSearchOpen: boolean;
    isCartSidebarOpen: boolean;
    setTheme: (theme: Theme) => void;
    toggleMobileMenu: () => void;
    closeMobileMenu: () => void;
    toggleSearch: () => void;
    closeSearch: () => void;
    toggleCartSidebar: () => void;
    closeCartSidebar: () => void;
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            theme: 'system',
            isMobileMenuOpen: false,
            isSearchOpen: false,
            isCartSidebarOpen: false,

            setTheme: (theme: Theme) => {
                set({ theme });
            },

            toggleMobileMenu: () => {
                set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }));
            },

            closeMobileMenu: () => {
                set({ isMobileMenuOpen: false });
            },

            toggleSearch: () => {
                set((state) => ({ isSearchOpen: !state.isSearchOpen }));
            },

            closeSearch: () => {
                set({ isSearchOpen: false });
            },

            toggleCartSidebar: () => {
                set((state) => ({ isCartSidebarOpen: !state.isCartSidebarOpen }));
            },

            closeCartSidebar: () => {
                set({ isCartSidebarOpen: false });
            },
        }),
        {
            name: 'ui-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ theme: state.theme }), // sadece temayı tut
        }
    )
);
