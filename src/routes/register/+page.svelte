<script lang="ts">
</script>

<div class="flex h-full w-full justify-center items-center bg-gradient-to-tr from-accent via-secondary to-primary">
    <div class="flex flex-row justify-between items-center gap-20 bg-[#141416] h-3/4 w-3/5 rounded-[25px] text-neutral p-9">
        <!-- register form wrapper -->
        <div class="flex justify-center items-center h-full w-1/2 ">
            <!-- register form -->
            <form action="?/register" method="POST" class="flex flex-col justify-center gap-4 w-3/5">
                <h1 class="text-3xl font-semibold">Sign Up</h1>
                <div class="flex justify-center items-center gap-4">
                    <input type="text" name="first_name" placeholder="First Name" class="w-1/2 border-[1px] border-neutral/[.5] bg-transparent rounded-lg h-14 p-4 placeholder:text-md placeholder:text-neutral/[0.35] focus:outline-none focus:ring-2 focus:ring-primary" >
                    <input type="text" name="last_name" placeholder="Last Name" class="w-1/2 border-[1px] border-neutral/[.5] bg-transparent rounded-lg h-14 p-4 placeholder:text-md placeholder:text-neutral/[0.35] focus:outline-none focus:ring-2 focus:ring-primary" >        
                </div>
                <input type="text" name="email" placeholder="Email" class="border-[1px] border-neutral/[.5] bg-transparent rounded-lg h-14 p-4 placeholder:text-lg placeholder:text-neutral/[0.35] focus:outline-none focus:ring-2 focus:ring-primary" >
                <input type="password" name="password" placeholder="Password" class="border-[1px] border-neutral/[.5] bg-transparent rounded-lg h-14 p-4 placeholder:text-lg placeholder:text-neutral/[0.35] focus:outline-none focus:ring-2 focus:ring-primary" >
                <input type="password" name="confirm_password" placeholder="Confirm Password" class="border-[1px] border-neutral/[.5] bg-transparent rounded-lg h-14 p-4 placeholder:text-lg placeholder:text-neutral/[0.35] focus:outline-none focus:ring-2 focus:ring-primary" >
                <button type="submit" class='bg-neutral/[.15] hover:bg-neutral/[.2]  rounded-lg h-14 p-4 text-lg'>Sign Up</button>
                <p class="text-center">Already have an account? <a class="text-primary" href="/login">Login</a></p>
            </form>
        </div>
        <!-- some sort of advertising / marketing design -->
        <div class="h-full w-1/2 border-2 border-neutral rounded-[25px]"/>
    </div>
</div>