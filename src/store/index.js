import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import Repositories from "../repositories/RepositoryFactory";

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'app-data',
  storage: window.localStorage
})

const getDefaultState = () => {
  return {
    phpsessid: '',
    isAuthenticated: false,
    notifications: [],

    dashboardData: '',
    courses: '',
    classSchedules: '',
    videoConferences: [],
    assignments: [],
  }
}

export default new Vuex.Store({
  state: getDefaultState(),
  getters: {
    phpsessid: (state) => {
      return state.phpsessid
    },
    isAuthenticated: (state) => {
      return state.isAuthenticated
    },
    getNotifications: (state) => {
      return state.notifications
    },

    getDashboardData: (state) => {
      return state.dashboardData
    },
    getCourses: (state) => {
      return state.courses
    },
    getClassSchedules: (state) => {
      return state.classSchedules
    },
    getVideoConferences: (state) => {
      return state.videoConferences
    },
    getAssignments: (state) => {
      return state.assignments
    },
  },
  mutations: {
    RESET_STATE (state) {
      Object.assign(state, getDefaultState())
    },
    SET_PHPSESSID: (state, newValue) => {
      state.phpsessid = newValue
    },
    SET_ISAUTHENTICATED: (state, newValue) => {
      state.isAuthenticated = newValue
    },
    PUSH_NOTIFICATIONS: (state, newValue) => {
      state.notifications.push(newValue)
    },

    SET_DASHBOARD_DATA: (state, newValue) => {
      state.dashboardData = newValue
    },
    SET_COURSES: (state, newValue) => {
      state.courses = newValue
    },
    SET_CLASS_SCHEDULES: (state, newValue) => {
      state.classSchedules = newValue
    },
    PUSH_VIDEO_CONFERENCES: (state, newValue) => {
      state.videoConferences.push(newValue)
    },
    SET_VIDEO_CONFERENCES: (state, newValue) => {
      state.videoConferences = newValue
    },
    SET_ASSIGNMENTS: (state, newValue) => {
      state.assignments = newValue
    },
    PUSH_ASSIGNMENTS: (state, newValue) => {
      state.assignments.push(newValue)
    },
  },
  actions: {
    clearAll({ commit }){
      commit("RESET_STATE")
    },
    setPhpsessid: ({commit, state}, newValue) => {
      commit('SET_PHPSESSID', newValue)
      return state.phpsessid
    },
    isAuthenticated: ({commit, state}, newValue) => {
      commit('SET_ISAUTHENTICATED', newValue)
      return state.isAuthenticated
    },
    addNotifications: ({commit, state}, newValue) => {
      commit('PUSH_NOTIFICATIONS', newValue)

      // show notification
      Vue.notify({
        group: 'main',
        duration: 20000,
        type: newValue.type,
        title: newValue.title,
        text: newValue.text
      })

      return state.notifications
    },

    fetchDashboardData: async ({commit}) => {
      const StudentRepository = Repositories.get("student");
      const response = await StudentRepository.getProfile();
      commit('SET_DASHBOARD_DATA', response.data);
    },
    fetchCourses: async ({commit}) => {
      const StudentRepository = Repositories.get("student");
      const response = await StudentRepository.getCourses();
      commit('SET_COURSES', response.data['Courses']);
    },
    fetchClassSchedules: async ({commit}) => {
      const StudentRepository = Repositories.get("student");
      const response = await StudentRepository.getClassSchedules();
      commit('SET_CLASS_SCHEDULES', response.data);
    },
    fetchVideoConferences: ({commit, state}) => {
      const VideoConferenceRepository = Repositories.get("videoConference");

      let videoConferences = [];
      state.courses.forEach((course, courseIndex) => {
        const courseId = course.COURSEID;
        const crseId = course.CRSE_ID;
        const strm = course.STRM;
        const classNbr = course.CLASS_NBR;

        VideoConferenceRepository.getList(courseId, crseId, strm, classNbr).then(meetings => {
          // returns array, iterate every items
          meetings.forEach((meeting, meetingIndex) => {
            meeting.classNbr = classNbr;

            //split time
            const time = meeting.Time.split(' - ');
            meeting.startDate = `${meeting.Date} ${time[0]}`;
            meeting.endDate = `${meeting.Date} ${time[1]}`;

            videoConferences.push(meeting);

            const coursesDone = courseIndex >= state.courses.length-1;
            const meetingsDone = meetingIndex >= meetings.length-1;

            if (coursesDone && meetingsDone) {
              setTimeout(() => commit('SET_VIDEO_CONFERENCES', videoConferences), 500);
            }
          });
        });
      });

    },
    fetchAssignments: ({commit, state}) => {
      const CourseFactory = Repositories.get("course");

      let assignments = [];
      state.courses.forEach((course, courseIndex) => {
        const courseId = course.COURSEID;
        const crseId = course.CRSE_ID;
        const strm = course.STRM;
        const classNbr = course.CLASS_NBR;
        const ssrComponent = course.SSR_COMPONENT;

        CourseFactory.getIndividualAssignments(courseId, crseId, strm, ssrComponent, classNbr).then((response) => {
          let data = response.data;
          data.forEach((assignment, assignmentIndex) => {
            assignment.classNbr = classNbr;

            assignments.push(assignment);

            const coursesDone = courseIndex >= state.courses.length-1;
            const assignmentsDone = assignmentIndex >= data.length-1;

            if (coursesDone && assignmentsDone) {
              setTimeout(() => commit('SET_ASSIGNMENTS', assignments), 500);
            }
          });
        });

      });
    },
  },
  modules: {
  },
  plugins: [vuexPersist.plugin]
})
