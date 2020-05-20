<template>
    <div class="home pt-8 ">
        <div class="grid grid-cols-12">
            <div class="lg:col-span-9 md:col-span-8 col-span-12 w-full px-6 md:px-8 lg:px-10">

                <div class="card w-full p-6 mb-12">
                    <div class="flex flex-col-reverse sm:flex-row sm:h-56 justify-between">
                        <div class="flex flex-col justify-center w-full md:w-8/12">
                            <h4>{{greetings}}, <span class="capitalize">{{ binusianData.FIRST_NAME.toLowerCase() }}</span>!</h4>
                            <p class="pt-2">{{randomQuote}}</p>
                        </div>
                        <div class="flex max-h-full mb-4 sm:mb-0">
                            <img class="max-h-full mr-0 object-contain" src="../assets/img/study.png" alt="study"/>
                        </div>
                    </div>
                </div>

                <vue-content-loading v-if="isLoading" :width="300" :height="20">
                    <rect x="0" width="50" height="20" />
                    <rect x="55" width="50" height="20" />
                    <rect x="110" width="50" height="20" />
                </vue-content-loading>

                <assignments :assignments="assignments" :courses="courses" v-if="assignments.length > 0"/>

            </div>

            <div class="lg:col-span-3 md:col-span-4 col-span-12 px-6 md:px-8 lg:px-10">
                d
            </div>
        </div>
    </div>
</template>

<style scoped>

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
    import { VueContentLoading } from 'vue-content-loading';

    export default {
        name: 'Home',
        components: {Assignments, VueContentLoading},
        data() {
            return {
                binusianData: {},
                courses: [],
                videoConferences: [],
                assignments: [],
                isLoading: false,
                randomQuote: ""
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
                this.isLoading = true;
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

                            data.forEach((e, idx, array) => {
                                // filter out past assignments
                                if(moment(e.deadlineDuration).isAfter()) {
                                    e.classNbr = classNbr;
                                    this.assignments.push(e);
                                }

                                if (idx === array.length - 1){
                                    this.$Progress.finish();
                                    this.isLoading = false;
                                }
                            })
                        })
                        .catch((error) => {
                            console.log(error);
                            this.$Progress.fail();
                            this.isLoading = false;
                        });
                });
            },
            getRandomQuote() {
                // https://quotes.rest/qod?category=students&language=en
                this.$Progress.start();
                this.isLoading = true;
                axios.request({
                    url: "https://bimayproxy.herokuapp.com/fetch/https://quotes.rest/qod?language=en",
                    method: "get",
                    headers: {
                        Bisquit: `PHPSESSID=${this.$store.state.phpsessid}`
                    }
                })
                    .then((response) => {
                        this.randomQuote = response.data.contents.quotes[0].quote;
                        this.$Progress.finish();
                        this.isLoading = false;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$Progress.fail();
                        this.isLoading = false;
                    });
            }
        },
        computed: {
            greetings: function() {
                const today = new Date()
                const curHr = today.getHours()

                if (curHr < 12) {
                    return "Good morning"
                } else if (curHr < 18) {
                    return "Good afternoon"
                } else {
                    return "Good evening"
                }
            }
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
            await this.getRandomQuote();
        }
    }
</script>
