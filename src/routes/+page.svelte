<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import type { Playlist } from 'spotify-web-api-ts/types/types/SpotifyObjects';
	import { onMount } from 'svelte';
	import PlaylistCard from '$lib/components/PlaylistCard.svelte';
	var curHr = new Date().getHours();
	let timeOfDay = '';
	if (curHr < 12) {
		timeOfDay = 'morning';
	} else if (curHr < 18) {
		timeOfDay = 'afternoon';
	} else {
		timeOfDay = 'evening';
	}

	// const getRecentlyPlayed = async () => {}

	// const getReccomendations = async () => {}

	let discover_weekly: Playlist;
	let release_radar: Playlist;
	const getDiscover = async () => {
		discover_weekly = await trpc($page).getDiscoverWeekly.query();
		release_radar = await trpc($page).getReleaseRadar.query();
	};

	onMount(async () => {
		await getDiscover();
	});
</script>

<div class="flex h-full w-full flex-col gap-2 p-2 text-neutral">
	<p class="text-2xl font-bold text-neutral">Good {timeOfDay}</p>
	<div class="flex w-full items-center gap-8">
		<PlaylistCard playlist={discover_weekly} />
		<PlaylistCard playlist={release_radar} />
	</div>
	<!-- <p class="text-2xl font-bold text-neutral">Recently played</p>
	<p class="text-2xl font-bold text-neutral">More of what you like</p> -->
</div>
