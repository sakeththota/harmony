type Track = {
	name: string;
	id: string;
	images: { url: string }[];
	duration_ms: number;
	artists: { name: string }[];
};

type Playlist = {
	name: string;
	id: string;
	images: { url: string }[];
	description: string | null;
	owner: { display_name?: string | null | undefined };
};

type Artist = {
	name: string;
	id: string;
	images: { url: string }[];
};

type Album = {
	name: string;
	id: string;
	images: { url: string }[];
	artists: { name: string }[];
};

type SearchResults = {
	tracks?: Track[];
	playlists?: Playlist[];
	artists?: Artist[];
	albums?: Album[];
};
