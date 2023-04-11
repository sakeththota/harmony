import { spotifyGetAuthorizationUrl } from '$lib/helpers/spotify';
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
