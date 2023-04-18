import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code') || null;

	if (!code) throw error(400, 'Null authorization code.');

	console.log(code);

	throw redirect(301, '/connect');
};
