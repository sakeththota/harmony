import { PUBLIC_SOUNDCLOUD_CLIENT_ID } from '$env/static/public';
import { SOUNDCLOUD_CLIENT_SECRET } from '$env/static/private';

export const soundcloudGetAuthorizationUrl = (): string => {
	const url = new URL('https://api.soundcloud.com/connect');
	url.searchParams.append('client_id', PUBLIC_SOUNDCLOUD_CLIENT_ID);
	url.searchParams.append('response_type', 'code');
	url.searchParams.append('redirect_uri', 'http://localhost:5173/connect/soundcloud');
	return url.href;
};

export const getSoundcloudAccessToken = async (code: string) => {
	try {
		const data = await fetch('https://api.soundcloud.com/oauth2/token', {
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				code: code,
				redirect_uri: 'http://localhost:5173/connect/soundcloud'
			}),
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${PUBLIC_SOUNDCLOUD_CLIENT_ID}:${SOUNDCLOUD_CLIENT_SECRET}`
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

export const refreshSoundcloudAccessToken = async (refresh_token: string) => {
	try {
		const data = await fetch('https://api.soundcloud.com/oauth2/token', {
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: refresh_token,
				redirect_uri: 'http://localhost:5173/connect/soundcloud'
			}),
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${PUBLIC_SOUNDCLOUD_CLIENT_ID}:${SOUNDCLOUD_CLIENT_SECRET}`
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
