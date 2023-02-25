import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';
import { SPOTIFY_CLIENT_SECRET } from '$env/static/private';

const getNewSpotifyAccessToken = async (refresh_token: string) => {
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
		const { data: auth_data, error: auth_err } = await locals.supabase.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string
		});

		if (auth_err) {
			if (auth_err instanceof AuthApiError && auth_err.status == 400) {
				throw fail(400, {
					error: 'Invalid credentials'
				});
			}
			throw fail(500, {
				error: 'Server error. Try again later.'
			});
		}

		const { data: db_data, error: db_err } = await locals.supabase
			.from('UserProviderConnections')
			.select()
			.eq('id', auth_data.user.id)
			.single();

		if (db_err) {
			throw fail(500, {
				error: 'Server error. Try again later.'
			});
		}

		const { data: token_data, error: token_err } = await getNewSpotifyAccessToken(
			db_data.spotify_refresh
		);

		if (token_err) {
			throw fail(400, {
				error: "Couldn't get spotify connection. Try reconnecting."
			});
		}

		cookies.set('spotify', token_data['access_token'], {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 55
		});

		throw redirect(303, '/');
	}
};
