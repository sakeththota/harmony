<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	export let href: string;
	export let icon: string;
</script>

<a {href} class="flex h-8 w-full items-center border-0 py-1">
	<div
		class="flex h-full flex-1 items-center rounded-md {$page.url.pathname === href
			? 'bg-neutral/[0.15] text-neutral'
			: 'bg-none text-neutral/[0.5] hover:text-neutral'} justify-start gap-4 px-4"
	>
		<Icon {icon} height="18" />
		<p class="text-sm"><slot /></p>
	</div>
</a>
