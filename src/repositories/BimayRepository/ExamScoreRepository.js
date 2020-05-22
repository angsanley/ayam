import Client from '../Clients/BimayAxiosClient';

const resource = '/scoring';

export default {
    getPeriod() {
        return Client().get(`${resource}/ViewGrade/getPeriodByBinusianId`);
    },
    getAcadCareer() {
        return Client().get(`${resource}/ViewGrade/getAcadCareer`);
    },
    getStudentScore(strm) {
        return Client().get(`${resource}/ViewGrade/getStudentScore/${strm}`);
    },
    getStudentGrade() {
        return Client().get(`${resource}/ViewGrade/getStudentGrade`);
    },
    isScoreFinalized(strm, career, institution) {
        return Client().post(`${resource}/ViewGrade/isScoreFinalized`, { career, strm, institution });
    },
};
