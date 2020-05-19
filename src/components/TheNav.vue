<template>
    <div class="navbar">
        <img class="" src="../assets/logo.png" alt="logo"/>

        <router-link to="/" class="link cursor-pointer font-medium flex flex-col items-center justify-center py-1 mt-8 hover:bg-gray-200 rounded block mb-5" exact-active-class="link-active">
            <i class="w-8 fas fa-home p-2">
            </i>
            <span class="mx-2 text-sm">Home</span>
        </router-link>

        <router-link to="/as" class="link cursor-pointer font-medium flex flex-col items-center justify-center py-1 hover:bg-gray-200 rounded block mb-5" active-class="link-active">
            <i class="w-8 fas fa-home p-2">
            </i>
            <span class="mx-2 text-sm">Home</span>
        </router-link>

        <div class="absolute bottom-0 pb-4">
            asd
        </div>
    </div>
</template>

<script>
    export default {
        name: "TheNav"
    }
</script>

<style scoped>
    .navbar {
        @apply relative min-h-screen h-full py-8 px-4 text-gray-900 bg-white text-left shadow-lg float-left;
        width: 6rem;
    }

    .link {
        text-decoration: none;
        color: inherit;
    }

    .link-active {
        @apply bg-gray-200 text-blue-600;
    }
</style>
