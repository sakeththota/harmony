import { spotifyGetAuthorizationUrl } from '$lib/providers/spotify';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	spotify: async () => {
		throw redirect(302, spotifyGetAuthorizationUrl());
	},
	soundcloud: async () => {
		console.log('hit soundcloud');
	},
	youtubemusic: async () => {
		console.log('hit youtube music');
	}
};
