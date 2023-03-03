import { t } from '$lib/trpc/router';
import { TRPCError } from '@trpc/server';

export const auth = t.middleware(async ({ next, ctx }) => {
	if (!ctx.spotify_token) throw new TRPCError({ code: 'UNAUTHORIZED' });
	return next();
});
