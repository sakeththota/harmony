import { getSpotifyUserPlaylists } from '$lib/providers/spotify';
import { t } from '$lib/trpc/t';
import { auth } from '$lib/trpc/middleware/auth';
import { logger } from '$lib/trpc/middleware/logger';

export const router = t.router({
	getUserPlaylists: t.procedure
		.use(logger)
		.use(auth)
		.query(async ({ ctx: { spotify_token } }) => {
			const { data } = await getSpotifyUserPlaylists(spotify_token);
			if (!data) return [];
			return data.map((playlist) => {
				return { name: playlist.name, id: playlist.id };
			});
		})
});

export type Router = typeof router;
