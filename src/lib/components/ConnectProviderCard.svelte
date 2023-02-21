<script lang="ts">

    import Icon from '@iconify/svelte'
    export let connected: boolean | null;
    export let icon: string;
    export let title: string;

    let action = title.toLowerCase().replace(/ /g, "")
</script>
<div class="flex flex-col gap-2 border-2 p-4 rounded-lg text-neutral border-neutral/[0.15] items-start w-1/6">
    <Icon icon={icon} height="28" />
    <p class="text-lg">{title}</p>
    {#if connected === null}
        <button disabled class="flex gap-2 items-center text-neutral/[0.15]" type="submit">
            <p>Coming Soon</p>
        </button>
    {:else if connected}
        <button class="flex gap-2 items-center text-success" formaction="?/{action}" type="submit">
            <Icon icon="ph:check-circle-fill" />
            <p>Connected</p>
        </button>
    {:else}
        <button class="flex gap-2 items-center" formaction="?/{action}" type="submit">
            <p>Connect</p>
        </button>
    {/if}
</div>