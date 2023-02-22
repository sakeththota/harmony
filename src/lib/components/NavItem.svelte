<script lang="ts">
	import Icon from '@iconify/svelte';

	export let href: string;
	export let label: string;
	export let icon: string;
	export let active: boolean;
</script>

<a {href} class="h-8 py-1 border-0 flex items-center w-full">
	<div
		class="flex h-full flex-1 items-center rounded-md {active
			? 'bg-neutral/[0.15] text-neutral'
			: 'bg-none hover:text-neutral text-neutral/[0.5]'} gap-4 justify-start px-4"
	>
		<Icon {icon} height="18" />
		<p class="text-sm">{label}</p>
	</div>
</a>
