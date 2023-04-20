<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { debounce } from 'lodash';
	import TrackCard from '$lib/components/TrackCard.svelte';
	import PlaylistCard from '$lib/components/PlaylistCard.svelte';

	let spotify_results;
	const query = async (e) => {
		spotify_results = await trpc($page).spotify.search.query(e.target.value);
	};
</script>

<div class="flex h-full w-full flex-col gap-4">
	<input
		class="h-10 w-full rounded-md border-2 border-neutral/[0.15] bg-base-100 p-2 text-neutral focus:border-neutral/[0.5] focus:outline-none focus:placeholder:text-transparent"
		placeholder="search"
		on:input={debounce(query, 500)}
	/>
	{#if spotify_results}
		<div class="flex h-1/3 w-full gap-4">
			<div class="flex-1">
				<p class="text-2xl font-bold text-neutral">Songs</p>
				{#each spotify_results.tracks as track}
					<TrackCard {track} />
				{/each}
			</div>
			<div>
				<p class="text-2xl font-bold text-neutral">Playlists</p>
				<div class="flex flex-wrap gap-4">
					{#each spotify_results.playlists as playlist}
						<PlaylistCard {playlist} />
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
