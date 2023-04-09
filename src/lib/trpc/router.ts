import { t } from '$lib/trpc/t';
import { auth } from '$lib/trpc/middleware/auth';
import { logger } from '$lib/trpc/middleware/logger';
import { SpotifyWebApi } from 'spotify-web-api-ts';
import { z } from 'zod';

export const router = t.router({
	getUserPlaylists: t.procedure
		.use(logger)
		.use(auth)
		.query(async ({ ctx: { spotify_token } }) => {
			const spotify = new SpotifyWebApi({ accessToken: spotify_token });
			const { items } = await spotify.playlists.getMyPlaylists();
			return items.map((playlist) => {
				return { name: playlist.name, id: playlist.id, img_src: playlist.images[0].url };
			});
		}),

	getSpotifyPlaylistById: t.procedure
		.use(logger)
		.use(auth)
		.input(z.string().nonempty())
		.query(async ({ ctx: { spotify_token }, input }) => {
			const spotify = new SpotifyWebApi({ accessToken: spotify_token });
			const discover_weekly = await spotify.playlists.getPlaylist(input);
			return discover_weekly;
		}),

	getSpotifyRecentlyPlayed: t.procedure
		.use(logger)
		.use(auth)
		.query(async ({ ctx: { spotify_token } }) => {
			const spotify = new SpotifyWebApi({ accessToken: spotify_token });
			const recently_played = await spotify.player.getRecentlyPlayedTracks();
			return recently_played.items.filter(
				(t1, index, self) => index === self.findIndex((t2) => t1.track.id === t2.track.id)
			);
		}),

	getSpotifyRecommendations: t.procedure
		.use(logger)
		.use(auth)
		.input(z.array(z.string()))
		.query(async ({ ctx: { spotify_token }, input }) => {
			const spotify = new SpotifyWebApi({ accessToken: spotify_token });
			const recommendations = await spotify.browse.getRecommendations({
				seed_artists: input.slice(0, 3)
			});
			return recommendations.tracks;
		}),

	getSpotifyFeatured: t.procedure
		.use(logger)
		.use(auth)
		.query(async ({ ctx: { spotify_token } }) => {
			const spotify = new SpotifyWebApi({ accessToken: spotify_token });
			const featured = await spotify.browse.getFeaturedPlaylists();
			return featured.playlists.items;
		})
});

export type Router = typeof router;
