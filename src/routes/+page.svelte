<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import type { Playlist, Track } from 'spotify-web-api-ts/types/types/SpotifyObjects';
	import { onMount } from 'svelte';
	import PlaylistCard from '$lib/components/PlaylistCard.svelte';
	import TrackCard from '$lib/components/TrackCard.svelte';
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
		discover_weekly = await trpc($page).getSpotifyPlaylistById.query('37i9dQZEVXcKXkpUPWbPnp');
		release_radar = await trpc($page).getSpotifyPlaylistById.query('37i9dQZEVXbolQeUEgn9Sn');
	};

	let recently_played: Track[] = [];
	const getRecents = async () => {
		recently_played = await trpc($page).getSpotifyRecentlyPlayed.query();
	};

	// let recommendations;
	// const getReccs = async () => {
	// 	recommendations = await trpc($page).getSpotifyRecommendations.query(recently_played.map((track) => track.artists[0].id));
	// }

	onMount(async () => {
		await getDiscover();
		await getRecents();
		// await getReccs();
	});
</script>

<div class="flex h-full w-full flex-col gap-2 p-2 text-neutral">
	<p class="text-2xl font-bold text-neutral">Good {timeOfDay}</p>
	<div class="flex w-full items-center gap-8">
		<PlaylistCard playlist={discover_weekly} />
		<PlaylistCard playlist={release_radar} />
	</div>
	<p class="text-2xl font-bold text-neutral">Recently played</p>
	<div class="flex w-full flex-col justify-center">
		{#each recently_played as track, index}
			{#if index < 3}
				<TrackCard {track} />
			{/if}
		{/each}
	</div>
	<p class="text-2xl font-bold text-neutral">More of what you like</p>
</div>
