<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import { page } from '$app/stores';
	import SideNavbar from '$lib/components/SideNavbar.svelte';
	import Notifications from '$lib/components/Notifications.svelte';
	import PageView from '$lib/components/PageView.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

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
</script>

<Notifications />

{#if $page.url.pathname === '/login' || $page.url.pathname === '/register'}
	<div class="h-screen w-screen">
		<slot />
	</div>
{:else}
	<div class="flex h-screen w-screen flex-col bg-black">
		<div class="flex min-h-0 min-w-0 grow items-center gap-4 p-4">
			{#if data.connected.spotify || data.connected.soundcloud}
				<SideNavbar />
			{/if}
			<PageView>
				<slot />
			</PageView>
			{#if data.connected.spotify || data.connected.soundcloud}
				<div class="h-full w-72 rounded-xl border-0 bg-base-100" />
			{/if}
		</div>
		<div class="flex h-20" />
	</div>
{/if}
