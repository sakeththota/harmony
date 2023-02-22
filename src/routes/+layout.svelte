<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import { page } from '$app/stores';
	import NavItem from '$lib/components/NavItem.svelte';
	import PlaylistLink from '$lib/components/PlaylistLink.svelte';
	import logo from '$lib/assets/harmony-logo.png';
	import type { PageData } from './$types';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Notifications from '$lib/components/Notifications.svelte';
	import Icon from '@iconify/svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidateAll();
		});
		return () => {
			subscription.unsubscribe();
		};
	});

	export let data: PageData;
</script>

<Notifications />

{#if $page.url.pathname === '/login' || $page.url.pathname === '/register'}
	<div class="h-screen w-screen">
		<slot />
	</div>
{:else}
	<div class="bg-base-100 flex flex-col h-screen w-screen">
		<div class="flex items-center p-4 gap-2 h-full">
			<div class="flex flex-col items-start h-full w-52 pt-2 pb-4 pl-2 gap-4">
				<img class="h-6 " src={logo} alt="harmony logo" />
				<p class="text-primary font-bold -mb-2">Browse</p>
				<div class="">
					<NavItem
						href="/"
						active={$page.url.pathname === '/'}
						label="Home"
						icon="material-symbols:home-rounded"
					/>
					<NavItem
						href="/search"
						active={$page.url.pathname === '/search'}
						label="Search"
						icon="material-symbols:search-rounded"
					/>
					<NavItem
						href="/library"
						active={$page.url.pathname === '/library'}
						label="Library"
						icon="material-symbols:library-music-rounded"
					/>
					<div class="h-8" />
					<NavItem
						href="/playlist/create"
						active={$page.url.pathname === '/playlist/create'}
						label="Create Playlist"
						icon="material-symbols:add"
					/>
					<NavItem
						href="/likes"
						active={$page.url.pathname === '/likes'}
						label="Liked Songs"
						icon="mdi:cards-heart"
					/>
					<NavItem
						href="/jukebox"
						active={$page.url.pathname === '/jukebox'}
						label="Jukebox"
						icon="material-symbols:speaker"
					/>
				</div>
				<p class="text-primary font-bold -mb-2">Playlists</p>
				<div
					class="flex flex-col w-full overflow-y-scroll scrollbar-thin invisible hover:visible scrollbar-thumb-neutral/[0.15] scrollbar-track-transparent scrollbar-thumb-rounded-md"
				>
					<div class="flex flex-col w-full visible">
						{#each data.playlists as playlist}
							<PlaylistLink text={playlist} />
						{/each}
						<PlaylistLink text="" />
						<PlaylistLink text="" />
					</div>
				</div>
			</div>
			<!-- <span class="h-full w-[1px] bg-neutral/[0.15]" /> -->
			<div class="flex flex-col h-full flex-1 px-2">
				<div class="flex justify-between items-center w-full h-11">
					<!-- pull out into navigation component at some point -->
					<div class="flex items-center gap-4">
						<Icon
							class="text-neutral/[0.5]"
							icon="material-symbols:arrow-back-rounded"
							height="24"
						/>
						<Breadcrumbs path={$page.url.pathname} />
					</div>
					<!-- profile -->
					<div class="flex items-center gap-4 text-neutral">
						<!-- pfp -->
						<div>pfp</div>
						<!-- username -->
						<div>username</div>
						<!-- dropdown -->
						<form action="/logout" method="POST">
							<button type="submit">
								<Icon icon="material-symbols:keyboard-arrow-down-rounded" width="28" />
							</button>
						</form>
					</div>
				</div>
				<slot />
			</div>
			<span class="h-full w-[1px] bg-neutral/[0.15]" />
			<div class="border-0 h-full w-52" />
		</div>
		<div class="absolute bottom-0 bg-base-100 h-[88px] w-full" />
		<div class="absolute bottom-0 bg-neutral/[0.15] h-[88px] w-full" />
	</div>
{/if}
