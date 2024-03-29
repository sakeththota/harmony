import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	return {
		connected: {
			spotify: cookies.get('spotify') ? true : false,
			ytmusic: cookies.get('ytmusic') ? true : false,
			soundcloud: null
		}
	};
};
