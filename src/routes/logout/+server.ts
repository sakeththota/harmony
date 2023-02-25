import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, cookies }) => {
	cookies.delete('spotify'); // clear access token cookies

	const { error: err } = await locals.supabase.auth.signOut();

	if (err) {
		throw error(500, 'There was a problem logging user out.');
	}

	throw redirect(303, '/');
};
