'use client';

import { create } from 'zustand';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AuthUser {
  id: string;
  email?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  initAuth: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  signInDemo: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: true,
  error: null,

  initAuth: async () => {
    set({ isLoading: true, error: null });

    // Check localStorage for demo session first if Supabase is not configured
    if (typeof window !== 'undefined') {
      const storedDemoUser = localStorage.getItem('doit_demo_user');
      const storedDemoToken = localStorage.getItem('doit_demo_token');
      if (storedDemoUser && storedDemoToken) {
        set({
          user: JSON.parse(storedDemoUser),
          token: storedDemoToken,
          isLoading: false,
        });
        return;
      }
    }

    if (!isSupabaseConfigured()) {
      set({ isLoading: false });
      return;
    }

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (session?.user) {
        set({
          user: { id: session.user.id, email: session.user.email },
          token: session.access_token,
          isLoading: false,
        });
      } else {
        set({ user: null, token: null, isLoading: false });
      }

      // Listen to auth state changes
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          set({
            user: { id: session.user.id, email: session.user.email },
            token: session.access_token,
            isLoading: false,
          });
        } else {
          // If no active Supabase session and no demo session
          const storedDemo = typeof window !== 'undefined' ? localStorage.getItem('doit_demo_user') : null;
          if (!storedDemo) {
            set({ user: null, token: null, isLoading: false });
          }
        }
      });
    } catch (err: any) {
      console.error('Error initializing auth:', err);
      set({ isLoading: false, error: err.message });
    }
  },

  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    if (!isSupabaseConfigured()) {
      // Auto-fallback to demo login if Supabase credentials are placeholders
      get().signInDemo();
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        set({ isLoading: false, error: error.message });
        return { success: false, error: error.message };
      }

      if (data.session) {
        set({
          user: { id: data.session.user.id, email: data.session.user.email },
          token: data.session.access_token,
          isLoading: false,
        });
      }

      return { success: true };
    } catch (err: any) {
      const msg = err.message || 'Failed to sign in';
      set({ isLoading: false, error: msg });
      return { success: false, error: msg };
    }
  },

  signUp: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    if (!isSupabaseConfigured()) {
      get().signInDemo();
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        set({ isLoading: false, error: error.message });
        return { success: false, error: error.message };
      }

      if (data.session) {
        set({
          user: { id: data.session.user.id, email: data.session.user.email },
          token: data.session.access_token,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }

      return { success: true };
    } catch (err: any) {
      const msg = err.message || 'Failed to sign up';
      set({ isLoading: false, error: msg });
      return { success: false, error: msg };
    }
  },

  signOut: async () => {
    set({ isLoading: true });

    if (typeof window !== 'undefined') {
      localStorage.removeItem('doit_demo_user');
      localStorage.removeItem('doit_demo_token');
    }

    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Error signing out of Supabase:', err);
      }
    }

    set({ user: null, token: null, isLoading: false, error: null });
  },

  signInDemo: () => {
    const demoUser = {
      id: 'demo-user-123',
      email: 'demo@doit.local',
    };
    const demoToken = 'demo-token';

    if (typeof window !== 'undefined') {
      localStorage.setItem('doit_demo_user', JSON.stringify(demoUser));
      localStorage.setItem('doit_demo_token', demoToken);
    }

    set({
      user: demoUser,
      token: demoToken,
      isLoading: false,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));
