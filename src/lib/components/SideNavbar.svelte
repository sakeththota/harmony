<script lang="ts">
	import NavItem from '$lib/components/NavItem.svelte';
	import PlaylistLink from '$lib/components/PlaylistLink.svelte';
	import { trpc } from '$lib/trpc/client';
	import logo from '$lib/assets/harmony-logo.png';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import type { SimplifiedPlaylist } from 'spotify-web-api-ts/types/types/SpotifyObjects';
	import InfiniteScroll from 'svelte-infinite-scroll';

	let offset = 0;
	let total: number;

	let playlists: SimplifiedPlaylist[] = [];
	let newData: SimplifiedPlaylist[] = [];
	$: playlists = [...playlists, ...newData];

	const getSpotifyPlaylists = async (offset: number) => {
		const res = await trpc($page).spotify.getSpotifyUserPlaylists.query(offset);
		if (!total) total = res.total;
		newData = res.items;
	};

	onMount(async () => {
		await getSpotifyPlaylists(offset);
	});
</script>

<div class="flex h-full w-72 flex-col items-start gap-4 pt-2">
	<img class="mb-2 h-6 pl-2" src={logo} alt="harmony logo" />
	<div class="flex w-full flex-col rounded-xl bg-base-100">
		<NavItem href="/" icon="material-symbols:home-rounded">Home</NavItem>
		<NavItem href="/search" icon="material-symbols:search-rounded">Search</NavItem>
	</div>
	<div class="flex w-full flex-1 flex-col overflow-auto rounded-xl bg-base-100 px-2">
		<div
			class="flex h-16 items-center justify-start gap-4 rounded-md bg-none py-2 px-2 text-neutral/[0.5]"
		>
			<Icon icon="material-symbols:library-music-rounded" height="20" />
			<p class="text-md">Playlists</p>
		</div>
		<div
			class="flex w-full flex-col overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral/[0.15] scrollbar-thumb-rounded-md"
		>
			{#each playlists as playlist}
				<PlaylistLink {playlist} />
			{/each}
			<InfiniteScroll
				threshold={100}
				on:loadMore={async () => {
					if (playlists.length < total) {
						offset += 20;
						console.log('getting more playlists');
						await getSpotifyPlaylists(offset);
					}
				}}
			/>
		</div>
	</div>
</div>
