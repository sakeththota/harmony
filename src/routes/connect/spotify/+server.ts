import { error, fail, redirect, type RequestHandler } from '@sveltejs/kit';
import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';
import { SPOTIFY_CLIENT_SECRET } from '$env/static/private';

const getSpotifyAccessToken = async (code: string) => {
	try {
		const data = await fetch('https://accounts.spotify.com/api/token', {
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				code: code,
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

export const GET: RequestHandler = async ({ url, locals, cookies }) => {
	const code = url.searchParams.get('code') || null;

	if (!code) throw error(400, 'Null authorization code.');
	if (!locals.session) throw error(400, 'No harmony user logged in');

	const { data, error: err } = await getSpotifyAccessToken(code);

	if (err) {
		return fail(500, { error: 'Something went wrong getting access to Spotify :(' });
	}

	cookies.set('spotify', data['access_token'], {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 55
	});

	throw redirect(301, '/connect');
};
