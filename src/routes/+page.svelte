<script lang="ts">
	import PlaylistCard from '$lib/components/PlaylistCard.svelte';
	import TrackCard from '$lib/components/TrackCard.svelte';
	import Icon from '@iconify/svelte';
	import uzi from '$lib/assets/uzi.png';
	import future from '$lib/assets/future.png';
	import type { PageData } from './$types';
	var curHr = new Date().getHours();

	export let data: PageData;
</script>

<div class="flex w-full grow flex-col gap-4  p-2 text-neutral">
	<p class="text-2xl font-bold text-neutral">
		Good {curHr < 12 ? 'morning' : curHr < 18 ? 'afternoon' : 'evening'}
	</p>
	<div class="relative h-[300px] w-full">
		<div class="outer absolute top-0 left-0 h-full w-7/12 ">
			<div
				class="clip-a relative h-full w-full cursor-pointer bg-gradient-to-br from-primary to-accent"
			>
				<img class="absolute right-24 bottom-0 w-64" src={uzi} />
			</div>
		</div>
		{#if data.discover_weekly}
			<a href="playlist/spotify/{data.discover_weekly.id}">
				<div class="absolute top-0 left-0 flex h-full w-7/12 flex-col justify-between p-6">
					<div class="flex w-3/5 flex-col">
						<p class="text-3xl font-extrabold">{data.discover_weekly.name}</p>
						<p class="text-sm font-extrabold text-neutral/[0.5]">
							{data.discover_weekly.description}
						</p>
					</div>
					<div class="flex items-center gap-2">
						<Icon class="h-6 w-6 rounded-md bg-neutral/[0.5] p-1" icon="mdi:cards-heart" />
						<p>{data.discover_weekly.followers.total} likes</p>
						<p>•</p>
						<p>{data.discover_weekly.tracks.total} songs</p>
					</div>
				</div>
			</a>
		{/if}
		<div class="outer absolute top-0 right-0 h-[300px] w-7/12 ">
			<div
				class="clip-b relative h-full w-full cursor-pointer bg-gradient-to-br from-accent to-primary"
			>
				<img class="absolute bottom-0 right-1/4 w-72" src={future} />
			</div>
		</div>
		{#if data.release_radar}
			<a href="playlist/spotify/{data.release_radar.id}">
				<div
					class="absolute top-0 right-0 flex h-full w-7/12 flex-col items-end justify-between  p-6"
				>
					<div class="flex items-center gap-2">
						<Icon class="h-6 w-6 rounded-md bg-neutral/[0.5] p-1" icon="mdi:cards-heart" />
						<p>{data.release_radar.followers.total} likes</p>
						<p>•</p>
						<p>{data.release_radar.tracks.total} songs</p>
					</div>
					<div class="flex w-3/5 flex-col">
						<p class="text-3xl font-extrabold">{data.release_radar.name}</p>
						<p class="text-sm font-extrabold text-neutral/[0.5]">
							{data.release_radar.description}
						</p>
					</div>
				</div>
			</a>
		{/if}
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
	<div class="flex w-full items-center gap-4 ">
		<div class="flex-1">
			<p class="text-2xl font-bold text-neutral">Made for you</p>
			{#each data.recc_tracks as track, index}
				{#if index < 3}
					<TrackCard {track} />
				{/if}
			{/each}
		</div>
		<div class="flex gap-4">
			{#each data.daily_mixs as playlist, index}
				<PlaylistCard collection={playlist} />
			{/each}
		</div>
	</div>
	<div class="flex w-full items-center gap-4">
		<div class="flex gap-4 ">
			{#each data.feat_tracks as playlist, index}
				{#if index > 3 && index < 7}
					<PlaylistCard collection={playlist} />
				{/if}
			{/each}
		</div>
		<div class="flex-1">
			<p class="text-2xl font-bold text-neutral">Recently played</p>
			{#each data.recent_tracks as track, index}
				{#if index < 3}
					<TrackCard {track} />
				{/if}
			{/each}
		</div>
	</div>
</div>
