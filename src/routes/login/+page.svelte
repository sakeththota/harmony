<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { toast } from '$lib/notifications';
	import Icon from '@iconify/svelte';

	const submitLogin: SubmitFunction = () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'failure':
					if (result.data) toast({ type: 'error', message: result.data.error });
					else toast({ type: 'error', message: 'Something went wrong' });
					break;
				default:
					break;
			}
			await update();
		};
	};
</script>

<div
	class="flex h-full w-full items-center justify-center bg-gradient-to-tr from-accent via-secondary to-primary"
>
	<div
		class="flex h-3/4 w-3/5 flex-row items-center justify-between gap-20 rounded-[25px] bg-[#141416] p-9 text-neutral"
	>
		<!-- login form wrapper -->
		<div class="flex h-full w-1/2 items-center justify-center ">
			<!-- login form -->
			<form
				use:enhance={submitLogin}
				action="?/login"
				method="POST"
				class="flex w-3/5 flex-col justify-center gap-4"
			>
				<h1 class="text-3xl font-semibold">Login</h1>
				<input
					type="text"
					name="email"
					placeholder="Email"
					class="placeholder:text-md h-14 rounded-lg border-[1px] border-neutral/[.5] bg-transparent p-4 placeholder:text-neutral/[0.35] focus:outline-none focus:ring-2 focus:ring-primary"
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					class="placeholder:text-md h-14 rounded-lg border-[1px] border-neutral/[.5] bg-transparent p-4 placeholder:text-neutral/[0.35] focus:outline-none focus:ring-2 focus:ring-primary"
				/>
				<a href="/" class="text-right text-sm">Forgot password?</a>
				<button
					type="submit"
					class="h-14 rounded-lg  bg-neutral/[.15] p-4 text-lg hover:bg-neutral/[.2]">Login</button
				>
				<p class="text-center text-sm">
					Don't have an account? <a class="text-primary" href="/register">Sign Up</a>
				</p>
				<div class="flex items-center justify-evenly gap-4 px-2">
					<span class="h-0.5 flex-1 bg-neutral/[.15]" />
					<p>Or</p>
					<span class="h-0.5 flex-1 bg-neutral/[.15]" />
				</div>
				<a
					href="/"
					class="flex h-14 items-center justify-center gap-8 rounded-full bg-neutral/[.15] p-4 text-lg hover:bg-neutral/[.2]"
				>
					<Icon icon="logos:google-icon" width="28" />
					<p>Login w/ Google</p>
				</a>
			</form>
		</div>
		<!-- some sort of advertising / marketing design -->
		<div class="h-full w-1/2 rounded-[25px] border-2 border-neutral" />
	</div>
</div>
