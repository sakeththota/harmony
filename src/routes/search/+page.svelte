<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { debounce } from 'lodash';
	import TrackCard from '$lib/components/TrackCard.svelte';
	import PlaylistCard from '$lib/components/PlaylistCard.svelte';
	import ArtistCard from '$lib/components/ArtistCard.svelte';
	import type {
		Track,
		Artist,
		SimplifiedPlaylist,
		SimplifiedAlbum
	} from 'spotify-web-api-ts/types/types/SpotifyObjects';
	let spotify_results: {
		tracks?: Track[] | undefined;
		artists?: Artist[] | undefined;
		playlists?: SimplifiedPlaylist[] | undefined;
		albums?: SimplifiedAlbum[] | undefined;
	};
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
		<div class="flex h-1/3 w-full gap-8 border-2">
			<div class="flex h-full w-2/5 flex-col border-2">
				<p class=" text-xl font-bold text-neutral">Songs</p>
				<div class="h-[calc(100%-1.75rem)] overflow-y-scroll">
					{#if spotify_results.tracks}
						{#each spotify_results.tracks as track}
							<TrackCard {track} />
						{/each}
					{/if}
				</div>
			</div>
			<div class="flex h-full w-3/5 flex-col border-2">
				<p class=" text-xl font-bold text-neutral">Playlists</p>
				<div class="flex h-[calc(100%-1.75rem)] flex-wrap gap-4 overflow-y-scroll">
					{#if spotify_results.playlists}
						{#each spotify_results.playlists as playlist}
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
					{#if spotify_results.artists}
						{#each spotify_results.artists as artist}
							<ArtistCard {artist} />
						{/each}
					{/if}
				</div>
			</div>
			<div class="flex h-full w-3/5 flex-col border-2">
				<p class=" text-xl font-bold text-neutral">Albums</p>
				<div class="flex h-[calc(100%-1.75rem)] flex-wrap gap-4 overflow-y-scroll">
					{#if spotify_results.albums}
						{#each spotify_results.albums as album}
							<PlaylistCard playlist={album} />
						{/each}
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
