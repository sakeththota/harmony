import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';

export async function createContext(event: RequestEvent) {
	const spotify_token = event.cookies.get('spotify') || null;
	return {
		spotify_token
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
