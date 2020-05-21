<template>
    <div>
        Hello world
    </div>
</template>

<script>
    export default {
        name: "Home",
        computed: {
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            }
        },
        mounted() {
            if (this.$store.getters.isAuthenticated) {
                this.$router.push('/dashboard');
            } else {
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>

</style>
