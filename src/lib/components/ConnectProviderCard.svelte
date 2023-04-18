<script lang="ts">
	import Icon from '@iconify/svelte';
	export let connected: boolean | null;
	export let icon: string;
	export let label: string;
	let action = label.toLowerCase().replace(/ /g, '');
</script>

<div class="group relative flex w-1/5">
	<div
		class="flex w-full flex-col items-start gap-2 rounded-lg border-2 border-neutral/[0.15] p-4 text-neutral"
	>
		<Icon {icon} height="32" />
		<p class="text-xl">
			{label}
		</p>
		<button
			disabled={connected !== false}
			class="flex items-center gap-2 text-lg {connected
				? 'text-success'
				: connected === null
				? 'text-neutral/[0.15]'
				: 'text-neutral/[0.5] hover:text-neutral'}"
			type="submit"
			formaction="?/{action}"
		>
			{#if connected === null}
				<p>Coming Soon</p>
			{:else if connected}
				<Icon icon="ph:check-circle-fill" />
				<p>Connected</p>
			{:else}
				<p>Connect</p>
			{/if}
		</button>
	</div>
	{#if $$slots.default}
		<span
			class="text-md absolute top-full mt-4  
		rounded-md border-2 border-error  p-2 text-neutral opacity-0 group-hover:opacity-100"><slot /></span
		>
	{/if}
</div>
