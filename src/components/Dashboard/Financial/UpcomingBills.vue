<template>
    <horizontal-scrolling-container>
        <div class="flex-shrink-0 card assignment-card mb-1 mr-2" v-for="(billing, index) in bills" :key="`billing-${index}`">
            <div class="flex flex-col justify-between h-full">
                <div>
                    <h5>Rp. {{formatRupiah(billing['item_amt'])}}</h5>
                    <div class="text-sm text-gray-600">{{billing['descr']}} ({{billing['descr_ind']}})</div>
                    <div class="text-sm text-gray-600">{{billing['item_term']}}</div>
                </div>
                <div class="text-sm mt-2 font-bold text-red-400">Due {{formatTime(billing['due_dt'])}} ({{getRelativeTime(billing['due_dt'])}})</div>
            </div>
        </div>
    </horizontal-scrolling-container>
</template>

<script>
    import moment from 'moment-timezone';
    import HorizontalScrollingContainer from "../../HorizontalScrollingContainer";
    export default {
        name: "UpcomingBills",
        components: {HorizontalScrollingContainer},
        props: ['bills'],
        methods: {
            formatTime(time) {
                return moment(time).format('DD MMM YYYY');
            },
            getRelativeTime(time) {
                return moment(time).fromNow();
            },
            formatRupiah(number) {
                return parseInt(number).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            }
        }
    }
</script>

<style scoped>
    .assignment-card {
        @apply w-64 inline-block p-4 transition ease-out duration-300;
        white-space: normal;
        word-wrap: break-word !important;
    }

    .assignment-card:hover {
        @apply transform shadow-xl scale-105;
    }

</style>
