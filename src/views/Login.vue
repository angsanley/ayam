<template>
    <div>
        <div class="grid flex justify-center md:grid-cols-12">
            <div class="md:col-span-6 lg:col-span-7 flex justify-center">
                <img class="object-scale-down p-20 md:p-10 xl:p-48" src="../assets/img/login_vector.png" alt="login"/>
            </div>
            <div class="md:col-span-6 lg:col-span-5 md:h-screen flex md:items-center">
                <div class="container md:pt-0 md:pb-20">
                    <h1>Welcome</h1>
                    <h2 class="font-light">Sign in to BINUSMaya</h2>
                    <login-form/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LoginForm from "../components/LoginForm";
    export default {
        name: "Login",
        components: {LoginForm}
    }
</script>

<style scoped>
</style>
