<template>
    <div>
        <h3 class="mb-2">Video Conferences</h3>
        <div class="items" v-dragscroll="window.width >= 1024">
            <div class="card assignment-card flex flex-shrink-0" v-for="videoConference in this.videoConferences" :key="videoConference.Title">
                <div class="flex flex-col h-full justify-between">
                    <div>
                        <h5>{{courses.find(e => e.CLASS_NBR === videoConference.classNbr).COURSENAME}}</h5>
                        <div class="text-sm font-medium text-gray-600">{{courses.find(e => e.CLASS_NBR === videoConference.classNbr).SSR_COMPONENT}}</div>
                    </div>
                    <div class="pt-2 text-sm text-gray-500 mt-auto">Starts {{videoConference.startDate | relativeTime}}</div>
                    <a class="button default-button mt-2 text-center no-underline text-sm" :href="videoConference.Link"><i class="fas fa-external-link-alt"/> Open in Zoom</a>
                    <!--                        <a :href="`https://binusmaya.binus.ac.id/services/ci/index.php/general/downloadDocument/${assignment.assignmentPathLocation}`">Download file</a>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment-timezone";
    import { dragscroll } from 'vue-dragscroll';

    export default {
        name: "VideoConferences",
        props: ['videoConferences', 'courses'],
        data() {
            return {
                window: {
                    width: 0,
                    height: 0
                }
            }
        },
        created() {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
        methods: {
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            }
        },
        filters: {
            relativeTime: function (date) {
                //Apr 23, 2020 09:20:00
                // console.log(date + " " + moment(date, "MMM dd, YYYY HH:mm:ss").fromNow())
                return moment(date, "MMM DD, YYYY HH:mm:ss").fromNow();
            }
        },
        mounted() {
        },
        directives: {
            'dragscroll': dragscroll
        },
    }
</script>

<style scoped>
    .assignment-card {
        @apply w-64 inline-block p-4 mr-4 transition ease-out duration-300;
        white-space: normal;
        word-wrap: break-word !important;
    }

    .assignment-card:hover {
        @apply transform scale-105 shadow-xl;
    }

    .items {
        white-space: nowrap;
        overflow-x: auto;
        @apply px-2 pt-2 pb-8 flex;
    }

</style>
