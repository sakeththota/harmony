<script>
	import ConnectProviderCard from '$lib/components/ConnectProviderCard.svelte';
</script>

<div class="w-full h-full flex flex-col gap-2 p-2">
	<p class="text-2xl font-bold text-neutral">Connect Music</p>
	<p class="text-neutral text-sm">Connect your favorite music services to start listening!</p>
	<form method="POST" class="flex flex-row gap-4 w-full pt-2">
		<ConnectProviderCard label="Spotify" icon="logos:spotify-icon" connected={true}>
			<span slot="description">some description</span>
		</ConnectProviderCard>
		<ConnectProviderCard label="Soundcloud" icon="logos:soundcloud" connected={false}>
			<span slot="description">some description</span>
		</ConnectProviderCard>
		<ConnectProviderCard label="Youtube Music" icon="logos:youtube-icon" connected={null}>
			<span slot="description">some description</span>
		</ConnectProviderCard>
	</form>
</div>
