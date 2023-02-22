<script lang="ts">
	import Icon from '@iconify/svelte';
	export let connected: boolean | null;
	export let icon: string;
	export let label: string;
	let action = label.toLowerCase().replace(/ /g, '');
</script>

<div
	class="flex w-1/6 flex-col items-start gap-2 rounded-lg border-2 border-neutral/[0.15] p-4 text-neutral"
>
	<Icon {icon} height="28" />
	<p class="text-lg">
		{label}
	</p>
	{#if $$slots.description}
		<p class="text-sm">
			<slot name="description" />
		</p>
	{/if}
	<form method="POST">
		<button
			disabled={connected !== false}
			class="flex items-center gap-2 {connected
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
	</form>
</div>
