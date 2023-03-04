export const getOAuth2AuthorizationURL = (
	api_url: string,
	scope: string[],
	client_id: string,
	redirect_uri: string
) => {
	const url = new URL(api_url + '/authorize');
	url.searchParams.set('client_id', client_id);
	url.searchParams.set('scope', scope.join(' '));
	url.searchParams.set('response_type', 'code');
	url.searchParams.set('redirect_uri', redirect_uri);
	url.searchParams.set('show_dialog', 'true');
	return url.toString();
};

export const getOAuth2AccessToken = async (
	code: string,
	token_url: string,
	redirect_uri: string,
	client_id: string,
	client_secret: string
) => {
	try {
		const data = await fetch(token_url, {
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				code: code,
				redirect_uri: redirect_uri
			}),
			headers: {
				Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
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

export const refreshOAuth2AccessToken = async (
	token_url: string,
	refresh_token: string,
	client_id: string,
	client_secret: string
) => {
	try {
		const data = await fetch(token_url, {
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: refresh_token,
				redirect_uri: 'http://localhost:5173/connect/spotify'
			}),
			headers: {
				Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
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
