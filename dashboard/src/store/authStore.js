import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      user: null,
      isLoading: false,
      error: null,

      setToken: (token, refreshToken) => set({ token, refreshToken }),
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      logout: () => {
        set({ token: null, refreshToken: null, user: null });
        localStorage.removeItem('authStore');
      },

      initializeAuth: () => {
        const stored = localStorage.getItem('authStore');
        if (stored) {
          const { state } = JSON.parse(stored);
          if (state.token) {
            set({ token: state.token, refreshToken: state.refreshToken, user: state.user });
          }
        }
      },
    }),
    {
      name: 'authStore',
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);
