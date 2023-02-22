<script lang="ts">
	import ConnectProviderCard from '$lib/components/ConnectProviderCard.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="flex h-full w-full flex-col gap-2 p-2">
	<p class="text-2xl font-bold text-neutral">Connect Music</p>
	<p class="text-sm text-neutral">Connect your favorite music services to start listening!</p>
	<form method="POST" class="flex w-full flex-row gap-4 pt-2">
		<ConnectProviderCard
			icon="logos:spotify-icon"
			label="Spotify"
			connected={data.connected.spotify}
		/>
		<ConnectProviderCard
			icon="logos:soundcloud"
			label="Soundcloud"
			connected={data.connected.soundcloud}
		/>

		<ConnectProviderCard
			icon="logos:youtube-icon"
			label="Youtube Music"
			connected={data.connected.youtubemusic}
		/>
	</form>
</div>
