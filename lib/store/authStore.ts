import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

interface AuthStore {
    user: User|null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    clearIsAuthenticated: ()=>void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            setUser: (user: User) => set(() => ({ user, isAuthenticated: true })),
            clearIsAuthenticated: () => set(() => ({ user: null, isAuthenticated: false })),
        }),
        {
            name: 'user-authentication',
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        },
    ),
);