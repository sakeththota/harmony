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

	const daily_mixs = [];
	daily_mixs.push(await trpc.getSpotifyPlaylistById('37i9dQZF1E38427ji6ULNH?si=af5c3e9a585d4cea'));
	daily_mixs.push(await trpc.getSpotifyPlaylistById('37i9dQZF1E35pQdsXr2odW?si=710d230b513441c9'));
	daily_mixs.push(await trpc.getSpotifyPlaylistById('37i9dQZF1E36dm77HUJxgC?si=69a958f01cde42e7'));

	return {
		discover_weekly,
		release_radar,
		recent_tracks,
		recc_tracks,
		feat_tracks,
		daily_mixs
	};
};
