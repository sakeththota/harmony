import { t } from '$lib/trpc/t';
import { auth } from '$lib/trpc/middleware/auth';
import { logger } from '$lib/trpc/middleware/logger';
import { SpotifyWebApi } from 'spotify-web-api-ts';
export const router = t.router({
	getUserPlaylists: t.procedure
		.use(logger)
		.use(auth)
		.query(async ({ ctx: { spotify_token } }) => {
			const spotify = new SpotifyWebApi({ accessToken: spotify_token });
			const { items } = await spotify.playlists.getMyPlaylists();
			return items.map((playlist) => {
				return { name: playlist.name, id: playlist.id };
			});
		}),

	getDiscoverWeekly: t.procedure
		.use(logger)
		.use(auth)
		.query(async ({ ctx: { spotify_token } }) => {
			const spotify = new SpotifyWebApi({ accessToken: spotify_token });
			const discover_weekly = await spotify.playlists.getPlaylist('37i9dQZEVXcKXkpUPWbPnp');
			return discover_weekly;
		}),

	getReleaseRadar: t.procedure
		.use(logger)
		.use(auth)
		.query(async ({ ctx: { spotify_token } }) => {
			const spotify = new SpotifyWebApi({ accessToken: spotify_token });
			const release_radar = await spotify.playlists.getPlaylist('37i9dQZEVXbolQeUEgn9Sn');
			return release_radar;
		})
});

export type Router = typeof router;
