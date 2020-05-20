<template>
    <div>
        <div class="grid flex justify-center md:grid-cols-12 h-full">
            <div class="md:col-span-6 lg:col-span-7 flex justify-center">
                <div class="container flex justify-center p-20">
                    <img class="h-64 md:h-auto object-contain" src="../assets/img/maintenance.png" alt="maintenance"/>
                </div>
            </div>
            <div class="md:col-span-6 lg:col-span-5 md:h-screen flex md:items-center">
                <div class="container md:pt-0 md:pb-20">
                    <h1>Under Construction</h1>
                    <h2 class="font-light">BINUSMaya lagi main tenis gan!</h2>
                    <h3 class="font-light">Tunggu bentar ya...</h3>

                    <div class="mt-4">
                        <Countdown v-if="currentMaintenanceTime" :end="currentMaintenanceTime" showDays showHours showMinutes showSeconds :endFunction="goToHome"></Countdown>
                    </div>
<!--                    00.30 - 00.45-->
<!--                    05.30 - 05.45-->
<!--                    18.00 - 18.15-->
                    <login-form/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Countdown from 'countdown-vue'
    import moment from 'moment-timezone'

    export default {
        name: "Maintenance",
        components: { Countdown },
        data() {
            return {
                maintenanceTimes: [
                    {start: new moment("00:30:00", "HH:mm:ss").toDate(), end: new moment("00:45:59", "HH:mm:ss").toDate()},
                    {start: new moment("05:30:00", "HH:mm:ss").toDate(), end: new moment("05:45:59", "HH:mm:ss").toDate()},
                    {start: new moment("18:00:00", "HH:mm:ss").toDate(), end: new moment("18:15:59", "HH:mm:ss").toDate()}
                ],
                currentMaintenanceTime: null,
                test: "2025-03-16T00:42:24.000Z"
            }
        },
        methods: {
            goToHome() {
                this.$router.push('/');
            }
        },
        mounted() {
            let array = this.maintenanceTimes.filter(time => {
                return moment(time.end).isAfter(moment());
            });
            array.sort(function (a, b) {
                if (moment(a.end).isBefore(moment(b.end))) {
                    return -1;
                } else if ((moment(a.end).isAfter(moment(b.end)))) {
                    return 1;
                }
                return 0;
            })
            this.currentMaintenanceTime = moment.utc(array[0].end).format();
        },
    }
</script>

<style scoped>

</style>
