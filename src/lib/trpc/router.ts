import { getSpotifyUserPlaylists } from '$lib/providers/spotify';
import type { Context } from '$lib/trpc/context';
import { initTRPC } from '@trpc/server';

export const t = initTRPC.context<Context>().create();

export const router = t.router({
	greeting: t.procedure.query(async () => {
		return `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}`;
	}),
	getUserPlaylists: t.procedure.query(async ({ ctx: { spotify_token } }) => {
		// add a middleware instead of this for these endpoints!!
		if (!spotify_token) return [];
		const { data } = await getSpotifyUserPlaylists(spotify_token);
		if (!data) return [];
		return data.map((playlist) => {
			return { name: playlist.name, id: playlist.id };
		});
	})
});

export type Router = typeof router;
