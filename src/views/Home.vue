<template>
    <div class="home pt-8">
        <div class="grid grid-cols-12">
            <div class="lg:col-span-9 col-span-12 w-full px-6 md:px-8 lg:px-10">

                <div class="card w-full p-6 mb-12">
                    <div class="flex flex-col-reverse sm:flex-row lg:h-56 justify-between">
                        <div class="flex flex-col justify-center w-full md:w-8/12">
                            <h3>{{greetings}}, <span class="capitalize">{{ binusianData.FIRST_NAME | lowerCase }}</span>!</h3>
                            <p class="pt-2">{{randomQuote}}</p>
                            <h4 class="mt-4">Your next class starting in 12 min.</h4>
                            <div class="text-gray-600 text-sm">
                                <div><i class="mr-1 fas fa-book"/> Computer Networks</div>
                                <div><i class="mr-1 fas fa-clock"/> Monday</div>
                            </div>
                        </div>
                        <div class="flex mb-4 sm:mb-0 justify-center">
                            <img class="lg:max-h-full h-64 mr-0 object-contain" src="../assets/img/study.png" alt="study"/>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <vue-content-loading v-if="videoConferences.length <= 0"  class="w-full" :height="60">
                        <rect x="0" y="0" width="50" height="12" />
                        <rect x="0" y="15" width="100" height="35" />
                        <rect x="105" y="15" width="100" height="35" />
                        <rect x="210" y="15" width="100" height="35" />
                    </vue-content-loading>

                    <video-conferences :video-conferences="videoConferences" :courses="courses" v-if="videoConferences.length > 0"/>
                </div>

                <div class="mb-4">
                    <vue-content-loading v-if="assignments.length <= 0"  class="w-full" :height="60">
                        <rect x="0" y="0" width="50" height="12" />
                        <rect x="0" y="15" width="100" height="35" />
                        <rect x="105" y="15" width="100" height="35" />
                        <rect x="210" y="15" width="100" height="35" />
                    </vue-content-loading>

                    <assignments :assignments="assignments" :courses="courses" v-if="assignments.length > 0"/>
                </div>

            </div>

            <div class="lg:col-span-3 col-span-12 px-6 md:px-8 lg:px-10">
                <h3>Your Schedule</h3>
                <div class="mt-4">
                    <vc-calendar is-expanded :attributes="calendarDates"/>
                </div>
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
    import moment from "moment-timezone";
    import Assignments from "../components/Assignments";
    import { VueContentLoading } from 'vue-content-loading';
    import VideoConferences from "../components/VideoConferences";

    export default {
        name: 'Home',
        components: {VideoConferences, Assignments, VueContentLoading},
        data() {
            return {
                binusianData: {},
                courses: [],
                videoConferences: [],
                classSchedules: [],
                assignments: [],
                isLoading: false,
                randomQuote: "",
                calendarDates: [
                    {
                        key: 'today',
                        highlight: true,
                        dates: new moment().toDate()
                    }
                ]
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
                            const classes = HtmlTableToJson.parse(`<table>${data}</table>`).results[0];

                            classes.forEach(e => {
                                e.classNbr = classNbr;

                                //split time
                                const time = e.Time.split(' - ');
                                e.startDate = `${e.Date} ${time[0]}`;
                                e.endDate = `${e.Date} ${time[1]}`;

                                this.videoConferences.push(e);

                                // sort
                                this.videoConferences = this.videoConferences.sort((a,b) => new moment(b.startDate) - new moment(a.startDate));
                            });

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

                                    // sort
                                    this.assignments = this.assignments.sort((a,b) => new moment(b.deadlineDuration) - new moment(a.deadlineDuration));
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
            },
            getClassSchedules() {
                // https://binusmaya.binus.ac.id/services/ci/index.php/student/class_schedule/classScheduleGetStudentClassSchedule
                this.$Progress.start();
                this.isLoading = true;

                axios.request({
                    url: "https://bimayproxy.herokuapp.com/fetch/https://binusmaya.binus.ac.id/services/ci/index.php/student/class_schedule/classScheduleGetStudentClassSchedule",
                    method: "get",
                    headers: {
                        Bisquit: `PHPSESSID=${this.$store.state.phpsessid}`
                    }
                })
                    .then((response) => {
                        this.classSchedules = response.data;
                        this.$Progress.finish();
                        this.isLoading = false;
                        this.insertDatesToCalendar();
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$Progress.fail();
                        this.isLoading = false;
                    });
            },
            insertDatesToCalendar() {
                this.$Progress.start();
                this.isLoading = true;

                this.classSchedules.forEach(e => {
                    let dot = true;
                    if (e.N_DELIVERY_MODE === "GSLC") {
                        dot = "red";
                    } else if (e.N_DELIVERY_MODE === "F2F") {
                        dot = "orange";
                    } else if (e.N_DELIVERY_MODE === "VC") {
                        dot = "green";
                    }

                    const calendarObj = {
                        key: `${e.CRSE_CODE}-${e.SessionIDNum}`,
                        dot,
                        dates: [
                            { start: new moment(`${e.START_DT.substring(0,10)} ${e.MEETING_TIME_START}`, "YYYY-MM-DD HH:mm").toDate(),
                                end: new moment(`${e.END_DT.substring(0,10)} ${e.MEETING_TIME_END}`, "YYYY-MM-DD HH:mm").toDate() }
                        ],
                        popover: {
                            label: `${e.MEETING_TIME_START} - ${e.N_DELIVERY_MODE} - ${e.COURSE_TITLE_LONG} (${e.SSR_COMPONENT})`,
                        },
                    };

                    this.calendarDates.push(calendarObj);
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
            lowerCase: function (string) {
                return string ? string.toLowerCase() : string;
            }
        },
        async mounted() {
            await this.checkSession();
            await this.getBinusianData();
            await this.getCourses();
            await this.getRandomQuote();
            await this.getClassSchedules();
        }
    }
</script>
