<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	export let href: string;
	export let icon: string;
	let selected = false;
	$: selected = $page.url.pathname === href;
</script>

<a {href} class="flex h-12 w-full items-center">
	<div
		class="flex h-full flex-1 items-center rounded-md {selected
			? 'text-neutral'
			: 'bg-none text-neutral/[0.5] hover:text-neutral'} justify-start gap-4 px-4"
	>
		<Icon {icon} height="20" />
		<p class="text-md"><slot /></p>
	</div>
</a>
