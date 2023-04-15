import { t } from '$lib/trpc/t';
import { TRPCError } from '@trpc/server';

export const spotifyAuth = t.middleware(async ({ next, ctx }) => {
	if (!ctx.spotify_token) throw new TRPCError({ code: 'UNAUTHORIZED' });
	return next();
});
