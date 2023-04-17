<script lang="ts">
	import ConnectProviderCard from '$lib/components/ConnectProviderCard.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="flex h-full w-full flex-col gap-4 p-2">
	<div>
		<p class="text-2xl font-bold text-neutral">Connect Music</p>
		<p class="text-sm text-neutral">Connect your favorite music services to start listening!</p>
	</div>
	<form method="POST" class="flex w-full flex-row items-center gap-4 ">
		<ConnectProviderCard
			icon="logos:spotify-icon"
			label="Spotify"
			connected={data.connected.spotify}
		/>

		<ConnectProviderCard
			icon="logos:soundcloud"
			label="Soundcloud"
			connected={data.connected.soundcloud}
			>User log in is currently unavailable due to Soundcloud's app registration being closed.
			Search and playback functionality is still supported, but private user playlists and
			personalized playlists will be unavailable until further notice.</ConnectProviderCard
		>

		<ConnectProviderCard
			icon="logos:youtube-icon"
			label="Youtube Music"
			connected={data.connected.youtubemusic}
		/>
	</form>
</div>
