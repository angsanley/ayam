import Client from '../Clients/BimayAxiosClient';

const resource = '/newExam';

export default {
    getAcadCareer() {
        return Client.get(`${resource}/Schedule/getAcadCareer`);
    },
    getExamSchedule(acad, strm) {
        return Client.post(`${resource}/Schedule/getOwnScheduleStudent`, { acad, strm });
    },
};
