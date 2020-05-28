import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import Repositories from "../repositories/RepositoryFactory";
import moment from "moment-timezone";

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'app-data',
  storage: window.localStorage
})

const getDefaultState = () => {
  return {
    session: {
      isAuthenticated: false,
      username: '',
      password: '',
      phpsessid: '',
      lastLogin: ''
    },
    financialData: {
      financialSummary: '',
      totalPaid: 0,
      totalCharge: 0
    },
    notifications: [],
    dashboardData: '',
    courses: [],
    classSchedules: '',
    videoConferences: [],
    assignments: [],
  }
}

export default new Vuex.Store({
  state: getDefaultState(),
  getters: {
    getCurrentSession: (state) => {
      return state.session
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
    getFinancialData: (state) => {
      return state.financialData
    },
  },
  mutations: {
    RESET_STATE (state) {
      Object.assign(state, getDefaultState())
    },
    SET_SESSION: (state, newValue) => {
      state.session = newValue
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
    SET_FINANCIAL: (state, newValue) => {
      state.financialData = newValue
    },
  },
  actions: {
    clearAll({ commit }){
      commit("RESET_STATE")
    },
    setCurrentSession: ({commit, state}, newValue) => {
      newValue.lastLogin = moment()
      commit('SET_SESSION', newValue)
      return state.session
    },
    addNotifications: ({commit, state}, newValue) => {
      commit('PUSH_NOTIFICATIONS', {}) // TODO: Temporary fix because notifications never cleared. This is a hack, should not be done like this.

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

    fetchDashboardData: ({commit}) => {
      const StudentRepository = Repositories.get("student");
      StudentRepository.getProfile().then(response => {
        commit('SET_DASHBOARD_DATA', response.data);
      });

    },
    fetchCourses: ({commit}) => {
      const StudentRepository = Repositories.get("student");
      StudentRepository.getCourses().then(response => {
        commit('SET_COURSES', response.data['Courses']);
      });
    },
    fetchClassSchedules: ({commit}) => {
      const StudentRepository = Repositories.get("student");
      StudentRepository.getClassSchedules().then(response => {
        commit('SET_CLASS_SCHEDULES', response.data);
      });

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
      if (state.courses && state.courses.length > 0) {
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
      }
    },

    setFinancialData: ({commit, state}, newValue) => {
      commit('SET_FINANCIAL', newValue)
      return state.financialData
    },
  },
  modules: {
  },
  plugins: [vuexPersist.plugin]
})
