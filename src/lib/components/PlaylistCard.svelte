<script lang="ts">
	export let playlist;
</script>

<a href="/playlist/spotify/{playlist?.id}">
	<div
		class="flex w-40 flex-col items-start justify-center gap-3 rounded-lg p-2 hover:bg-neutral/[0.15]"
	>
		<img class="h-36 w-36 rounded-xl" src={playlist?.images[0].url} alt={playlist?.name} />
		<div class="w-full text-neutral">
			<p class="text-md flex-none truncate font-bold">
				{playlist?.name}
			</p>
			<p class="flex-none truncate text-xs font-bold text-neutral/[0.5]">
				{playlist.description ? playlist.description : ''}
			</p>
		</div>
	</div>
</a>
