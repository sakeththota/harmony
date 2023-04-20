<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { debounce } from 'lodash';

	let searchResults = [];
	const query = async (e) => {
		searchResults = await trpc($page).spotify.search.query(e.target.value);
	};
</script>

<div class="flex h-full w-full flex-col items-center gap-4">
	<input
		class="h-10 w-full rounded-md border-2 border-neutral/[0.15] bg-base-100 p-2 text-neutral focus:border-neutral/[0.5] focus:outline-none focus:placeholder:text-transparent"
		placeholder="search"
		on:input={debounce(query, 500)}
	/>
	{#each searchResults as res}
		<p>{res}</p>
	{/each}
</div>
