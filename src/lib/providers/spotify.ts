import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';

// class SpotifyWebAPI {
// 	// client id / client secret
// 	// access and refresh tokens
// 	// redirect uri that matches spotify app
// 	id: string;
// 	constructor() {
// 		this.id = crypto.randomUUID();
// 	}
// 	getid() {
// 		console.log(this.id);
// 	}
// }
// export const spotify = new SpotifyWebAPI();

export const spotifyCreateAuthorizationUrl = (
	redirect_uri: string,
	scope: ReadonlyArray<string>,
	show_dialog?: boolean
): string => {
	const url = new URL('https://accounts.spotify.com/authorize');
	url.searchParams.append('client_id', PUBLIC_SPOTIFY_CLIENT_ID);
	url.searchParams.append('response_type', 'code');
	url.searchParams.append('redirect_uri', redirect_uri);
	url.searchParams.append('scope', scope.join(' '));
	url.searchParams.append('show_dialog', show_dialog ? 'true' : 'false');
	// url.searchParams.append('state', '');
	return url.href;
};
