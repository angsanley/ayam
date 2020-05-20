<template>
    <div>
        <h3 class="mb-2">Assignments</h3>
        <perfect-scrollbar :options="{handlers: ['wheel', 'touch']}" class="items" v-dragscroll="window.width >= 1024">
            <div class="card assignment-card flex flex-shrink-0" v-for="assignment in this.assignments" :key="assignment.Title">
                <div class="flex flex-col h-full justify-between">
                    <h5>{{courses.find(e => e.CLASS_NBR === assignment.classNbr).COURSENAME}}</h5>
                    <div class="text-sm text-gray-500">{{assignment.Title}}</div>
                    <div class="pt-2 text-sm text-gray-500 mt-auto">Due {{`${assignment.deadlineDuration} ${assignment.deadlineTime}` | relativeTime}}</div>
                    <!--                        <a :href="`https://binusmaya.binus.ac.id/services/ci/index.php/general/downloadDocument/${assignment.assignmentPathLocation}`">Download file</a>-->
                </div>
            </div>
        </perfect-scrollbar>
    </div>
</template>

<script>
    import moment from "moment-timezone";
    import { dragscroll } from 'vue-dragscroll';

    export default {
        name: "Assignments",
        props: ['assignments', 'courses'],
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
                // console.log(date + " " + moment(date, "DD MMM YYYY HH:mm:ss").fromNow())
                return moment(date, "DD MMM YYYY HH:mm:ss").fromNow();
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
