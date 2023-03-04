import { error, redirect, type RequestHandler } from '@sveltejs/kit';
import { getOAuth2AccessToken } from '$lib/oauth2/helpers';
import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';
import { SPOTIFY_CLIENT_SECRET } from '$env/static/private';

export const GET: RequestHandler = async ({ url, locals, cookies }) => {
	const code = url.searchParams.get('code') || null;

	if (!code) throw error(400, 'Null authorization code.');
	if (!locals.session.user) throw error(400, 'No harmony user logged in');

	const { data, error: err } = await getOAuth2AccessToken(
		code,
		'https://accounts.spotify.com/api/token',
		'http://localhost:5173/connect/spotify',
		PUBLIC_SPOTIFY_CLIENT_ID,
		SPOTIFY_CLIENT_SECRET
	);

	if (err) throw error(500, 'Server error. Try again later.');

	cookies.set('spotify', data['access_token'], {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 55
	});

	const { error: db_err } = await locals.supabase
		.from('UserProviderConnections')
		.update({ spotify_refresh: data['refresh_token'] })
		.eq('id', locals.session.user.id);

	if (db_err) throw error(500, 'Server error. Try again later.');

	throw redirect(301, '/connect');
};
