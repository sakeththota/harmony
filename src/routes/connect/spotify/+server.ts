import { error, redirect, type RequestHandler } from '@sveltejs/kit';
import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';
import { SPOTIFY_CLIENT_SECRET } from '$env/static/private';

export const GET: RequestHandler = async ({ url, locals, fetch }) => {
	const code = url.searchParams.get('code') || null;
	// const state = url.searchParams.get('state') || null;
	if (!code) throw error(400, 'Null authorization code.');
	if (!locals.session) throw error(40, 'No harmony user logged in');

	fetch('https://accounts.spotify.com/api/token', {
		body: new URLSearchParams({
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: 'http://localhost:5173/connect'
		}),
		headers: {
			Authorization: `Basic ${Buffer.from(
				`${PUBLIC_SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
			).toString('base64')}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		method: 'POST'
	}).then((data) => {
		console.log(data.body);
	});

	throw redirect(301, '/connect');
};
