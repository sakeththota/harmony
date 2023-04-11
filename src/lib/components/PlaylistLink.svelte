<script lang="ts">
	import type { SimplifiedPlaylist } from 'spotify-web-api-ts/types/types/SpotifyObjects';

	export let playlist: SimplifiedPlaylist;
</script>

<a href="/playlist/spotify/{playlist.id}">
	<div
		class="flex h-12 items-center gap-4 rounded-lg px-2 text-left text-neutral hover:bg-neutral/[0.15]"
	>
		{#if playlist.images[0]}
			<img class="h-10 w-10 rounded-md" src={playlist.images[0].url} alt="text" />
		{:else}
			<div class="h-10 w-10 rounded-md" />
		{/if}
		<div class="flex flex-col justify-center truncate">
			<p class="truncate text-sm">{playlist.name}</p>
			<p class="truncate text-xs text-neutral/[0.5]">
				{playlist.owner.display_name} • {playlist.tracks.total} songs
			</p>
		</div>
	</div>
</a>
