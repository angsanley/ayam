<template>
    <div>
        <div class="sidenavbar">

            <div class="h-16 mt-0 hidden lg:block p-4">
                <img class="w-full h-full object-scale-down" src="../../assets/ayam_logo.svg" alt="logo"/>
            </div>

            <ul class="nav list-none">
                <li>
                    <router-link to="/dashboard" class="link cursor-pointer font-medium flex flex-col items-center justify-center py-1 block mb-5" exact-active-class="link-active">
                        <i class="w-8 fas fa-home p-2"/>
                        <span class="mx-2 text-sm">Home</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/dashboard/academics" class="link cursor-pointer font-medium flex flex-col items-center justify-center py-1 block mb-5" active-class="link-active">
                        <i class="w-8 fas fa-chalkboard-teacher p-2"/>
                        <span class="mx-2 text-sm">Academics</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/dashboard/financial" class="link cursor-pointer font-medium flex flex-col items-center justify-center py-1 block mb-5" active-class="link-active">
                        <i class="w-8 fas fa-wallet p-2"/>
                        <span class="mx-2 text-sm">Financial</span>
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="navbar" v-click-outside="closeUserCard">

<!--         search bar-->
            <div class="relative text-gray-600 dark-mode:text-gray-400 lg:ml-24">
                <input type="search" name="search" placeholder="Search" class="bg-gray-300 placeholder-gray-600 dark-mode:placeholder-gray-400 dark-mode:bg-gray-800 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none">
                <button type="submit" class="absolute right-0 top-0 mt-2 mr-4">
                    <i class="fas fa-search"></i>
                </button>
            </div>

            <a href="#" @click.prevent="toggleUserCard"><img class="account-pic h-10 w-10" :src="profilePicture" alt="profile picture"/></a>
            <transition name="fade">
                <div class="user-card" v-if="showUserCard">
                    <div class="flex flex-col items-center">
                        <img class="account-pic h-24 w-24" :src="profilePicture" alt="profile picture"/>
                        <div class="font-title font-bold text-lg mt-2 capitalize dark-mode:text-gray-300">{{ studentProfile.name }}</div>
                        <div class="text-sm mt-2 dark-mode:text-gray-400">{{ studentProfile.email }}</div>
                        <div class="text-sm text-gray-600 dark-mode:text-gray-400">{{ studentProfile.major }}</div>
                        <a href="#" @click.prevent="logout" class="border-2 rounded-full w-full py-1 mt-4 text-center text-gray-700 dark-mode:text-gray-400 no-underline hover:bg-gray-100 dark-mode:hover:bg-gray-800 focus:outline-none">Logout</a>
                    </div>
                </div>
            </transition>
        </div>

    </div>
</template>

<script>
    import RepositoryFactory from "../../repositories/RepositoryFactory";

    export default {
        name: "TheNav",
        data() {
            return {
                showUserCard: false,
                profilePicture: require('../../assets/img/profile_placeholder.png')
            }
        },
        mounted() {
            this.getPhoto();
        },
        computed: {
            dashboardData() {
                return this.$store.getters.getDashboardData;
            },
            studentProfile() {
                let profile = { name: '', email: '', major: '' };
                if (this.dashboardData) profile = {
                    name: this.dashboardData['Student']['Name'].toLowerCase(),
                    email: this.dashboardData['Student']['Email'],
                    major: this.dashboardData['Student']['Major']
                };
                return profile;
            },
        },
        methods: {
            toggleUserCard() {
                this.showUserCard = !this.showUserCard
            },
            closeUserCard() {
                this.showUserCard = false;
            },
            logout() {
                this.$store.dispatch('clearAll');
                this.$router.push('/login');
            },
            async getPhoto() {
                const GeneralRepository = RepositoryFactory.get('general');
                const response = await GeneralRepository.getPhoto();
                this.profilePicture = `data:image/png;base64,${response.data['photo']}`;
            }
        },
        directives: {
            clickOutside: {
                bind: function (el, binding, vnode) {
                    window.event = function (event) {
                        if (!(el === event.target || el.contains(event.target))) {
                            vnode.context[binding.expression](event);
                        }
                    };
                    document.body.addEventListener('click', window.event)
                },
                unbind: function () {
                    document.body.removeEventListener('click', window.event)
                },
            }
        }
    }
</script>

<style scoped>
    .navbar {
        @apply relative h-16 py-1 px-6 text-gray-900 bg-white text-left float-none fixed flex justify-between items-center shadow-md z-20;
        width: 100vw;
    }

    .sidenavbar {
        @apply relative px-6 text-gray-900 bg-white text-left float-none fixed bottom-0 z-40;
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
        @apply text-primaryDark;
    }

    .nav {
        @apply flex justify-around;
    }

    .nav > li {
        @apply float-left;
    }

    .account-pic {
        @apply rounded-full object-cover object-top;
    }

    .user-card {
        @apply bg-white rounded-lg shadow-xl fixed px-4 py-6 mt-16 mr-6 top-0 right-0;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    @media (min-width: 1024px) {
        .navbar {
            @apply bg-gray-100 shadow-none;
        }

        .sidenavbar {
            @apply px-0 float-left shadow-none text-gray-800 bg-gray-100;
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
            @apply border-l-4 border-primaryDark;
        }
    }

    @screen dark-mode {
        .sidenavbar, .navbar {
            @apply bg-gray-900;
        }

        .nav {
            @apply text-gray-400;
        }

        .user-card {
            @apply bg-gray-900 rounded-lg shadow-xl fixed px-4 py-6 mt-16 mr-6 top-0 right-0;
        }
    }
</style>
