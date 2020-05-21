<template>
    <div>
        <the-nav/>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import TheNav from "../components/TheNav";
    export default {
        name: "Dashboard",
        components: {TheNav}
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
