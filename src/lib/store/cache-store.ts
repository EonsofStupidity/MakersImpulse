import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CacheState {
  cache: Record<string, any>;
  setCache: (key: string, value: any) => void;
  getCache: (key: string) => any;
  clearCache: () => void;
  removeFromCache: (key: string) => void;
}

export const useCacheStore = create<CacheState>()(
  persist(
    (set, get) => ({
      cache: {},
      setCache: (key, value) => 
        set((state) => ({ 
          cache: { ...state.cache, [key]: { data: value, timestamp: Date.now() } }
        })),
      getCache: (key) => {
        const state = get();
        const cached = state.cache[key];
        if (!cached) return null;
        
        // Cache invalidation after 5 minutes
        if (Date.now() - cached.timestamp > 5 * 60 * 1000) {
          get().removeFromCache(key);
          return null;
        }
        
        return cached.data;
      },
      clearCache: () => set({ cache: {} }),
      removeFromCache: (key) =>
        set((state) => {
          const newCache = { ...state.cache };
          delete newCache[key];
          return { cache: newCache };
        }),
    }),
    {
      name: 'cache-storage',
      partialize: (state) => ({ cache: state.cache }),
    }
  )
);