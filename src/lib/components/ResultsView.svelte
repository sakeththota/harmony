<script lang="ts">
	import TrackCard from '$lib/components/TrackCard.svelte';
	import PlaylistCard from '$lib/components/PlaylistCard.svelte';
	import ArtistCard from '$lib/components/ArtistCard.svelte';
	export let results: SearchResults;
</script>

<div class="flex h-1/3 w-full gap-8 border-2">
	<div class="flex h-full w-2/5 flex-col border-2">
		<p class=" text-xl font-bold text-neutral">Songs</p>
		<div class="h-[calc(100%-1.75rem)] overflow-y-scroll">
			{#if results.tracks}
				{#each results.tracks as track}
					<TrackCard {track} />
				{/each}
			{/if}
		</div>
	</div>
	<div class="flex h-full w-3/5 flex-col border-2">
		<p class=" text-xl font-bold text-neutral">Playlists</p>
		<div class="flex h-[calc(100%-1.75rem)] flex-wrap gap-4 overflow-y-scroll">
			{#if results.playlists}
				{#each results.playlists as playlist}
					<PlaylistCard {playlist} />
				{/each}
			{/if}
		</div>
	</div>
</div>
<div class="flex h-1/3 w-full gap-8 border-2">
	<div class="flex h-full w-2/5 flex-col border-2">
		<p class=" text-xl font-bold text-neutral">Artists</p>
		<div class="flex h-[calc(100%-1.75rem)] flex-wrap gap-4 overflow-y-scroll">
			{#if results.artists}
				{#each results.artists as artist}
					<ArtistCard {artist} />
				{/each}
			{/if}
		</div>
	</div>
	<div class="flex h-full w-3/5 flex-col border-2">
		<p class=" text-xl font-bold text-neutral">Albums</p>
		<div class="flex h-[calc(100%-1.75rem)] flex-wrap gap-4 overflow-y-scroll">
			{#if results.albums}
				{#each results.albums as album}
					<PlaylistCard playlist={album} />
				{/each}
			{/if}
		</div>
	</div>
</div>
