import { middleware } from '$lib/trpc/t';
import { TRPCError } from '@trpc/server';

export const soundcloudAuth = middleware(async ({ next, ctx }) => {
	if (!ctx.sc_api_key) throw new TRPCError({ code: 'UNAUTHORIZED' });
	return next();
});
