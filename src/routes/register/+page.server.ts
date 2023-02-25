import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		if (body.password !== body.confirm_password) {
			throw fail(400, { error: "Password's do not match!" });
		}

		const { error: err } = locals.supabase.auth.signUp({
			email: body.email as string,
			password: body.password as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				throw fail(400, {
					error: 'Invalid email or password'
				});
			}
			throw fail(500, {
				error: 'Server error. Please try again later.'
			});
		}

		throw redirect(303, '/login');
	}
};
