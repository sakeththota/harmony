<script lang="ts">
    import { fly } from 'svelte/transition';
    import { notifications } from '$lib/notifications';
    import Icon from '@iconify/svelte';
</script>

{#if $notifications}
    <div class="flex flex-col absolute top-0 right-0 gap-4 m-4">
        {#each $notifications as notification}
            <div role='alert' class="flex gap-4 items-center bg-neutral p-4 rounded-lg text-base-100 text-sm" transition:fly="{{x: 15, duration: 300 }}">
                {#if notification.type === 'warning'}
                    <Icon class="text-warning" icon="ph:warning-fill" height='20'/>
                {:else if notification.type === 'success'}
                    <Icon class="text-success" icon="ph:check-circle-fill" height='20'/>
                {:else if notification.type === 'error'}
                    <Icon class="text-error" icon="ph:x-circle-fill" height='20'/>
                {:else if notification.type === 'info'}
                    <Icon class="text-info" icon="ph:info-fill" height='20'/>
                {/if}
                <p>{notification.message}</p>
            </div>
        {/each}
    </div>
{/if}
