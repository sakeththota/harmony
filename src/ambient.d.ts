type SearchResults = {
	tracks?:
		| {
				name: string;
				id: string;
				images: { url: string }[];
				duration_ms: number;
				artists: { name: string }[];
		  }[]
		| undefined;
	playlists?:
		| {
				name: string;
				id: string;
				images: { url: string }[];
				description: string;
		  }[]
		| undefined;
	artists?:
		| {
				name: string;
				id: string;
				images: { url: string }[];
		  }[]
		| undefined;
	albums?:
		| {
				name: string;
				id: string;
				images: { url: string }[];
		  }[]
		| undefined;
};
