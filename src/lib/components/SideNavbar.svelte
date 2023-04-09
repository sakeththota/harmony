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

<div class="flex h-full w-72 flex-col items-start gap-2 pt-2">
	<img class="mb-2 h-6 pl-2" src={logo} alt="harmony logo" />
	<div class="flex w-full flex-col rounded-xl bg-base-100">
		<NavItem href="/" icon="material-symbols:home-rounded">Home</NavItem>
		<NavItem href="/search" icon="material-symbols:search-rounded">Search</NavItem>
	</div>
	<div class="flex w-full flex-1 flex-col overflow-y-clip rounded-xl  bg-base-100">
		<NavItem href="/home" icon="material-symbols:library-music-rounded">Library</NavItem>
		<div
			class="flex w-full flex-col overflow-y-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral/[0.15] scrollbar-thumb-rounded-md hover:overflow-y-scroll"
		>
			<div class="flex w-full flex-col">
				{#if playlists?.length}
					{#each playlists as playlist}
						<PlaylistLink href="/playlist/spotify/{playlist.id}" text={playlist.name} />
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
