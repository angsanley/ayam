<template>
    <div>
        <form class="pt-12" v-on:submit.prevent="submitForm">
            <div class="mb-4">
                <label class="block text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <div class="grid grid-cols-2 grid-flow-col gap-2 flex items-center">
                    <input class="col-span-2 default-input" v-model="form.username" id="username" type="text" placeholder="Username" :disabled="(this.loading)">
                    <div class="col-span-1">@binus.ac.id</div>
                </div>
            </div>
            <div class="mb-6">
                <label class="block text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input class="default-input w-full" v-model="form.password" id="password" type="password" placeholder="Password" :disabled="(this.loading)">
                <p class="text-red-500 text-xs italic">{{ error }}</p>
            </div>
            <div class="flex items-center justify-between">
                <button class="default-button" type="submit" :disabled="(this.loading)">
                    <i class="fas fa-circle-notch fa-spin" v-if="(this.loading)"/> {{ (this.loading? loadingButtonText : buttonText) }}
                </button>
                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                </a>
            </div>
        </form>
    </div>
</template>

<script>
    import RepositoryFactory from "../repositories/RepositoryFactory";

    export default {
        name: "LoginForm",
        data () {
            return {
                error: "",
                form: {
                    username: "",
                    password: ""
                },
                cookies: {},
                loading: false,
                buttonText: "Sign In",
                loadingButtonText: "Signing in...",
            }
        },
        methods: {
            submitForm() {
                this.$Progress.start();
                this.error = "";
                this.loading = true;
                const CookieRepository = RepositoryFactory.get('cookie')
                CookieRepository.auth(this.form.username, this.form.password)
                    .then((response) => {
                        // console.log(response.data);
                        this.cookies = response.data.cookies;

                        // save phpsessid
                        const phpsessid = this.cookies.find(el => el.name === "PHPSESSID").value;
                        this.$store.dispatch('setPhpsessid', phpsessid);
                        this.$store.dispatch('isAuthenticated', true);

                        this.$Progress.finish();
                        this.loading = false;

                        // redirect to home
                        this.$router.push('/');
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$Progress.fail();
                        this.loading = false;
                        this.error = error.response.data.message;
                    });
            }
        },
        created() {
        }
    }
</script>

<style scoped>

</style>
