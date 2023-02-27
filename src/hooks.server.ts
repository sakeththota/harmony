import '$lib/supabase';
import { redirect, type Handle } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const handle: Handle = async ({ event, resolve }) => {
	console.log(event.url.pathname);
	const { supabaseClient, session } = await getSupabase(event);

	event.locals.supabase = supabaseClient;
	event.locals.session = session;

	// if (event.locals.session) {
	// 	if (event.url.pathname.startsWith('/login')) {
	// 		throw redirect(302, '/');
	// 	}
	// 	if (event.url.pathname.startsWith('/register')) {
	// 		throw redirect(302, '/');
	// 	}
	// } else {
	// 	throw redirect(302, '/login');
	// }

	const response = await resolve(event);

	return response;
};
