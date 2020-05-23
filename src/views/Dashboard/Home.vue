<template>
    <div class="home lg:h-screen pt-16">
        <div class="grid grid-cols-12 h-full lg:overflow-y-hidden">

            <perfect-scrollbar :options="{handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel']}" class="pt-4 lg:overflow-y-scroll h-full xl:col-span-9 lg:col-span-8 col-span-12 w-full px-6 md:px-8 lg:px-10">
                <div class="card w-full p-6 mb-12">
                    <div class="flex flex-col-reverse sm:flex-row justify-between">
                        <div class="flex flex-col justify-center w-full md:w-8/12">
                            <h3>{{greetings}}, <span class="capitalize">{{userNameShort}}</span>!</h3>
                            <p class="pt-2">{{randomQuote}}</p>
                            <div v-if="nextClass !== -1 && nextClass">
                                <h4 class="mt-4">Your next class starting {{ nextClass.startDate | relativeTime }}.</h4>
                                <div class="text-gray-600 text-sm">
                                    <div><i class="mr-1 fas fa-book"/> {{nextClass.COURSE_TITLE_LONG}}</div>
                                    <div><i class="mr-1 fas fa-clock"/> {{nextClass.MEETING_TIME_START}} - {{nextClass.MEETING_TIME_END}}</div>
                                </div>
                            </div>
                            <div v-if="nextClass === -1">
                                <h4 class="mt-4">Time to relax. There's no class today.</h4>
                            </div>
                        </div>
                        <div class="flex mb-4 sm:mb-0 justify-center">
                            <img class="lg:max-h-full h-40 mr-0 object-contain" src="../../assets/img/study.png" alt="study"/>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <video-conferences :video-conferences="videoConferences" :courses="courses" v-if="videoConferences.length > 0"/>

                    <vue-content-loading v-else class="w-full" :height="60">
                        <rect x="0" y="0" width="50" height="12" />
                        <rect x="0" y="15" width="100" height="35" />
                        <rect x="105" y="15" width="100" height="35" />
                        <rect x="210" y="15" width="100" height="35" />
                    </vue-content-loading>
                </div>

                <div class="mb-4">
                    <assignments :assignments="assignments" :courses="courses" v-if="assignments.length > 0"/>

                    <vue-content-loading v-else  class="w-full" :height="60">
                        <rect x="0" y="0" width="50" height="12" />
                        <rect x="0" y="15" width="100" height="35" />
                        <rect x="105" y="15" width="100" height="35" />
                        <rect x="210" y="15" width="100" height="35" />
                    </vue-content-loading>
                </div>
            </perfect-scrollbar>

            <perfect-scrollbar :options="{handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel']}" class="pt-4 lg:overflow-y-scroll h-full pb-8 pl-6 lg:pl-2 xl:col-span-3 lg:col-span-4 col-span-12 pr-6 md:pr-8 lg:pr-4 xl:pr-10">
                <your-schedule :calendar-dates="calendarDates"/>
            </perfect-scrollbar>
        </div>
    </div>
</template>

<style scoped>

</style>

<script>
    import moment from "moment-timezone";
    import Assignments from "../../components/Assignments";
    import VideoConferences from "../../components/VideoConferences";
    import YourSchedule from "../../components/YourSchedule";
    import Repositories from "../../repositories/RepositoryFactory";
    import { VueContentLoading } from 'vue-content-loading';

    export default {
        name: 'Home',
        components: {YourSchedule, VideoConferences, Assignments, VueContentLoading},
        data() {
            return {
                isLoading: false,
                randomQuote: "",
                calendarDates: [
                    {
                        key: 'today',
                        highlight: true,
                        dates: moment().toDate()
                    }
                ],
                nextClass: ""
            }
        },
        methods: {
            async checkSession() {
                const SessionFactory = Repositories.get("session");

                this.$Progress.start();

                if (!this.$store.getters.isAuthenticated || this.$store.state.phpsessid === '') {
                    // redirect to login
                    await this.$store.dispatch('isAuthenticated', false);
                    await this.$router.push('/login');
                }

                try {
                    const { data } = await SessionFactory.check();

                    if (data.RoleID === 0) {
                        // redirect to login
                        await this.$store.dispatch('isAuthenticated', false);
                        await this.$router.push('/login');
                    }
                } catch (error) {
                    this.$Progress.fail();
                    if (error.response) {
                        if (error.response.status === 404) {
                            // maybe in maintenance mode
                            await this.$router.push('/maintenance');
                        }
                    }
                }

                this.$Progress.finish();
            },
            insertDatesToCalendar() {
                // input class schedules
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

                // input assignment schedules
                this.assignments.forEach(e => {
                    const calendarObj = {
                        key: `${e.StudentAssignmentID}`,
                        dot: 'purple',
                        dates: new moment(`${e.deadlineDuration} ${e.deadlineTime}`, "DD MMM YYYY HH:mm:ss").toDate(),
                        popover: {
                            label: `${e.deadlineTime.substring(0,5)} - Asg. Deadline - ${this.courses.find(el => el.CLASS_NBR === e.classNbr).COURSENAME}`,
                        },
                    };

                    this.calendarDates.push(calendarObj);
                })
            },
            getNextClass() {
                let nextClasses = this.classSchedules.filter(c => {
                    return moment(c.END_DT.substring(0,10)).isAfter(moment())
                })

                let nextClass = nextClasses[0];
                nextClass.startDate = moment(`${nextClass.START_DT.substring(0,10)} ${nextClass.MEETING_TIME_START}`, "YYYY-MM-DD HH:mm").toDate();
                nextClass.endDate = moment(`${nextClass.END_DT.substring(0,10)} ${nextClass.MEETING_TIME_END}`, "YYYY-MM-DD HH:mm").toDate();

                if (moment(nextClass.startDate).isSame(moment(), 'day')
                    || moment(nextClass.startDate).isSame(moment().add(1,'days'), 'day')) {
                    this.nextClass = nextClass;
                } else {
                    this.nextClass = -1;
                }
            },
            async getRandomQuote() {
                const DailyQuoteRepository = Repositories.get("dailyQuotes");
                try {
                    const { data } = await DailyQuoteRepository.get();
                    const quote = data[Math.floor(Math.random() * data.length)];
                    this.randomQuote = `${quote.text} — ${quote.author}`;
                } catch (error) {
                    console.log(error);
                }
            },
        },
        computed: {
            greetings() {
                const today = new Date()
                const curHr = today.getHours()

                if (curHr < 12) {
                    return "Good morning"
                } else if (curHr < 18) {
                    return "Good afternoon"
                } else {
                    return "Good evening"
                }
            },
            courses() {
                return this.$store.getters.getCourses;
            },
            dashboardData() {
                return this.$store.getters.getDashboardData;
            },
            assignments() {
                return this.$store.getters.getAssignments;
            },
            videoConferences() {
                return this.$store.getters.getVideoConferences;
            },
            classSchedules() {
                return this.$store.getters.getClassSchedules;
            },
            userNameShort() {
                return this.dashboardData ? this.dashboardData['Student']['Name'].split(' ')[0].toLowerCase() : '';
            }
        },
        watch: {
            courses() {
                this.$store.dispatch('fetchClassSchedules');
                this.$store.dispatch('fetchVideoConferences');
                this.$store.dispatch('fetchAssignments');
            },
            classSchedules() {
                this.insertDatesToCalendar();
                this.getNextClass();
            }
        },
        filters: {
            relativeTime: function (date, format) {
                // console.log(date + " " + moment(date, "DD MMM YYYY HH:mm:ss").fromNow())
                return moment(date, format).fromNow();
            },
        },
        mounted() {
            this.checkSession();
            this.getRandomQuote();
            this.$store.dispatch('fetchDashboardData');
            this.$store.dispatch('fetchCourses');
            this.$store.dispatch('fetchClassSchedules');
            this.$store.dispatch('fetchAssignments');
            this.$store.dispatch('fetchVideoConferences');
        }
    }
</script>
