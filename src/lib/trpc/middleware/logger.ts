import { t } from '$lib/trpc/t';

export const logger = t.middleware(async ({ path, type, next }) => {
	const start = Date.now();
	const result = await next();
	const ms = Date.now() - start;
	console.log(`${type} ${path} (${ms}ms) ${result.ok ? 'OK' : `ERROR [${result.error}]`} `);
	return result;
});
