<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import type {
		Playlist,
		SimplifiedPlaylist,
		Track
	} from 'spotify-web-api-ts/types/types/SpotifyObjects';
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

	let discover_weekly: Playlist;
	let release_radar: Playlist;
	const getDiscover = async () => {
		discover_weekly = await trpc($page).getSpotifyPlaylistById.query('37i9dQZEVXcKXkpUPWbPnp');
		release_radar = await trpc($page).getSpotifyPlaylistById.query('37i9dQZEVXbolQeUEgn9Sn');
	};

	let recent_tracks: Track[] = [];
	const getRecents = async () => {
		let history = await trpc($page).getSpotifyRecentlyPlayed.query();
		recent_tracks = history.map((scrobble) => scrobble.track);
	};

	let recommendations: Track[] = [];
	const getReccs = async () => {
		recommendations = await trpc($page).getSpotifyRecommendations.query(
			recent_tracks.map((track) => track.artists[0].id)
		);
	};

	let featured: SimplifiedPlaylist[] = [];
	const getFeatured = async () => {
		featured = await trpc($page).getSpotifyFeatured.query();
		console.log(featured);
	};

	onMount(async () => {
		await getDiscover();
		await getRecents();
		await getReccs();
		await getFeatured();
	});
</script>

<div class="flex w-full grow flex-col gap-4 p-2 text-neutral">
	<p class="text-2xl font-bold text-neutral">Good {timeOfDay}</p>
	<div class="relative h-[300px] w-full">
		<div class="outer absolute top-0 left-0 h-full w-7/12 ">
			<div class="clip-a h-full w-full bg-gradient-to-br from-primary to-accent" />
		</div>
		<div class="outer absolute top-0 right-0 h-[300px] w-7/12 ">
			<div class="clip-b h-full w-full bg-gradient-to-br from-accent to-primary" />
		</div>
	</div>
	<svg
		style="visibility: hidden; position: absolute;"
		width="0"
		height="0"
		xmlns="http://www.w3.org/2000/svg"
		version="1.1"
	>
		<defs>
			<filter id="round">
				<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
				<feColorMatrix
					in="blur"
					mode="matrix"
					values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
					result="goo"
				/>
				<feComposite in="SourceGraphic" in2="goo" operator="atop" />
			</filter>
		</defs>
	</svg>
	<!-- <div class="flex w-full gap-4">
		{#if discover_weekly && release_radar}
			<PlaylistCard playlist={discover_weekly} />
			<PlaylistCard playlist={release_radar} />
		{/if}
	</div> -->
	<div class="flex w-full items-center gap-4 ">
		<div class="w-full">
			<p class="text-2xl font-bold text-neutral">More of what you like</p>
			{#each recommendations as track, index}
				{#if index < 3}
					<TrackCard {track} />
				{/if}
			{/each}
		</div>
		<div class="flex gap-4">
			{#each featured as playlist, index}
				{#if index < 3}
					<PlaylistCard {playlist} />
				{/if}
			{/each}
		</div>
	</div>
	<div class="flex w-full items-center gap-4">
		<div class="flex gap-4">
			{#each featured as playlist, index}
				{#if index > 3 && index < 7}
					<PlaylistCard {playlist} />
				{/if}
			{/each}
		</div>
		<div class="w-full">
			<p class="text-2xl font-bold text-neutral">Recently played</p>
			{#each recent_tracks as track, index}
				{#if index < 3}
					<TrackCard {track} />
				{/if}
			{/each}
		</div>
	</div>
</div>
