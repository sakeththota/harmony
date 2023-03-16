<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { toast } from '$lib/notifications';

	const registerNewUser: SubmitFunction = async ({ data, cancel }) => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					toast({
						type: 'success',
						message: `Verification email has been sent to ${data.get('email')}.`
					});
					break;
				case 'failure':
					if (result.data) toast({ type: 'error', message: result.data.error });
					else toast({ type: 'error', message: 'Something went wrong' });
					break;
				default:
					break;
			}
			update();
		};
	};
</script>

<div
	class="flex h-full w-full items-center justify-center bg-gradient-to-tr from-accent via-secondary to-primary"
>
	<div
		class="flex h-3/4 w-3/5 flex-row items-center justify-between gap-20 rounded-[25px] bg-[#141416] p-9 text-neutral drop-shadow-2xl"
	>
		<!-- register form wrapper -->
		<div class="flex h-full w-1/2 items-center justify-center ">
			<!-- register form -->
			<form
				action="?/register"
				use:enhance={registerNewUser}
				method="POST"
				class="flex w-3/5 flex-col justify-center gap-4"
			>
				<h1 class="text-3xl font-semibold">Sign Up</h1>
				<div class="flex items-center justify-center gap-4">
					<input
						type="text"
						name="first_name"
						placeholder="First Name"
						class="placeholder:text-md h-14 w-1/2 rounded-lg border-[1px] border-neutral/[.5] bg-transparent p-4 placeholder:text-neutral/[0.35] focus:outline-none focus:ring-2 focus:ring-primary"
					/>
					<input
						type="text"
						name="last_name"
						placeholder="Last Name"
						class="placeholder:text-md h-14 w-1/2 rounded-lg border-[1px] border-neutral/[.5] bg-transparent p-4 placeholder:text-neutral/[0.35] focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
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
				<input
					type="password"
					name="confirm_password"
					placeholder="Confirm Password"
					class="placeholder:text-md h-14 rounded-lg border-[1px] border-neutral/[.5] bg-transparent p-4 placeholder:text-neutral/[0.35] focus:outline-none focus:ring-2 focus:ring-primary"
				/>
				<button
					type="submit"
					class="h-14 rounded-lg  bg-neutral/[.15] p-4 text-lg hover:bg-neutral/[.2]"
					>Sign Up</button
				>
				<p class="text-center text-sm">
					Already have an account? <a class="text-primary" href="/login">Login</a>
				</p>
			</form>
		</div>
		<!-- some sort of advertising / marketing design -->
		<div class="h-full w-1/2 rounded-[25px] border-2 border-neutral" />
	</div>
</div>
