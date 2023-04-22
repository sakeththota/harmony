import { router, procedure } from '$lib/trpc/t';
import { logger } from '$lib/trpc/middleware/logger';
import { spotifyRouter } from '../routers/spotifyRouter';
import { z } from 'zod';

export const jointRouter = router({
	getSoundcloudUserPlaylists: procedure
		.use(logger)
		.input(z.string().nonempty())
		.query(async ({ ctx, input }) => {
			// search spotify

			// search yt music

			return {};
		})
});
