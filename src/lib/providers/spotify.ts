import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';
import { SPOTIFY_CLIENT_SECRET } from '$env/static/private';

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
	return url.href;
};

export const getSpotifyAccessToken = async (code: string) => {
	try {
		const data = await fetch('https://accounts.spotify.com/api/token', {
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				code: code,
				redirect_uri: 'http://localhost:5173/connect/spotify'
			}),
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${PUBLIC_SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
				).toString('base64')}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'POST'
		}).then(async (data) => await data.json());
		return { data, error: null };
	} catch (error) {
		console.error(error);
		return { data: null, error };
	}
};

export const refreshSpotifyAccessToken = async (refresh_token: string) => {
	try {
		const data = await fetch('https://accounts.spotify.com/api/token', {
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: refresh_token,
				redirect_uri: 'http://localhost:5173/connect/spotify'
			}),
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${PUBLIC_SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
				).toString('base64')}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'POST'
		}).then(async (data) => await data.json());
		return { data, error: null };
	} catch (error) {
		console.error(error);
		return { data: null, error };
	}
};

// export const getSpotifyUserPlaylists = async (access_token: string) => {
// 	try {
// 		const data: SpotifyApi.ListOfCurrentUsersPlaylistsResponse = await fetch(
// 			'https://api.spotify.com/v1/me/playlists',
// 			{
// 				headers: {
// 					Authorization: `Bearer ${access_token}`
// 				},
// 				method: 'GET'
// 			}
// 		).then(
// 			async (data): Promise<SpotifyApi.ListOfCurrentUsersPlaylistsResponse> => await data.json()
// 		);
// 		return { data: data.items, error: null };
// 	} catch (error) {
// 		console.error(error);
// 		return { data: null, error };
// 	}
// };
