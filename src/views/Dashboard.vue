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
                const CookieFactory = Repositories.get("cookie");

                this.$Progress.start();

                const currentSession = this.$store.getters.getCurrentSession;

                if (!currentSession.isAuthenticated || currentSession.phpsessid === '') {
                    this.$store.dispatch('addNotifications', { title: '⚠️ Oops!', text: 'You are not logged in, please login first. 😏', type: 'warn' })

                    // redirect to login
                    await this.$store.dispatch('isAuthenticated', false);
                    await this.$router.push('/login');

                    return;
                }

                try {
                    const { data } = await SessionFactory.check();

                    if (data.RoleID === 0) {
                        let newSession = currentSession;
                        // try to relogin
                        try {
                            await this.$store.dispatch('addNotifications', {
                                title: 'Hold on... 🤔',
                                text: 'Something changed. We are trying to fetch your data one more time...',
                                type: 'warn'
                            })

                            const { data } = await CookieFactory.auth(currentSession.username, currentSession.password);
                            const phpsessid = data.cookies.find(el => el.name === "PHPSESSID").value;

                            newSession.isAuthenticated = true;
                            newSession.phpsessid = phpsessid;
                            await this.$store.dispatch('setCurrentSession', newSession);

                            await this.$store.dispatch('addNotifications', {
                                title: 'All done! 🎉',
                                text: 'We\'ve successfully updated your data. Enjoy!',
                                type: 'success'
                            })

                            // refresh
                            await this.$router.push('/');

                        } catch (error) {
                            if (error.response) {
                                // redirect to login page

                                if (error.response.status === 401) await this.$store.dispatch('addNotifications', {
                                    title: '⚠️ Oops!',
                                    text: 'Session expired. Please login again. 😬',
                                    type: 'warn'
                                })
                                else await this.$store.dispatch('addNotifications', {
                                    title: '⚠️ Oops!',
                                    text: error.response.data.message,
                                    type: 'warn'
                                })

                                newSession.isAuthenticated = false;
                                await this.$store.dispatch('setCurrentSession', newSession);
                                await this.$router.push('/login');
                            }
                        }
                    }
                } catch (error) {
                    this.$Progress.fail();
                    if (error.response) {
                        if (error.response.status === 404) {
                            // maybe in maintenance mode
                            await this.$store.dispatch('addNotifications', {
                                title: '🤔 Hmm...',
                                text: 'Looks like BINUSMaya is currently doing maintenance, you are seeing an offline copy of your data right now.',
                                type: 'warn'
                            });

                            // await this.$router.push('/maintenance');
                        }
                    }
                }

                this.$Progress.finish();
            },
        },
        mounted() {
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
