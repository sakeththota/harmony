<script lang="ts">
	import { page } from '$app/stores';
	import ResultsView from '$lib/components/ResultsView.svelte';
	import { trpc } from '$lib/trpc/client';
	import { debounce } from 'lodash';

	let spotify_results: SearchResults;
	const query = async (e) => {
		spotify_results = await trpc($page).spotify.search.query(e.target.value);
		console.log(spotify_results);
	};
</script>

<div class="flex h-full w-full flex-col gap-4">
	<input
		class="h-10 w-full rounded-md border-2 border-neutral/[0.15] bg-base-100 p-2 text-neutral focus:border-neutral/[0.5] focus:outline-none focus:placeholder:text-transparent"
		placeholder="search"
		on:input={debounce(query, 300)}
	/>
	{#if spotify_results}
		<ResultsView results={spotify_results} />
	{/if}
</div>
