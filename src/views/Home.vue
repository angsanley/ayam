<template>
    <div>
        Hello world
    </div>
</template>

<script>
    export default {
        name: "Home",
        computed: {
            currentSession() {
                return this.$store.getters.getCurrentSession;
            }
        },
        mounted() {
            if (this.currentSession.isAuthenticated) {
                this.$router.push('/dashboard');
            } else {
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>

</style>
