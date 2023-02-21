<script>
    import ConnectProviderCard from '$lib/components/ConnectProviderCard.svelte'
</script>

<div class="w-full h-full p-2 flex flex-col gap-2">
    <p class="text-2xl font-bold text-neutral">Connect Music</p> 
    <p class="text-neutral text-sm">Connect your favorite music services to start listening!</p>
    <form method="POST" class="flex flex-row gap-4 w-full">
         <ConnectProviderCard connected={false} icon="logos:spotify-icon" title="Spotify" />
         <ConnectProviderCard connected={false} icon="logos:soundcloud" title="Soundcloud" />
         <ConnectProviderCard connected={null} icon="logos:youtube-icon" title="Youtube Music" />
    </form>
</div>


