import Client from '../Clients/BimayAxiosClient';

const resource = '/newattendance';

export default {
    getStudentAttendanceInformation(strm) {
        return Client().post(`${resource}/student/GetStudentAttendanceInformation`, { strm });
    },
};
