<script lang="ts">
	import NavItem from '$lib/components/NavItem.svelte';
	import PlaylistLink from '$lib/components/PlaylistLink.svelte';
	import logo from '$lib/assets/harmony-logo.png';
</script>

<div class="flex h-full w-52 flex-col items-start gap-4 pt-2 pb-4 pl-2">
	<img class="h-6 " src={logo} alt="harmony logo" />
	<p class="-mb-2 font-bold text-primary">Browse</p>
	<div class="">
		<NavItem href="/" icon="material-symbols:home-rounded">Home</NavItem>
		<NavItem href="/search" icon="material-symbols:search-rounded">Search</NavItem>
		<NavItem href="/library" icon="material-symbols:library-music-rounded">Library</NavItem>
		<div class="h-8" />
		<NavItem href="/playlist/create" icon="material-symbols:add">Create Playlist</NavItem>
		<NavItem href="/likes" icon="mdi:cards-heart">Liked Songs</NavItem>
		<NavItem href="/jukebox" icon="material-symbols:speaker">Jukebox</NavItem>
	</div>
	<p class="-mb-2 font-bold text-primary">Playlists</p>
	<div
		class="invisible flex w-full flex-col overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral/[0.15] scrollbar-thumb-rounded-md hover:visible"
	>
		<div class="visible flex w-full flex-col">
			<slot />
		</div>
	</div>
</div>
