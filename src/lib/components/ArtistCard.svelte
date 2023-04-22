<script lang="ts">
	export let artist;
</script>

<a href="/artists/spotify/{artist.id}">
	<div
		class="flex w-40 flex-col items-start justify-center gap-3 rounded-lg p-2 hover:bg-neutral/[0.15]"
	>
		<img class="h-36 w-36 rounded-full" src={artist.images[0].url} alt={artist.name} />
		<div class="w-full text-neutral">
			<p class="text-md flex-none truncate font-bold">
				{artist.name}
			</p>
		</div>
	</div>
</a>
