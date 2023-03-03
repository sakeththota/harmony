<script lang="ts">
	export let text: string;
	export let href: string;
</script>

<a
	{href}
	class="min h-8 flex-none truncate px-4 text-left text-sm text-neutral/[0.5] hover:text-neutral/[0.75]"
	>{text}</a
>
