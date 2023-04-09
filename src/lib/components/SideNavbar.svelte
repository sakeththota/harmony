<script lang="ts">
	import NavItem from '$lib/components/NavItem.svelte';
	import PlaylistLink from '$lib/components/PlaylistLink.svelte';
	import { trpc } from '$lib/trpc/client';
	import logo from '$lib/assets/harmony-logo.png';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { TRPCClientError } from '@trpc/client';
	import Icon from '@iconify/svelte';

	let playlists: { name: string; id: string; img_src: string }[];
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

<div class="flex h-full w-72 flex-col items-start gap-4 pt-2">
	<img class="mb-2 h-6 pl-2" src={logo} alt="harmony logo" />
	<div class="flex w-full flex-col rounded-xl bg-base-100">
		<NavItem href="/" icon="material-symbols:home-rounded">Home</NavItem>
		<NavItem href="/search" icon="material-symbols:search-rounded">Search</NavItem>
	</div>
	<div class="flex w-full flex-1 flex-col overflow-auto rounded-xl bg-base-100">
		<div
			class="flex h-16 items-center justify-start gap-4 rounded-md bg-none py-2 px-4 text-neutral/[0.5]"
		>
			<Icon icon="material-symbols:library-music-rounded" height="20" />
			<p class="text-md">Library</p>
		</div>
		<div
			class="flex w-full flex-col overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral/[0.15] scrollbar-thumb-rounded-md"
		>
			{#if playlists?.length}
				{#each playlists as playlist}
					<PlaylistLink
						href="/playlist/spotify/{playlist.id}"
						text={playlist.name}
						src={playlist.img_src}
					/>
				{/each}
			{/if}
		</div>
	</div>
</div>
