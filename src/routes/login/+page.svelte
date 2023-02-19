<script lang="ts">
    import Icon from '@iconify/svelte';
</script>

<div class="flex h-full w-full justify-center items-center bg-gradient-to-tr from-accent via-secondary to-primary">
    <div class="flex flex-row justify-between items-center gap-20 bg-[#141416] h-3/4 w-3/5 rounded-[25px] text-neutral p-9">
        <!-- login form wrapper -->
        <div class="flex justify-center items-center h-full w-1/2 ">
            <!-- login form -->
            <form action="?/login" method="POST" class="flex flex-col justify-center gap-6 w-3/5">
                <h1 class="text-3xl font-semibold">Login</h1>
                <input type="text" name="email" placeholder="Email" class="border-[1px] border-neutral/[.5] bg-transparent rounded-lg h-14 p-4 placeholder:text-lg placeholder:text-neutral/[0.35] focus:outline-none focus:ring-2 focus:ring-primary" >
                <input type="password" name="password" placeholder="Password" class="border-[1px] border-neutral/[.5] bg-transparent rounded-lg h-14 p-4 placeholder:text-lg placeholder:text-neutral/[0.35] focus:outline-none focus:ring-2 focus:ring-primary" >
                <a href="/" class="text-right">Forgot password?</a>
                <button type="submit" class='bg-neutral/[.15] hover:bg-neutral/[.2]  rounded-lg h-14 p-4 text-lg'>Login</button>
                <div class="flex justify-evenly items-center gap-4 px-2">
                    <span class="h-0.5 bg-neutral/[.15] flex-1"/>
                    <p>Or</p>
                    <span class="h-0.5 bg-neutral/[.15] flex-1" />
                </div>
                <a href='/' class="bg-neutral/[.15] hover:bg-neutral/[.2] rounded-full h-14 p-4 flex justify-center items-center text-lg gap-8">
                    <Icon icon="logos:spotify-icon" width=28/>
                    <p>Login w/ Spotify</p>
                </a>
                <a href='/' class="bg-neutral/[.15] hover:bg-neutral/[.2] rounded-full h-14 p-4 flex justify-center items-center text-lg gap-8">
                    <Icon icon="logos:google-icon" width=28/>
                    <p>Login w/ Google</p>
                </a>
                <p class="text-center">Don't have an account? <a class="text-primary" href="/register">Sign Up</a></p>
            </form>
        </div>
        <!-- some sort of advertising / marketing design -->
        <div class="h-full w-1/2 border-2 border-neutral rounded-[25px]"/>
    </div>
</div>