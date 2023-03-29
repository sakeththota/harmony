<script lang="ts">
	import Icon from '@iconify/svelte';
	import Breadcrumbs from './Breadcrumbs.svelte';
	import { page } from '$app/stores';

	let dropdownOpen = false;
</script>

<div class="flex h-full flex-1 flex-col px-2">
	<div class="relative flex h-11 w-full items-center justify-between">
		<!-- pull out into navigation component at some point -->
		<div class="flex items-center gap-4">
			<Icon class="text-neutral/[0.5]" icon="material-symbols:arrow-back-rounded" height="24" />
			<Breadcrumbs path={$page.url.pathname} />
		</div>
		<!-- user profile / pill -->
		<div class="flex items-center gap-4 text-neutral">
			<!-- pfp -->
			<!-- <div>pfp</div> -->
			<!-- username -->
			<!-- <p class="text-sm">username</p> -->
			<!-- dropdown -->
			<button type="button" on:click|preventDefault={() => (dropdownOpen = !dropdownOpen)}>
				<Icon
					class="text-neutral/[0.5]"
					icon="material-symbols:keyboard-arrow-down-rounded"
					width="28"
				/>
			</button>
			{#if dropdownOpen}
				<div
					class="absolute top-11 right-0 flex h-24 w-44 flex-col gap-2 rounded-lg  bg-neutral/[0.1] p-2 text-neutral/[0.5] shadow-2xl"
				>
					<a href="/connect">
						<div class="flex h-8 items-center rounded-md px-2 hover:bg-neutral/[0.15]">Connect</div>
					</a>
					<hr class="border-neutral/[0.15]" />
					<form
						class="flex h-8 items-center rounded-md px-2 hover:bg-neutral/[0.15]"
						action="logout"
						method="POST"
					>
						<button class="w-full text-start" type="submit">Log Out</button>
					</form>
				</div>
			{/if}
		</div>
	</div>
	<slot />
</div>
