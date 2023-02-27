import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const spotify_access_token = cookies.get('spotify') || false;
	const soundcloud_access_token = cookies.get('soundcloud') || false;

	return {
		connected: {
			spotify: spotify_access_token,
			soundcloud: soundcloud_access_token,
			youtubemusic: null
		}
	};
};
