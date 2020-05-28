<template>
    <div>
        <h3>Your Schedule</h3>
        <div class="mt-4">
            <div class="bg-gray-100 dark-mode:bg-gray-900 rounded-lg shadow-lg">
                <vc-date-picker is-inline v-model="date" class="bg-white" :is-dark="isDark" is-expanded :attributes="calendarDates"/>
                <div class="border-t dark-mode:border-gray-700 mb-3 text-sm" v-if="eventsOnDate.length > 0">
                    <div class="px-8 py-3">
                        <div class="font-bold mt-1 mb-2">{{ dateString }}</div>
                        <div v-for="event in eventsOnDate" v-bind:key="event.key">
                            <div class="py-2">
                                <div class="flex flex-col">
                                    <div class="flex items-center">
                                        <div :class="`bg-${event.dot}-500 w-2 h-2 inline-block mr-4 rounded-full`"></div>
                                        <div>{{ event.data.title }}</div>
                                    </div>
                                    <div class="ml-6">{{ event.data.date }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment-timezone";

    export default {
        name: "YourSchedule",
        props: ['calendarDates'],
        data() {
            return {
                isDark: false,
                date: moment(),
                eventsOnDate: ''
            }
        },
        methods: {
            calculateEventsOnDate(date)   {
                this.eventsOnDate = this.calendarDates.filter(calendarDate => {
                    if(calendarDate.dates) {
                        if (calendarDate.key === 'today') return false;
                        return calendarDate.dates[0] ? moment(calendarDate.dates[0].start).isSame(moment(date), 'day') : moment(calendarDate.dates).isSame(moment(date), 'day');
                    }
                    return false
                })
            },
        },
        watch: {
            date() {
                this.calculateEventsOnDate(this.date);
            }
        },
        computed: {
            dateString() {
                return moment(this.date).format('ddd, D MMM yyyy');
            }
        },
        mounted() {
            if (window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.isDark = true;
            }
            window.matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', event => {
                    if (event.matches) {
                        //dark mode
                        this.isDark = true;
                    } else {
                        //light mode
                        this.isDark = false;
                    }
                });
        }
    }
</script>

<style scoped>

</style>
