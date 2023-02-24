import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';

export const spotifyGetAuthorizationUrl = (): string => {
	const scope = [
		'user-read-playback-state',
		'user-modify-playback-state',
		'user-read-currently-playing',
		'streaming',
		'playlist-read-private',
		'playlist-read-collaborative',
		'playlist-modify-private',
		'playlist-modify-public',
		'user-follow-modify',
		'user-follow-read',
		'user-read-playback-position',
		'user-top-read',
		'user-read-recently-played',
		'user-library-modify',
		'user-library-read',
		'user-read-email'
	];
	const url = new URL('https://accounts.spotify.com/authorize');
	url.searchParams.append('client_id', PUBLIC_SPOTIFY_CLIENT_ID);
	url.searchParams.append('response_type', 'code');
	url.searchParams.append('redirect_uri', 'http://localhost:5173/connect/spotify');
	url.searchParams.append('scope', scope.join(' '));
	url.searchParams.append('show_dialog', 'true');
	// url.searchParams.append('state', '');
	return url.href;
};
