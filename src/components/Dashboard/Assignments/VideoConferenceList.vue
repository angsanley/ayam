<template>
    <div class="flex flex-col">
        <div class="card assignment-card mb-1" v-for="videoSchedule in this.videoConferences" :key="`${videoSchedule['classNbr']}${videoSchedule['No.']}`">
            <div class="flex flex-row justify-between">
                <div>
                    <h6>{{classFromClassNbr(videoSchedule.classNbr)['COURSENAME']}}</h6>
                    <div class="text-sm text-gray-600">{{classFromClassNbr(videoSchedule.classNbr)['SSR_COMPONENT']}}</div>
                </div>

                <div class="flex flex-row items-center">
                    <div class="text-sm text-gray-600 text-right">
                        <div>{{relativeTime(parseVideoSchedule(videoSchedule), 'Starts', 'Ended')}}</div>
                        <div>{{parseVideoSchedule(videoSchedule).format("dddd, D MMM YYYY HH:mm")}}</div>
                    </div>
                    <div class="ml-4" v-if="parseVideoSchedule(videoSchedule).isAfter()">
                        <a :href="videoSchedule['Link']" target="_blank" class="bg-primary hover:bg-blue-500 shadow-primary no-underline text-white font-bold rounded-lg md:rounded-full py-2 px-3 md:px-4 md:text-sm"><i class="fas fa-external-link-alt"/><span class="hidden md:inline"> Open in Zoom</span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment-timezone";

    export default {
        name: "VideoConferenceList",
        props: ['videoConferences', 'courses'],
        methods: {
            classFromClassNbr(classNbr) {
                return this.courses.find(e => e['CLASS_NBR'] === classNbr);
            },
            parseVideoSchedule(object) {
                return moment(object.startDate, "MMM DD, YYYY HH:mm:ss");
            },
            relativeTime(object, futureString, pastString) {
                return `${moment().isAfter(object) ? pastString : futureString} ${object.fromNow()}`
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .assignment-card {
        @apply  inline-block p-4 transition ease-out duration-300;
        white-space: normal;
        word-wrap: break-word !important;
    }

    .assignment-card:hover {
        @apply transform shadow-xl;
    }

</style>
