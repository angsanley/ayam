<template>
    <div class="home pt-8 pl-10 pr-10">
        <!--        <div class="card w-full p-6">-->
        <!--            <h3>Hi, <span class="capitalize">{{ binusianData.FIRST_NAME.toLowerCase() }}</span>!</h3>-->
        <!--            <p class="pt-2">You have</p>-->
        <!--        </div>-->

        <div class="w-full">
            <assignments :assignments="assignments" :courses="courses" v-if="assignments.length > 0"/>
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

</style>

<script>
    // @ is an alias to /src
    // GET https://binusmaya.binus.ac.id/services/ci/index.php/staff/init/check_session
    // GET https://binusmaya.binus.ac.id/services/ci/index.php/general/getBinusianData
    // GET https://binusmaya.binus.ac.id/services/ci/index.php/student/init/getCourses
    // GET https://binusmaya.binus.ac.id/services/ci/index.php/student/classes/assignmentType/COMP6229/011643/1920/LEC/14910/01

    import axios from "axios";
    import * as HtmlTableToJson from "html-table-to-json";
    import moment from "moment";
    import Assignments from "../components/Assignments";

    export default {
        name: 'Home',
        components: {Assignments},
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
                                // filter out past assignments
                                if(moment(e.deadlineDuration).isAfter()) {
                                    e.classNbr = classNbr;
                                    this.assignments.push(e);
                                }
                            })

                            this.$Progress.finish();
                        })
                        .catch((error) => {
                            console.log(error);
                            this.$Progress.fail();
                        });
                });
                this.$Progress.finish();
            },
        },
        computed: {
        },
        filters: {
            relativeTime: function (date) {
                return moment(date).fromNow();
            }
        },
        async mounted() {
            await this.checkSession();
            await this.getBinusianData();
            await this.getCourses();
        }
    }
</script>
