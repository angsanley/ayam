<template>
    <div>
        <div class="mb-4 text-xl"><a @click="$router.go(-1)" href="#" class="no-underline text-gray-700 dark-mode:text-gray-100"><i class="fas fa-arrow-left"/></a></div>
    </div>
</template>

<script>
    export default {
        name: "BackButton"
    }
</script>

<style scoped>

</style>
