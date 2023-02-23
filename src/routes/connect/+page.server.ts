import { spotifyGetAuthorizationUrl } from '$lib/providers/spotify';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
	spotify: async () => {
		const authUrl = spotifyGetAuthorizationUrl();
		throw redirect(302, authUrl);
	},
	soundcloud: async () => {
		console.log('hit soundcloud');
		// throw redirect(301, '/connect');
	},
	youtubemusic: async () => {
		console.log('hit youtube music');
		// throw redirect(301, '/connect');
	}
};

export const load: PageServerLoad = async ({ cookies }) => {
	return {
		connected: {
			spotify: cookies.get('spotify') !== undefined,
			soundcloud: false,
			youtubemusic: null
		}
	};
};
