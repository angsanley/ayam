<template>
    <div>
        <h3 class="mb-2">Video Conferences</h3>
        <div class="items">
            <div class="card assignment-card flex flex-shrink-0" v-for="videoConference in this.videoConferences" :key="videoConference.Title">
                <div class="flex flex-col h-full justify-between">
                    <div>
                        <h5>{{courses.find(e => e.CLASS_NBR === videoConference.classNbr).COURSENAME}}</h5>
                        <div class="text-sm text-gray-500">{{courses.find(e => e.CLASS_NBR === videoConference.classNbr).SSR_COMPONENT}}</div>
                        <div class="pt-2 text-sm text-gray-500 mt-auto">Starts {{videoConference.startDate | relativeTime}}</div>
                    </div>
                    <a class="button default-button mt-4 text-center no-underline text-sm" :href="videoConference.Link"><i class="fas fa-external-link-alt"/> Open in Zoom</a>
                    <!--                        <a :href="`https://binusmaya.binus.ac.id/services/ci/index.php/general/downloadDocument/${assignment.assignmentPathLocation}`">Download file</a>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment";

    export default {
        name: "VideoConferences",
        props: ['videoConferences', 'courses'],
        filters: {
            relativeTime: function (date) {
                return moment(date).fromNow();
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .assignment-card {
        @apply w-64 inline-block p-4 mr-4;
        white-space: normal;
        word-wrap: break-word !important;
    }

    .items {
        white-space: nowrap;
        overflow-x: auto;
        @apply px-2 pt-2 pb-8 flex;
    }

</style>
