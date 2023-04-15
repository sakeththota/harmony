import { router } from '$lib/trpc/t';
import { spotifyRouter } from './routers/spotifyRouter';

export const appRouter = router({
	spotify: spotifyRouter
});

export type Router = typeof appRouter;
