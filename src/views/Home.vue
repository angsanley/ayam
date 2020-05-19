<template>
    <div class="home pt-8 pl-10 pr-10">
        <!--        <div class="card w-full p-6">-->
        <!--            <h3>Hi, <span class="capitalize">{{ binusianData.FIRST_NAME.toLowerCase() }}</span>!</h3>-->
        <!--            <p class="pt-2">You have</p>-->
        <!--        </div>-->

        <div class="w-full">
            <h3 class="mb-2">Assignments</h3>
            <div class="items">
                <div class="card assignment-card flex flex-shrink-0" v-for="assignment in this.assignments" :key="assignment.Title">
                    <div class="flex flex-col h-full justify-between">
                        <h5>{{courses.find(e => e.CLASS_NBR === assignment.classNbr).COURSENAME}}</h5>
                        <div class="text-sm text-gray-500">{{assignment.Title}}</div>
                        <div class="pt-2 text-sm text-gray-500 mt-auto">Due on {{assignment.deadlineDuration}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .home {
        width: 100%;
    }

    .small-heading {
        @apply uppercase text-gray-700 font-bold;
    }

    .assignment-card {
        @apply w-64 inline-block p-4 mr-4;
        white-space: normal;
        word-wrap: break-word !important;
    }

    .items {
        white-space: nowrap;
        overflow-x: auto;
        @apply pl-2 pt-2 pb-8 flex;
    }

    .items > div {
    }
</style>

<script>
    // @ is an alias to /src
    // GET https://binusmaya.binus.ac.id/services/ci/index.php/staff/init/check_session
    // GET https://binusmaya.binus.ac.id/services/ci/index.php/general/getBinusianData
    // GET https://binusmaya.binus.ac.id/services/ci/index.php/student/init/getCourses
    // GET https://binusmaya.binus.ac.id/services/ci/index.php/student/classes/assignmentType/COMP6229/011643/1920/LEC/14910/01

    import axios from "axios";
    import * as HtmlTableToJson from "html-table-to-json";

    export default {
        name: 'Home',
        components: {},
        data() {
            return {
                binusianData: {},
                courses: [],
                videoConferences: [],
                assignments: []
            }
        },
        methods: {
            checkSession() {
                this.$Progress.start();

                if (!this.$store.getters.isAuthenticated || this.$store.state.phpsessid === '') {
                    // redirect to login
                    this.$store.dispatch('isAuthenticated', false);
                    this.$router.push('/login');
                }

                axios.request({
                    url: "https://bimayproxy.herokuapp.com/fetch/https://binusmaya.binus.ac.id/services/ci/index.php/staff/init/check_session",
                    method: "get",
                    headers: {
                        Bisquit: `PHPSESSID=${this.$store.state.phpsessid}`
                    }
                })
                    .then((response) => {
                        const sessionStatus = response.data;

                        if (sessionStatus.RoleID === 0) {
                            // redirect to login
                            this.$store.dispatch('isAuthenticated', false);
                            this.$router.push('/login');
                        }

                        this.$Progress.finish();
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$Progress.fail();
                    });
            },
            getBinusianData() {
                // https://binusmaya.binus.ac.id/services/ci/index.php/general/getBinusianData
                this.$Progress.start();

                axios.request({
                    url: "https://bimayproxy.herokuapp.com/fetch/https://binusmaya.binus.ac.id/services/ci/index.php/general/getBinusianData",
                    method: "get",
                    headers: {
                        Bisquit: `PHPSESSID=${this.$store.state.phpsessid}`
                    }
                })
                    .then((response) => {
                        this.binusianData = response.data;
                        this.$Progress.finish();
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$Progress.fail();
                    });
            },
            getCourses() {
                this.$Progress.start();
                // https://binusmaya.binus.ac.id/services/ci/index.php/student/init/getCourses
                axios.request({
                    url: "https://bimayproxy.herokuapp.com/fetch/https://binusmaya.binus.ac.id/services/ci/index.php/student/init/getCourses",
                    method: "get",
                    headers: {
                        Bisquit: `PHPSESSID=${this.$store.state.phpsessid}`
                    }
                })
                    .then((response) => {
                        this.courses = response.data.Courses;
                        this.$Progress.finish();

                        this.getVideoConferences();
                        this.getAssignments();
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$Progress.fail();
                    });
            },
            getVideoConferences() {
                this.$Progress.start();
                // https://binusmaya.binus.ac.id/services/ci/index.php/BlendedLearning/VideoConference/getList/ACCT6087/007392/1920/12252
                this.courses.forEach(e => {
                    const courseId = e.COURSEID;
                    const crseId = e.CRSE_ID;
                    const strm = e.STRM;
                    const classNbr = e.CLASS_NBR;

                    axios.request({
                        url: `https://bimayproxy.herokuapp.com/fetch/https://binusmaya.binus.ac.id/services/ci/index.php/BlendedLearning/VideoConference/getList/${courseId}/${crseId}/${strm}/${classNbr}`,
                        method: "get",
                        headers: {
                            Bisquit: `PHPSESSID=${this.$store.state.phpsessid}`
                        }
                    })
                        .then((response) => {
                            let data = response.data;

                            // remove stupid tag
                            data = data.replace(/<span.+vc="/g, "");
                            data = data.replace(/">.+>/g, "");

                            // convert html into json (stupid IT div.. huh!)
                            const videoConference = {
                                classNbr,
                                classes: HtmlTableToJson.parse(`<table>${data}</table>`).results
                            }
                            this.videoConferences.push(videoConference);

                            this.$Progress.finish();
                        })
                        .catch((error) => {
                            console.log(error);
                            this.$Progress.fail();
                        });
                });
                this.$Progress.finish();
            },
            getAssignments() {
                // https://binusmaya.binus.ac.id/services/ci/index.php/student/classes/assignmentType/COMP6229/011643/1920/LEC/14910/01
                this.$Progress.start();
                this.courses.forEach(e => {
                    const courseId = e.COURSEID;
                    const crseId = e.CRSE_ID;
                    const strm = e.STRM;
                    const classNbr = e.CLASS_NBR;
                    const ssrComponent = e.SSR_COMPONENT;

                    axios.request({
                        url: `https://bimayproxy.herokuapp.com/fetch/https://binusmaya.binus.ac.id/services/ci/index.php/student/classes/assignmentType/${courseId}/${crseId}/${strm}/${ssrComponent}/${classNbr}/01`,
                        method: "get",
                        headers: {
                            Bisquit: `PHPSESSID=${this.$store.state.phpsessid}`
                        }
                    })
                        .then((response) => {
                            let data = response.data;

                            data.forEach((e) => {
                                e.classNbr = classNbr;
                                this.assignments.push(e);
                            })

                            this.$Progress.finish();
                        })
                        .catch((error) => {
                            console.log(error);
                            this.$Progress.fail();
                        });
                });
                this.$Progress.finish();
            }
        },
        async mounted() {
            await this.checkSession();
            await this.getBinusianData();
            await this.getCourses();
        }
    }
</script>
