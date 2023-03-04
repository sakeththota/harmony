import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';
import { getOAuth2AuthorizationURL } from '$lib/oauth2/helpers';
import { redirect, type Actions } from '@sveltejs/kit';

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
		const url = getOAuth2AuthorizationURL(
			'https://accounts.spotify.com',
			scope,
			PUBLIC_SPOTIFY_CLIENT_ID,
			'http://localhost:5173/connect/spotify' // host/connect/[provider]
		);
		throw redirect(302, url);
	},
	soundcloud: async () => {
		// todo
		console.log('hit soundcloud');
	},
	youtubemusic: async () => {
		// todo
		console.log('hit youtube music');
	}
};
