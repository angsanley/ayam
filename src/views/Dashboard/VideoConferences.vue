<template>
    <div class="lg:h-screen pt-16 flex flex-col flex-wrap items-center">
        <div class="w-full container mt-4">
            <div class="flex flex-col justify-between">
                <div class="mb-4 text-xl"><a @click="$router.go(-1)" href="#" class="no-underline text-gray-700 dark-mode:text-gray-100"><i class="fas fa-arrow-left"/></a></div>
                <div class="flex flex-col mb-8" v-if="upcomingVideoConferences.length > 0">
                    <h3 class="mb-4">Upcoming Meetings</h3>
                    <video-conference-list :video-conferences="upcomingVideoConferences" :courses="courses"/>
                </div>
                <div class="flex flex-col">
                    <h3 class="mb-4">Past Meetings</h3>
                    <video-conference-list :video-conferences="pastVideoConferences" :courses="courses"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment-timezone";
    import VideoConferenceList from "../../components/Dashboard/Assignments/VideoConferenceList";

    export default {
        name: "VideoConferences",
        components: {VideoConferenceList},
        mounted() {

        },
        methods: {
            parseVideoSchedule(object) {
                return moment(object, "MMM DD, YYYY HH:mm:ss");
            }
        },
        computed: {
            courses() {
                return this.$store.getters.getCourses;
            },
            videoConferences() {
                return this.$store.getters.getVideoConferences;
            },
            upcomingVideoConferences() {
                return this.videoConferences.filter((videoSchedule) => {
                    return this.parseVideoSchedule(videoSchedule.endDate).isAfter();
                }).sort((a,b) => this.parseVideoSchedule(a.endDate) - this.parseVideoSchedule(b.endDate));
            },
            pastVideoConferences() {
                return this.videoConferences.filter((videoSchedule) => {
                    return this.parseVideoSchedule(videoSchedule.endDate).isBefore();
                }).sort((a,b) => this.parseVideoSchedule(b.endDate) - this.parseVideoSchedule(a.endDate));
            }
        }
    }
</script>

<style scoped>
</style>
