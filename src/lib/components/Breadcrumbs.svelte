<script lang="ts">
	import Icon from '@iconify/svelte';
	export let path: string;
	let crumbs: any[];
	$: {
		const tokens = path.split('/').filter((t) => t !== '');
		let tokenPath = '';
		crumbs = tokens.map((t) => {
			tokenPath += '/' + t;
			return {
				label: t.replace('-', ' '),
				href: tokenPath
			};
		});

		crumbs.unshift({ label: 'home', href: '/' });
	}
</script>

<div class="flex items-center gap-2">
	{#each crumbs as c, i}
		{#if i == crumbs.length - 1}
			<p class="text-neutral/[0.5]">{c.label}</p>
		{:else}
			<a class="text-neutral/[0.15] hover:text-neutral/[0.5]" href={c.href}>{c.label}</a>
			<Icon class="text-neutral/[0.15]" icon="material-symbols:chevron-right-rounded" height="28" />
		{/if}
	{/each}
</div>
