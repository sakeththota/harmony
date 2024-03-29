import '$lib/supabase';
import { redirect, type Handle } from '@sveltejs/kit';
import { createContext } from '$lib/trpc/context';
import { appRouter } from '$lib/trpc/router';
import { createTRPCHandle } from 'trpc-sveltekit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

const handleTRPC: Handle = createTRPCHandle({ router: appRouter, createContext });

const handleUser: Handle = async ({ event, resolve }) => {
	const { supabaseClient, session } = await getSupabase(event);

	event.locals.supabase = supabaseClient;
	event.locals.session = session;

	if (event.locals.session) {
		// logged in users can't access /login or /register until they logout
		if (event.url.pathname.startsWith('/login')) throw redirect(302, '/');
		if (event.url.pathname.startsWith('/register')) throw redirect(302, '/');
	} else {
		// not logged in users must login first
		if (event.url.pathname !== '/login' && event.url.pathname !== '/register')
			throw redirect(302, '/login');
	}

	return await resolve(event);
};

export const handle = sequence(handleTRPC, handleUser);
