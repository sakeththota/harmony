import { spotifyGetAuthorizationUrl } from '$lib/helpers/spotify';
import { redirect, type Actions } from '@sveltejs/kit';
import crypto from 'crypto';
export const actions: Actions = {
	spotify: async () => {
		throw redirect(302, spotifyGetAuthorizationUrl());
	},
	soundcloud: async ({ cookies }) => {
		// SC.initialize({
		// 	client_id: '2jUbjIyAnUDbvqQ6o48wziWm1AVVmSr4',
		// 	redirect_uri: 'http://localhost/connect/soundcloud'
		// });
		// SC.connect();
		// const api_key = await Soundcloud.Util.keygen();
		// cookies.set('soundcloud', api_key, {
		// 	path: '/',
		// 	httpOnly: true,
		// 	sameSite: 'strict',
		// 	secure: process.env.NODE_ENV === 'production',
		// 	maxAge: 60 * 55
		// });
		return;
	},
	ytmusic: async ({ cookies }) => {
		cookies.set('ytmusic', crypto.randomBytes(32).toString('hex'), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 55
		});
	}
};
