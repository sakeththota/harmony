import '$lib/supabase';
import { redirect, type Handle } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const handle: Handle = async ({ event, resolve }) => {
	const { supabaseClient, session } = await getSupabase(event);

	event.locals.supabase = supabaseClient;
	event.locals.session = session;

	if (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register')) {
		if (event.locals.session) throw redirect(303, '/');
	} else {
		if (!event.locals.session) throw redirect(303, '/login');
	}

	const response = await resolve(event);

	return response;
};
