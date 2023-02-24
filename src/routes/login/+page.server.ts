import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';
import { SPOTIFY_CLIENT_SECRET } from '$env/static/private';

const getSpotifyAccessToken = async (refresh_token: string) => {
	try {
		const data = await fetch('https://accounts.spotify.com/api/token', {
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: refresh_token,
				redirect_uri: 'http://localhost:5173/connect/spotify'
			}),
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${PUBLIC_SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
				).toString('base64')}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'POST'
		}).then(async (data) => await data.json());
		return { data, error: null };
	} catch (error) {
		console.error(error);
		return { data: null, error };
	}
};

export const actions: Actions = {
	login: async ({ request, locals, cookies }) => {
		const body = Object.fromEntries(await request.formData());
		const { data, error: err } = await locals.supabase.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status == 400) {
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
			.eq('id', data.user.id)
			.single();

		const { data: data2, error: err2 } = await getSpotifyAccessToken(db_data.spotify_refresh);
		cookies.set('spotify', data2['access_token'], {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 55
		});

		// get refresh tokens from db to populate access tokens into cookies
		throw redirect(303, '/');
	}
};
