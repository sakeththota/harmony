<script lang="ts">
	export let collection: Album | Playlist;
</script>

<a href="/playlist/spotify/{collection?.id}">
	<div
		class="flex w-40 flex-col items-start justify-center gap-3 rounded-lg p-2 hover:bg-neutral/[0.15]"
	>
		<img class="h-36 w-36 rounded-xl" src={collection?.images[0].url} alt={collection?.name} />
		<div class="w-full text-neutral">
			<p class="text-md flex-none truncate font-bold">
				{collection?.name}
			</p>
			<p class="flex-none truncate text-xs font-bold text-neutral/[0.5]">
				{#if collection.description}
					{collection.description}
				{:else if collection.owner}
					{collection.owner.display_name}
				{:else if collection.artists}
					{collection.artists[0].name}
				{/if}
			</p>
		</div>
	</div>
</a>
