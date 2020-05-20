<template>
    <div class="navbar">
        <img class="hidden lg:block" src="../assets/logo.png" alt="logo"/>

        <ul class="nav list-none lg:mt-8">
            <li>
                <router-link to="/" class="link cursor-pointer font-medium flex flex-col items-center justify-center py-1 rounded block mb-5" exact-active-class="link-active">
                    <i class="w-8 fas fa-home p-2"/>
                    <span class="mx-2 text-sm">Home</span>
                </router-link>
            </li>
            <li>
                <router-link to="/as" class="link cursor-pointer font-medium flex flex-col items-center justify-center py-1 rounded block mb-5" active-class="link-active">
                    <i class="w-8 fas fa-home p-2"/>
                    <span class="mx-2 text-sm">Page 2</span>
                </router-link>
            </li>
        </ul>

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
        @apply relative py-1 px-6 text-gray-900 bg-white text-left shadow-lg float-none fixed bottom-0;
        width: 100vw;
        height: 4rem;
    }

    .link {
        text-decoration: none;
        color: inherit;
    }

    .link-active {
        @apply text-blue-600;
    }

    .nav {
        @apply flex justify-around;
    }

    .nav > li {
        @apply float-left;
    }

    @media (min-width: 1024px) {
        .navbar {
            @apply py-8 px-4 float-left;
            width: 6rem;
            min-height: 100vh;
        }

        .nav {
            @apply block;
        }

        .nav > li {
            @apply float-none;
        }

        .link-active {
            @apply bg-gray-200;
        }
    }
</style>
