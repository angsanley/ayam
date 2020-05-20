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
        @apply relative py-1 px-6 text-gray-900 bg-white text-left float-none fixed bottom-0 z-50;
        width: 100vw;
        height: 4rem;
        box-shadow: 0 -10px 15px -3px rgba(0, 0, 0, 0.05), 0 -4px 6px -2px rgba(0, 0, 0, 0.025);
    }

    .link {
        text-decoration: none;
        color: inherit;
    }

    .link-active {
        color: theme('colors.primary');
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
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
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
