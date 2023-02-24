<script lang="ts">
	import Icon from '@iconify/svelte';
	import Breadcrumbs from './Breadcrumbs.svelte';
	import { page } from '$app/stores';

	let dropdownOpen = false;
</script>

<div class="flex h-full flex-1 flex-col px-2">
	<div class="flex h-11 w-full items-center justify-between">
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
				<form action="logout" method="POST">
					<button type="submit">Log Out</button>
				</form>
			{/if}
		</div>
	</div>
	<slot />
</div>
