// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: TypedSupabaseClient;
			session: Session | null;
		}
		interface PageData {
			playlists: string[];
			connected: {
				spotify: boolean | null;
				soundcloud: boolean | null;
				ytmusic: boolean | null;
			};
		}
		// interface Platform {}
	}
}

export {};
