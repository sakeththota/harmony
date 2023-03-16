<script lang="ts">
	import type { Track } from 'spotify-web-api-ts/types/types/SpotifyObjects';

	export let track: Track;
</script>

<div
	class="items flex h-16 w-80 items-center justify-start gap-4 rounded-lg p-2 hover:bg-neutral/[0.15]"
>
	<img class="h-12 rounded-lg" src={track.album.images[0].url} />
	<div class="flex-1">
		<p class="font-bold text-neutral">{track.name}</p>
		<p class="text-xs font-bold text-neutral/[0.5]">{track.artists[0].name}</p>
	</div>
	<div class="flex items-center justify-center gap-4">
		<p>{Math.floor(track.duration_ms / 60000)}:{Math.floor(track.duration_ms / 10000)}</p>
		<p>•••</p>
	</div>
</div>
