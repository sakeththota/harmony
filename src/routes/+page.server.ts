import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';

export const load: PageServerLoad = async (event) => {
	const { connected } = await event.parent();
	if (!connected.spotify && !connected.spotify) {
		throw redirect(302, '/connect');
	}

	const trpc = router.createCaller(await createContext(event));
	const discover_weekly = await trpc.getSpotifyPlaylistById('37i9dQZEVXcKXkpUPWbPnp');
	const release_radar = await trpc.getSpotifyPlaylistById('37i9dQZEVXbolQeUEgn9Sn');
	const recent_tracks = (await trpc.getSpotifyRecentlyPlayed()).map((scrobble) => scrobble.track);
	const recc_tracks = await trpc.getSpotifyRecommendations(
		recent_tracks.map((track) => track.artists[0].id)
	);
	const feat_tracks = await trpc.getSpotifyFeatured();

	return {
		discover_weekly,
		release_radar,
		recent_tracks,
		recc_tracks,
		feat_tracks
	};
};
