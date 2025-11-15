'use client';
import { supabase } from '@/lib/supabaseClient';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // sign in with github auth
  const GitHubSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) console.error('GitHub sign-in error:', error);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  // sign in with google auth
  const GoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) console.error('Google sign-in error:', error);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  // sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.error('Sign out error:', error);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, GitHubSignIn, GoogleSignIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
