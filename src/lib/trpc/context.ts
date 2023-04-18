import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';

export async function createContext(event: RequestEvent) {
	const spotify_token = event.cookies.get('spotify');
	const sc_api_key = event.cookies.get('soundcloud');
	return {
		spotify_token,
		sc_api_key
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
