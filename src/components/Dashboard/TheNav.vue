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

        <div class="navbar" v-click-outside="closeUserCard">
            <img class="logo" src="../../assets/ayam_logo.svg" alt="logo"/>

            <a href="#" @click.prevent="toggleUserCard"><img class="account-pic h-10 w-10" :src="profilePicture" alt="profile picture"/></a>
            <transition name="fade">
                <div class="user-card" v-if="showUserCard">
                    <div class="flex flex-col items-center">
                        <img class="account-pic h-24 w-24" :src="profilePicture" alt="profile picture"/>
                        <div class="font-title font-bold text-lg mt-2 capitalize">{{dashboardData['Student']['Name'].toLowerCase()}}</div>
                        <div class="text-sm mt-2">{{dashboardData['Student']['Email']}}</div>
                        <div class="text-sm text-gray-600">{{dashboardData['Student']['Major']}}</div>
                        <router-link to="/login" class="border-2 rounded-full w-full py-1 mt-4 text-center text-gray-700 no-underline hover:bg-gray-100 focus:outline-none">Logout</router-link>
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
            }
        },
        methods: {
            toggleUserCard() {
                this.showUserCard = !this.showUserCard
            },
            closeUserCard() {
                this.showUserCard = false;
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
