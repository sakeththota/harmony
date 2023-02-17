<script>

</script>

<div class="flex h-full w-full justify-center items-center">
    <div class="flex flex-row justify-between items-center gap-20 bg-[#141416] h-3/4 w-3/5 rounded-[25px] text-white p-9">
        <!-- login form wrapper -->
        <div class="flex justify-center items-center h-full w-1/2 ">
            <!-- login form -->
            <form class="flex flex-col justify-center gap-6 w-3/5">
                <h1 class="text-4xl font-semibold">Login</h1>
                <input type="text" placeholder="Email" class="border-[1px] bg-transparent rounded-lg h-14 p-4 text-lg" >
                <input type="password" placeholder="Password" class="border-[1px] bg-transparent rounded-lg h-14 p-4 text-lg" >
                <p class="text-right">Forgot password?</p>
                <button class='bg-white/[.15] rounded-lg h-14 p-4 text-lg'>Login</button>
                <div class="flex justify-evenly items-center gap-4 px-2">
                    <span class="h-0.5 bg-white/[.15] flex-1"/>
                    <p>Or</p>
                    <span class="h-0.5 bg-white/[.15] flex-1" />
                </div>
                <a class="bg-white/[.15] rounded-full h-14 p-4 flex justify-center items-center text-lg" href='/'>Login w/ Spotify</a>
                <a class="bg-white/[.15] rounded-full h-14 p-4 flex justify-center items-center text-lg" href='/'>Login w/ Google</a>
                <p>Don't have an account? <a href="/">Sign Up</a></p>
            </form>
        </div>
        <!-- some sort of advertising / marketing design -->
        <div class="h-full w-1/2 border-2 rounded-[25px]"/>
    </div>
</div>