import { error, redirect, type RequestHandler } from '@sveltejs/kit';
import { getSoundcloudAccessToken } from '$lib/helpers/soundcloud';

export const GET: RequestHandler = async ({ url, locals, cookies }) => {
	const code = url.searchParams.get('code') || null;

	if (!code) throw error(400, 'Null authorization code.');
	if (!locals.session.user) throw error(400, 'No harmony user logged in');

	const { data, error: err } = await getSoundcloudAccessToken(code);

	if (err) throw error(500, 'Server error. Try again later.');

	cookies.set('soundcloud', data['access_token'], {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 55
	});

	// store refresh token in db for this user
	const { error: db_err } = await locals.supabase
		.from('UserProviderConnections')
		.update({ soundcloud_refresh: data['refresh_token'] })
		.eq('id', locals.session.user.id);

	if (db_err) throw error(500, 'Server error. Try again later.');

	throw redirect(301, '/connect');
};
