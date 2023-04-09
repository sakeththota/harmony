<script lang="ts">
	export let text: string;
	export let href: string;
	export let src: string;
</script>

<a {href}>
	<div
		class="flex h-12 items-center gap-4 rounded-lg px-2 text-left text-sm text-neutral hover:bg-neutral/[0.15]"
	>
		<img class="h-10 w-10 rounded-md" {src} alt="text" />
		<p class="truncate">{text}</p>
	</div>
</a>
