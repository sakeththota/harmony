<script lang="ts">
    import { fade } from 'svelte/transition';
    import { notifications } from '$lib/notifications';
    import Icon from '@iconify/svelte';
    const icons = {
        'success': 'ph:check-circle-fill',
        'warning': 'ph:warning-fill',
        'error': 'ph:x-circle-fill',
        'info': 'ph:info-fill'
    }
</script>

{#if $notifications}
    <div class="flex flex-col absolute top-0 right-0 gap-4 m-4">
        {#each $notifications as notification}
            <div role='alert' class="flex gap-4 items-center bg-base-100 p-4 rounded-lg text-neutral text-sm" transition:fade>
                <Icon class="text-{notification.type}" icon="{icons[notification.type]}" height='20'/>
                <p>{notification.message}</p>
            </div>
        {/each}
    </div>
{/if}
