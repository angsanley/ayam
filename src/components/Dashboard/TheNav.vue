<template>
    <div>
        <div class="sidenavbar">

            <ul class="nav list-none">
                <li>
                    <router-link to="/dashboard" class="link cursor-pointer font-medium flex flex-col items-center justify-center py-1 rounded block mb-5" exact-active-class="link-active">
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

        <div class="navbar">
            <img class="logo" src="../../assets/ayam_logo.svg" alt="logo"/>
            aasdas
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
        @apply relative h-16 py-1 px-6 text-gray-900 bg-white text-left float-none fixed flex justify-between items-center shadow-md z-30;
        width: 100vw;
    }

    .sidenavbar {
        @apply relative py-1 px-6 text-gray-900 bg-white text-left float-none fixed bottom-0 z-40;
        width: 100vw;
        height: 4rem;
        box-shadow: 0 -10px 15px -3px rgba(0, 0, 0, 0.05), 0 -4px 6px -2px rgba(0, 0, 0, 0.025);
    }

    .logo {
        @apply h-full pt-3 pb-3 object-scale-down object-left;
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
            @apply bg-gray-100 shadow-none;
        }

        .logo {
            @apply pl-24;
        }

        .sidenavbar {
            @apply py-8 px-4 float-left;
            width: 6rem;
            min-height: 100vh;
            color: white;
            background: #1E87C9;
        }

        .nav {
            @apply block;
        }

        .nav > li {
            @apply float-none;
        }

        .link-active {
            @apply bg-white;
        }
    }
</style>
