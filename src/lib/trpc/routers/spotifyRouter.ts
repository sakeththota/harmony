import { router, procedure } from '$lib/trpc/t';
import { spotifyAuth } from '$lib/trpc/middleware/spotifyAuth';
import { logger } from '$lib/trpc/middleware/logger';
import { z } from 'zod';
import { SpotifyWebApi } from 'spotify-web-api-ts';

export const spotifyRouter = router({
	search: procedure
		.use(logger)
		.use(spotifyAuth)
		.input(z.string().nonempty())
		.query(async ({ ctx: { spotify_token }, input }) => {
			const spotify = new SpotifyWebApi({ accessToken: spotify_token });
			const results = await spotify.search.search(input, ['track']);
			console.log(results);
			return results.tracks.items.map((track) => track.name);
		}),

	getSpotifyUserPlaylists: procedure
		.use(logger)
		.use(spotifyAuth)
		.input(z.number())
		.query(async ({ ctx: { spotify_token }, input }) => {
			const spotify = new SpotifyWebApi({ accessToken: spotify_token });
			const playlists = await spotify.playlists.getMyPlaylists({ limit: 20, offset: input });
			return playlists;
		}),

	getSpotifyPlaylistById: procedure
		.use(logger)
		.use(spotifyAuth)
		.input(z.string().nonempty())
		.query(async ({ ctx: { spotify_token }, input }) => {
			const spotify = new SpotifyWebApi({ accessToken: spotify_token });
			const discover_weekly = await spotify.playlists.getPlaylist(input);
			return discover_weekly;
		}),

	getSpotifyRecentlyPlayed: procedure
		.use(logger)
		.use(spotifyAuth)
		.query(async ({ ctx: { spotify_token } }) => {
			const spotify = new SpotifyWebApi({ accessToken: spotify_token });
			const recently_played = await spotify.player.getRecentlyPlayedTracks();
			return recently_played.items.filter(
				(t1, index, self) => index === self.findIndex((t2) => t1.track.id === t2.track.id)
			);
		}),

	getSpotifyRecommendations: procedure
		.use(logger)
		.use(spotifyAuth)
		.input(z.array(z.string()))
		.query(async ({ ctx: { spotify_token }, input }) => {
			const spotify = new SpotifyWebApi({ accessToken: spotify_token });
			const recommendations = await spotify.browse.getRecommendations({
				seed_artists: input.slice(0, 3)
			});
			return recommendations.tracks;
		}),

	getSpotifyFeatured: procedure
		.use(logger)
		.use(spotifyAuth)
		.query(async ({ ctx: { spotify_token } }) => {
			const spotify = new SpotifyWebApi({ accessToken: spotify_token });
			const featured = await spotify.browse.getFeaturedPlaylists();
			return featured.playlists.items;
		})
});
