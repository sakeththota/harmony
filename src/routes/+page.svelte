<script lang="ts">
	var curHr = new Date().getHours();
	let timeOfDay = '';
	if (curHr < 12) {
		timeOfDay = 'morning';
	} else if (curHr < 18) {
		timeOfDay = 'afternoon';
	} else {
		timeOfDay = 'evening';
	}
</script>

<div class="flex h-full w-full flex-col gap-2 p-2 text-neutral">
	<p class="text-2xl font-bold text-neutral">Good {timeOfDay}</p>
	<div class="jutify-center flex h-1/3 w-full gap-6">
		<a href="playlists/discover-weekly">
			<div
				class=" flex h-full flex-col justify-between rounded-2xl bg-gradient-to-r from-primary to-secondary p-6"
			>
				<div>
					<p class="text-2xl font-bold text-neutral">Discover Weekly</p>
					<p class="font-bold text-neutral/[0.5]">
						Your weekly mixtape of fresh music. Enjoy new music and deep cuts picked for you.
					</p>
				</div>
				<p>x likes</p>
			</div>
		</a>

		<a href="playlists/release-radar">
			<div
				class="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-r from-secondary to-accent p-8"
			>
				<p class="text-right">x likes</p>
				<div>
					<p class="text-2xl font-bold text-neutral">Release Radar</p>
					<p class="font-bold text-neutral/[0.5]">
						Catch all the latest music from artists you follow, plus new singles picked for you.
					</p>
				</div>
			</div>
		</a>
	</div>
	<p class="text-2xl font-bold text-neutral">Recently played</p>
	<p class="text-2xl font-bold text-neutral">More of what you like</p>
</div>
