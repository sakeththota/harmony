import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { refreshOAuth2AccessToken } from '$lib/oauth2/helpers';
import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';
import { SPOTIFY_CLIENT_SECRET } from '$env/static/private';

export const actions: Actions = {
	login: async ({ request, locals, cookies }) => {
		const body = Object.fromEntries(await request.formData());
		const { data: auth_data, error: auth_err } = await locals.supabase.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string
		});

		if (auth_err) {
			if (auth_err instanceof AuthApiError && auth_err.status == 400) {
				return fail(400, {
					error: 'Invalid credentials'
				});
			}
			return fail(500, {
				error: 'Server error. Try again later.'
			});
		}

		const { data: db_data, error: db_err } = await locals.supabase
			.from('UserProviderConnections')
			.select()
			.eq('id', auth_data.user.id)
			.single();

		if (db_err) {
			return fail(500, {
				error: 'Server error. Try again later.'
			});
		}

		const { data: token_data, error: token_err } = await refreshOAuth2AccessToken(
			'https://accounts.spotify.com/api/token',
			db_data.spotify_refresh,
			PUBLIC_SPOTIFY_CLIENT_ID,
			SPOTIFY_CLIENT_SECRET
		);

		if (token_err) {
			return fail(400, {
				error: "Couldn't get spotify connection. Try reconnecting."
			});
		}

		if (token_data['access_token']) {
			cookies.set('spotify', token_data['access_token'], {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 55
			});
		}

		throw redirect(303, '/');
	}
};
