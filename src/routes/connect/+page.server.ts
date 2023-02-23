import { spotifyCreateAuthorizationUrl } from '$lib/providers/spotify';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const actions: Actions = {
	spotify: async () => {
		const scope = [
			'user-read-playback-state',
			'user-modify-playback-state',
			'user-read-currently-playing',
			'streaming',
			'playlist-read-private',
			'playlist-read-collaborative',
			'playlist-modify-private',
			'playlist-modify-public',
			'user-follow-modify',
			'user-follow-read',
			'user-read-playback-position',
			'user-top-read',
			'user-read-recently-played',
			'user-library-modify',
			'user-library-read',
			'user-read-email'
		];
		const authUrl = spotifyCreateAuthorizationUrl(
			'http://localhost:5173/connect/spotify',
			scope,
			true
		);
		throw redirect(302, authUrl);
	},
	soundcloud: async () => {
		console.log('hit soundcloud');
		throw redirect(301, '/connect');
	},
	youtubemusic: async () => {
		console.log('hit youtube music');
		throw redirect(301, '/connect');
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
