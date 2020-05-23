<template>
    <div>
        <the-nav/>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import TheNav from "../components/Dashboard/TheNav";
    import Repositories from "../repositories/RepositoryFactory";
    export default {
        name: "Dashboard",
        components: {TheNav},
        methods: {
            async checkSession() {
                const SessionFactory = Repositories.get("session");

                this.$Progress.start();

                if (!this.$store.getters.isAuthenticated || this.$store.state.phpsessid === '') {
                    this.$store.dispatch('addNotifications', { title: '⚠️ Oops!', text: 'You are not logged in, please login first. 😏', type: 'warn' })

                    // redirect to login
                    await this.$store.dispatch('isAuthenticated', false);
                    await this.$router.push('/login');
                }

                try {
                    const { data } = await SessionFactory.check();

                    if (data.RoleID === 0) {
                        // redirect to login
                        await this.$store.dispatch('isAuthenticated', false);
                        await this.$router.push('/login');
                    }
                } catch (error) {
                    this.$Progress.fail();
                    if (error.response) {
                        if (error.response.status === 404) {
                            // maybe in maintenance mode
                            await this.$router.push('/maintenance');
                        }
                    }
                }

                this.$Progress.finish();
            },
        },
        mounted() {
            this.checkSession();
        }
    }
</script>

<style>
    .content {
        padding-left: 0;
        padding-bottom: 4rem;
    }
    @media (min-width: 1024px) {
        .content {
            padding-left: 6rem;
            padding-bottom: 0;
        }
    }
</style>
