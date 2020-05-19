<template>
    <div class="relative min-h-screen w-full h-full py-8 px-6 text-gray-900 bg-white text-left capitalize font-medium shadow-lg">
        <h3 class="hidden lg:block">BINUSMaya</h3>
        <img class="lg:hidden" src="../assets/logo.png" alt="logo"/>
        <span class="cursor-pointer flex items-center justify-center lg:justify-start py-1 mt-8 hover:bg-gray-200 hover:text-gray-700 rounded block mb-5">
            <i class="w-8 fas fa-stream p-2 bg-gray-200 rounded-full">
            </i>
            <span class="mx-2 hidden lg:block">Stream</span>
          </span>
        <span class="cursor-pointer flex items-center justify-center lg:justify-start py-1 hover:bg-gray-200 hover:text-gray-700 rounded block mb-5">
            <i class="w-8 fas fa-stream p-2 bg-gray-200 rounded-full">
            </i>
            <span class="mx-2 hidden lg:block">Stream</span>
          </span>
    </div>
</template>

<script>
    export default {
        name: "TheNav"
    }
</script>

<style scoped>

</style>
