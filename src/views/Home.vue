<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        Hello, {{binusianData.FIRST_NAME}}
    </div>
</template>

<script>
    // @ is an alias to /src
    // GET https://binusmaya.binus.ac.id/services/ci/index.php/staff/init/check_session
    // GET https://binusmaya.binus.ac.id/services/ci/index.php/general/getBinusianData

    import axios from "axios";

    export default {
        name: 'Home',
        components: {
        },
        data() {
            return {
                binusianData: {}
            }
        },
        methods: {
            checkSession() {
                this.$Progress.start();

                if (this.$store.state.phpsessid === '') {
                    // redirect to login
                    this.$router.push('/login');
                }

                axios.request({
                    url: "http://localhost:3000/fetch/https://binusmaya.binus.ac.id/services/ci/index.php/staff/init/check_session",
                    method: "get",
                    headers: {
                        Bisquit: `PHPSESSID=${this.$store.state.phpsessid}`
                    }
                })
                    .then((response) => {
                        const sessionStatus = response.data;

                        if (sessionStatus.RoleID === 0) {
                            // redirect to login
                            this.$router.push('/login');
                        }

                        this.$Progress.finish();
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$Progress.fail();
                    });
            },
            getBinusianData() {
                // https://binusmaya.binus.ac.id/services/ci/index.php/general/getBinusianData
                axios.request({
                    url: "http://localhost:3000/fetch/https://binusmaya.binus.ac.id/services/ci/index.php/general/getBinusianData",
                    method: "get",
                    headers: {
                        Bisquit: `PHPSESSID=${this.$store.state.phpsessid}`
                    }
                })
                    .then((response) => {
                        this.binusianData = response.data;
                        this.$Progress.finish();
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$Progress.fail();
                    });
            }
        },
        async mounted() {
            await this.checkSession();
            await this.getBinusianData();
        }
    }
</script>
