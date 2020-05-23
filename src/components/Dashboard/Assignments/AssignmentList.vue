<template>
    <div class="flex flex-col">
        <div class="card assignment-card mb-1" v-for="assignment in this.assignments" :key="assignment['Title']">
            <div class="flex flex-row justify-between">
                <div>
                    <h6>{{ courseNameFromClassNbr(assignment.classNbr) }}</h6>
                    <div class="text-sm text-gray-600">{{ assignment['Title'] }}</div>
                </div>

                <div class="flex flex-row items-center">
                    <div class="text-sm text-gray-600 text-right">
                        <div>Due {{ parseAssignmentDeadline(assignment).fromNow() }}</div>
                        <div>{{ parseAssignmentDeadline(assignment).format('dddd, D MMM YYYY HH:mm') }}</div>
                    </div>
                    <div class="ml-4">
                        <a :href="getDownloadLink(assignment)" class="bg-primary hover:bg-blue-500 shadow-primary no-underline text-white font-bold rounded-lg md:rounded-full py-2 px-3 md:px-4 md:text-sm"><i class="fas fa-download"/><span class="hidden md:inline"> Download</span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment-timezone";

    export default {
        name: "AssignmentList",
        props: ['assignments', 'courses'],
        methods: {
            courseNameFromClassNbr(classNbr) {
                return this.courses.find(e => e['CLASS_NBR'] === classNbr)['COURSENAME'];
            },
            parseAssignmentDeadline(object) {
                return moment(`${object['deadlineDuration']} ${object['deadlineTime']}`, "DD MMM YYYY HH:mm:ss");
            },
            getDownloadLink(object) {
                return `https://bimayproxy.herokuapp.com/fetch/https://binusmaya.binus.ac.id/services/ci/index.php/general/downloadDocument/${object['assignmentPathLocation'].replace(/\\/g, '...')}`;
            }
        },
        mounted() {
            console.log(this.assignments)
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
