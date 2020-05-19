<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        Hello, {{binusianData.FIRST_NAME}}
        {{videoConferences}}
    </div>
</template>

<script>
    // @ is an alias to /src
    // GET https://binusmaya.binus.ac.id/services/ci/index.php/staff/init/check_session
    // GET https://binusmaya.binus.ac.id/services/ci/index.php/general/getBinusianData
    // GET https://binusmaya.binus.ac.id/services/ci/index.php/student/init/getCourses

    import axios from "axios";

    export default {
        name: 'Home',
        components: {
        },
        data() {
            return {
                binusianData: {},
                courses: [],
                videoConferences: []
            }
        },
        methods: {
            checkSession() {
                this.$Progress.start();

                if (this.$store.state.phpsessid === '') {
                    // redirect to login
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
                            this.$Progress.finish();
                            this.videoConferences.push(this.tableToJson(response.data));

                        })
                        .catch((error) => {
                            console.log(error);
                            this.$Progress.fail();
                        });
                });
                this.$Progress.finish();
            },
            tableToJson(table) {
                let data = []; // first row needs to be headers var headers = [];
                let headers = [];
                for (let i=0; i<table.rows[0].cells.length; i++) {
                    headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
                }
                // go through cells
                for (let i=1; i<table.rows.length; i++) {
                    let tableRow = table.rows[i]; var rowData = {};
                    for (let j=0; j<tableRow.cells.length; j++) {
                        rowData[ headers[j] ] = tableRow.cells[j].innerHTML;
                    } data.push(rowData);
                }
                return data;
            }
        },
        async mounted() {
            await this.checkSession();
            await this.getBinusianData();
            await this.getCourses();
        }
    }
</script>
