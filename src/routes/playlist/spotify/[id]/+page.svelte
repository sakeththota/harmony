<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { onMount } from 'svelte';
	import type { Playlist } from 'spotify-web-api-ts/types/types/SpotifyObjects';

	// client side data fetching
	export let data;
	let playlist: Playlist;
	let loading = true;
	onMount(async () => {
		playlist = await trpc($page).getSpotifyPlaylistById.query(data.id);
		loading = false;
	});

	// table scroll logic

	// helpers
	const trackLength = (duration_ms: number) => {
		return `${Math.floor(duration_ms / 60000)}:${Math.floor(duration_ms / 10000)}`;
	};

	// gotta find a cleaner way to do this
	const timeSince = (date: number) => {
		var seconds = Math.floor((Date.now() - date) / 1000);
		var intervalType;

		var interval = Math.floor(seconds / 31536000);
		if (interval >= 1) {
			intervalType = 'year';
		} else {
			interval = Math.floor(seconds / 2592000);
			if (interval >= 1) {
				intervalType = 'month';
			} else {
				interval = Math.floor(seconds / 86400);
				if (interval >= 1) {
					intervalType = 'day';
				} else {
					interval = Math.floor(seconds / 3600);
					if (interval >= 1) {
						intervalType = 'hour';
					} else {
						interval = Math.floor(seconds / 60);
						if (interval >= 1) {
							intervalType = 'minute';
						} else {
							interval = seconds;
							intervalType = 'second';
						}
					}
				}
			}
		}

		if (interval > 1 || interval === 0) {
			intervalType += 's ago';
		}

		return interval + ' ' + intervalType;
	};
</script>

<div class="flex h-full w-full flex-col gap-4 overflow-y-scroll px-4">
	{#if !loading}
		<div class="flex w-full gap-4 pt-4">
			<img class="h-48 rounded-xl" src={playlist.images[0].url} alt={playlist.name} />
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
		<div class="flex flex-1 text-neutral">
			<table class="w-full table-auto">
				<tr class="sticky top-0 h-12 border-b-2 border-primary text-left">
					<th class="pl-4">#</th>
					<th>Title</th>
					<th>Album</th>
					<th>Date added</th>
					<th>Duration</th>
				</tr>
				{#each playlist.tracks.items as playlist_item, i}
					<tr class="group h-14 text-left">
						<td class="rounded-tl rounded-bl pl-4 group-hover:bg-neutral/[0.15]">{i + 1}</td>
						<td class="group-hover:bg-neutral/[0.15]">
							<div class="flex items-center gap-4">
								<img
									alt={playlist_item.track.album.name}
									class="h-10 w-10 rounded-sm"
									src={playlist_item.track.album.images[0].url}
								/>
								<p>{playlist_item.track.name}</p>
							</div>
						</td>
						<td class="group-hover:bg-neutral/[0.15]"
							>{playlist_item.track.type === 'track'
								? playlist_item.track.album.name
								: playlist_item.track.show.name}</td
						>
						<td class="group-hover:bg-neutral/[0.15]"
							>{timeSince(Date.parse(playlist_item.added_at))}</td
						>
						<td class="rounded-tr rounded-br group-hover:bg-neutral/[0.15]"
							>{trackLength(playlist_item.track.duration_ms)}</td
						>
					</tr>
				{/each}
			</table>
		</div>
	{/if}
</div>
