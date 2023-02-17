<script>
      import "../app.css";
      import { onMount } from 'svelte'
	import { invalidateAll } from "$app/navigation";
	import { supabase } from "$lib/supabase";

      onMount(() => {
            const { data: {subscription}} = supabase.auth.onAuthStateChange(()=>{
                  invalidateAll();
            })
            return () => {
                  subscription.unsubscribe();
            }
      })
</script>

<div class="box-border h-screen w-screen ">
      <slot />
</div>


