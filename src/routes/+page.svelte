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
	<!-- gotta figure out something else here lmfao -->
	<div class="relative h-1/3 w-full">
		<svg
			class="absolute left-0 top-0 h-full w-[55%]"
			viewBox="0 0 100 50"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="none"
		>
			<defs>
				<linearGradient id="grad1" x1="0%" y1="100%" x2="100%" y2="50%">
					<stop offset="0%" style="stop-color:#5E81AC;stop-opacity:1" />
					<stop offset="100%" style="stop-color:#81A1C1;stop-opacity:1" />
				</linearGradient>
			</defs>
			<a href="playlists/discover-weekly">
				<path
					d="M0.5 4C0.5 1.79086 2.29086 0 4.5 0H95.6459C97.876 0 99.3265 2.34694 98.3292 4.34164L77.7111 45.5777C76.356 48.288 73.5859 50 70.5557 50H4.5C2.29086 50 0.5 48.2091 0.5 46V4Z"
					fill="url(#grad1)"
				/>
			</a>
		</svg>
		<div class="absolute left-0 top-0 flex h-full w-[45%] flex-col justify-between p-8">
			<div>
				<p class="text-2xl font-bold text-neutral">Discover Weekly</p>
				<p class="font-bold text-neutral/[0.5]">
					Your weekly mixtape of fresh music. Enjoy new music and deep cuts picked for you.
				</p>
			</div>
			<p>x likes</p>
		</div>
		<svg
			class="absolute right-0 top-0 h-full  w-[55%] "
			viewBox="0 0 100 50"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="none"
		>
			<defs>
				<linearGradient id="grad2" x1="0%" y1="50%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#81A1C1;stop-opacity:1" />
					<stop offset="100%" style="stop-color:#88BFCF;stop-opacity:1" />
				</linearGradient>
			</defs>
			<a href="playlists/release-radar">
				<path
					d="M99 46C99 48.2091 97.2091 50 95 50L3.8541 50C1.62395 50 0.173469 47.6531 1.17082 45.6584L21.7889 4.42229C23.144 1.71202 25.9141 0 28.9443 0L95 0C97.2091 0 99 1.79086 99 4V46Z"
					fill="url(#grad2)"
				/>
			</a>
		</svg>
		<div class="absolute right-0 top-0 flex h-full w-[45%] flex-col justify-between p-8">
			<p class="text-right">x likes</p>
			<div>
				<p class="text-2xl font-bold text-neutral">Release Radar</p>
				<p class="font-bold text-neutral/[0.5]">
					Catch all the latest music from artists you follow, plus new singles picked for you.
				</p>
			</div>
		</div>
	</div>
	<p class="text-2xl font-bold text-neutral">Recently played</p>
	<p class="text-2xl font-bold text-neutral">More of what you like</p>
</div>
