<template>
    <div>
        <h3>Your Schedule</h3>
        <div class="mt-4">
            <vc-calendar class="shadow-md border-none" is-expanded :attributes="calendarDates"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "YourSchedule",
        props: ['calendarDates'],
        data() {
            return {

            }
        }
    }
</script>

<style scoped>

</style>
