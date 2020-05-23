<template>
    <div class="lg:h-screen pt-16 flex flex-col flex-wrap items-center">
        <div class="w-full container mt-4">
            <div class="flex flex-col justify-between">
                <div class="mb-4 text-xl"><a @click="$router.go(-1)" href="#" class="no-underline text-gray-700 dark-mode:text-gray-100"><i class="fas fa-arrow-left"/></a></div>
                <div class="flex flex-col mb-8" v-if="upcomingAssignments.length > 0">
                    <h3 class="mb-4">Upcoming Assignments</h3>
                    <assignment-list :assignments="upcomingAssignments" :courses="courses"/>
                </div>
                <div class="flex flex-col">
                    <h3 class="mb-4">Past Assignments</h3>
                    <assignment-list :assignments="pastAssignments" :courses="courses"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment-timezone";
    import AssignmentList from "../../components/Dashboard/Assignments/AssignmentList";

    export default {
        name: "Assignments",
        components: {AssignmentList},
        mounted() {

        },
        methods: {
            parseAssignmentDeadline(object) {
                return moment(`${object['deadlineDuration']} ${object['deadlineTime']}`, "DD MMM YYYY HH:mm:ss");
            }
        },
        computed: {
            courses() {
                return this.$store.getters.getCourses;
            },
            assignments() {
                return this.$store.getters.getAssignments;
            },
            upcomingAssignments() {
                return this.assignments.filter((assignment) => {
                    return this.parseAssignmentDeadline(assignment).isAfter();
                }).sort((a,b) => this.parseAssignmentDeadline(a) - this.parseAssignmentDeadline(b));
            },
            pastAssignments() {
                return this.assignments.filter((assignment) => {
                    return this.parseAssignmentDeadline(assignment).isBefore();
                }).sort((a,b) => this.parseAssignmentDeadline(b) - this.parseAssignmentDeadline(a));
            }
        }
    }
</script>

<style scoped>
</style>
