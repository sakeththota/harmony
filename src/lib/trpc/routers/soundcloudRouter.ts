import { router, procedure } from '$lib/trpc/t';
import { soundcloudAuth } from '../middleware/soundcloudAuth';
import { logger } from '$lib/trpc/middleware/logger';
import { z } from 'zod';
import Soundcloud from 'soundcloud-scraper';

export const soundcloudRouter = router({
	getSoundcloudUserPlaylists: procedure
		.use(logger)
		.use(soundcloudAuth)
		.input(z.string().nonempty())
		.query(async ({ ctx: { sc_api_key }, input }) => {
			const sc = new Soundcloud.Client(sc_api_key);
			// sc.getPlaylist()
			return {};
		})
});
