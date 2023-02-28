<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import SideNavbar from '$lib/components/SideNavbar.svelte';
	import Notifications from '$lib/components/Notifications.svelte';
	import PlaylistLink from '$lib/components/PlaylistLink.svelte';
	import PageView from '$lib/components/PageView.svelte';

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

	let playlists: any[] = [];
</script>

<Notifications />

{#if $page.url.pathname === '/login' || $page.url.pathname === '/register'}
	<div class="h-screen w-screen">
		<slot />
	</div>
{:else}
	<div class="flex h-screen w-screen flex-col bg-base-100">
		<div class="flex h-full items-center gap-2 p-4">
			<SideNavbar>
				{#each playlists as playlist}
					<PlaylistLink text={playlist} />
				{/each}
				<!-- hacky fix for playlist scroll to be completely seen :) -->
				<PlaylistLink text="" />
				<PlaylistLink text="" />
			</SideNavbar>
			<!-- <span class="h-full w-[1px] bg-neutral/[0.15]" /> -->
			<PageView>
				<slot />
			</PageView>
			<span class="h-full w-[1px] bg-neutral/[0.15]" />
			<div class="h-full w-52 border-0" />
		</div>
		<div class="absolute bottom-0 h-[88px] w-full bg-base-100" />
		<div class="absolute bottom-0 h-[88px] w-full bg-neutral/[0.15]" />
	</div>
{/if}
