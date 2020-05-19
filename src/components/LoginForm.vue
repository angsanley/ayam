<template>
    <div>
        <form class="pt-12">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <div class="grid grid-cols-2 grid-flow-col gap-2 flex items-center">
                    <input class="col-span-2 default-input" id="username" type="text" placeholder="Username">
                    <div class="col-span-1">@binus.ac.id</div>
                </div>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input class="default-input w-full" id="password" type="password" placeholder="Password">
                <p id="error" class="text-red-500 text-xs italic"></p>
            </div>
            <div class="flex items-center justify-between">
                <button class="default-button" type="button">
                    Sign In
                </button>
                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                </a>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "LoginForm"
    }
</script>

<style scoped>

</style>
