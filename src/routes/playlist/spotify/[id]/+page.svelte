<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import PlaylistCard from '$lib/components/PlaylistCard.svelte';
	import Icon from '@iconify/svelte';

	export let data;

	const promise = trpc($page).getSpotifyPlaylistById.query(data.id);
</script>

<div class="flex h-full w-full flex-col p-6">
	{#await promise then playlist}
		<div class="flex w-full gap-4">
			<img class="h-48" src={playlist.images[0].url} alt={playlist.name} />
			<div class="flex flex-col justify-end gap-4">
				{#if playlist.public}
					<p class=" text-sm text-neutral">Public Playlist</p>
				{:else}
					<p class="text-sm text-neutral">Private Playlist</p>
				{/if}
				<p class="text-5xl font-bold text-neutral">{playlist.name}</p>
				<p class="font-bold text-neutral/[0.5]">{playlist.description}</p>
				<div>
					<div class="flex items-center gap-2 text-sm text-neutral/[0.5]">
						{#if playlist.owner.display_name === 'Spotify'}<Icon
								icon="logos:spotify-icon"
								width="16"
							/>{/if}
						<p>
							{playlist.owner.display_name === 'Spotify' ? 'Made for sak' : 'sak'} • {playlist
								.tracks.items.length} songs
						</p>
					</div>
				</div>
			</div>
		</div>
	{/await}
</div>
