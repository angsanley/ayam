import Client from '../Clients/BimayAxiosClient';

const resource = '/student';

export default {
    getProfile() {
        return Client.get(`${resource}/init/indexpage`);
    },
    getProfileFull() {
        return Client.get(`${resource}/profile/profileStudent`);
    },
    getStudentCourseMenuCourses() {
        return Client.get(`${resource}/init/getStudentCourseMenuCourses`);
    },
    getCourses() {
        return Client.get(`${resource}/init/getCourses`);
    },
    getDashboardData() {
        return Client.get(`${resource}/init/dashboard`);
    },
    getAllNews() {
        return Client.get(`${resource}/news/getAllNewsDashboard`);
    },
    getClassSchedules() {
        return Client.get(`${resource}/class_schedule/classScheduleGetStudentClassSchedule`);
    },
    getMasterSchedulePeriod() {
        return Client.get(`${resource}/class_schedule/masterScheduleGetPeriod`);
    },
    getMasterSchedule() {
        return Client.get(`${resource}/class_schedule/masterScheduleSearchSchedule`);
    },
    checkKMK() {
        return Client.get(`${resource}/printKMK/checkKMK`);
    }
};
