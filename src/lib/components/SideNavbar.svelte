<script lang="ts">
	import NavItem from '$lib/components/NavItem.svelte';
	import PlaylistLink from '$lib/components/PlaylistLink.svelte';
	import { trpc } from '$lib/trpc/client';
	import logo from '$lib/assets/harmony-logo.png';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { TRPCClientError } from '@trpc/client';

	let playlists: { name: string; id: string }[];
	const getLatestPlaylists = async () => {
		try {
			playlists = await trpc($page).getUserPlaylists.query();
		} catch (error) {
			console.error(error);
			if (error instanceof TRPCClientError) playlists = [];
			else throw error;
		}
	};

	onMount(async () => {
		await getLatestPlaylists();
	});
</script>

<div class="flex h-full w-56 flex-col items-start gap-4 pt-2 pb-4 pl-2">
	<img class="h-6 " src={logo} alt="harmony logo" />
	<p class="-mb-2 font-bold text-primary">Browse</p>
	<div class="w-full">
		<NavItem href="/" icon="material-symbols:home-rounded">Home</NavItem>
		<NavItem href="/search" icon="material-symbols:search-rounded">Search</NavItem>
		<NavItem href="/library" icon="material-symbols:library-music-rounded">Library</NavItem>
		<div class="h-8" />
		<!-- <hr class="my-4 border-neutral/[0.15] px-8" /> -->
		<NavItem
			on:click={() => getLatestPlaylists()}
			href="/playlist/create"
			icon="material-symbols:add">Create Playlist</NavItem
		>
		<NavItem href="/likes" icon="mdi:cards-heart">Liked Songs</NavItem>
		<NavItem href="/jukebox" icon="material-symbols:speaker">Jukebox</NavItem>
	</div>
	<p class="-mb-2 font-bold text-primary">Playlists</p>
	<div
		class="invisible flex w-full flex-col overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral/[0.15] scrollbar-thumb-rounded-md hover:visible"
	>
		<div class="visible flex w-full flex-col">
			{#if playlists?.length}
				{#each playlists as playlist}
					<PlaylistLink href="/playlist/spotify/{playlist.id}" text={playlist.name} />
				{/each}
				<PlaylistLink href="/" text="" />
				<PlaylistLink href="/" text="" />
			{/if}
		</div>
	</div>
</div>
