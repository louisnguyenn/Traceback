'use client';
import { supabase } from '@/lib/supabaseClient';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const GitHubSignIn = () => {
		supabase.auth.signInWithOAuth({ provider: 'github' });
	};

	useEffect(() => {
		// Fetch current user on mount
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user);
			setLoading(false);
		};
		getUser();

		// Listen for auth state changes
		const { data: subscription } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user ?? null);
			}
		);

		return () => subscription.subscription.unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
