import Client from '../Clients/BimayAxiosClient';

const resource = '/student/classes';

export default {
    getBasicInfo(crseId, strm, ssrComponent) {
        return Client.get(`${resource}/basicinfo/${crseId}/${strm}/${ssrComponent}`);
    },
    getLearningOutcomes(courseId, crseId, strm, ssrComponent, classNbr) {
        return Client.get(`${resource}/getLearningOutcomes/${courseId}/${crseId}/${strm}/${ssrComponent}/${classNbr}`);
    },
    getEvaluation(courseId, crseId, strm, ssrComponent, classNbr) {
        return Client.get(`${resource}/getEvaluation/${courseId}/${crseId}/${strm}/${ssrComponent}/${classNbr}`);
    },
    getLearningGoals(courseId, crseId, strm, ssrComponent, classNbr) {
        return Client.get(`${resource}/getLearningGoals/${courseId}/${crseId}/${strm}/${ssrComponent}/${classNbr}`);
    },
    getLearningObjectives(courseId, crseId, strm, ssrComponent, classNbr) {
        return Client.get(`${resource}/getLearningObjectives/${courseId}/${crseId}/${strm}/${ssrComponent}/${classNbr}`);
    },
    getAssessmentMethod(courseId, crseId, strm, ssrComponent, classNbr) {
        return Client.get(`${resource}/getAssessmentMethod/${courseId}/${crseId}/${strm}/${ssrComponent}/${classNbr}`);
    },
    getTeachingLearningStrategies(courseId, crseId, strm, ssrComponent, classNbr) {
        return Client.get(`${resource}/getTeaching/${courseId}/${crseId}/${strm}/${ssrComponent}/${classNbr}`);
    },
    getTextbook(courseId, crseId, strm, ssrComponent, classNbr) {
        return Client.get(`${resource}/getTextbook/${courseId}/${crseId}/${strm}/${ssrComponent}/${classNbr}`);
    },
    getResources(courseId, crseId, strm, ssrComponent, classNbr) {
        return Client.get(`${resource}/resources/${courseId}/${crseId}/${strm}/${ssrComponent}/${classNbr}`);
    },
    getIndividualAssignments(courseId, crseId, strm, ssrComponent, classNbr) {
        return Client.get(`${resource}/assignmentType/${courseId}/${crseId}/${strm}/${ssrComponent}/${classNbr}/01`);
    },
    getGroupAssignments(courseId, crseId, strm, ssrComponent, classNbr) {
        return Client.get(`${resource}/assignmentType/${courseId}/${crseId}/${strm}/${ssrComponent}/${classNbr}/02`);
    },
    getCourseContent(crseId, strm) {
        return Client.get(`${resource}/courseContent/${crseId}/${strm}`);
    },
    getClasses(crseId, strm) {
        return Client.get(`${resource}/nextClass/${strm}/${crseId}`);
    },
    getUpcomingClass(strm, crseId, classNbr) {
        return Client.get(`${resource}/upcomingClassNext/${strm}/${crseId}/${classNbr}`);
    },
    getPeople(strm, crseId, classNbr) {
        return Client.get(`${resource}/people/${crseId}/${strm}/${classNbr}`);
    },
    getSharedMaterial(strm, crseId, classNbr, ssrComponent) {
        return Client.post(`${resource}/getspecificsharedmaterial`, { classNbr, courseid: crseId, ssr: ssrComponent, strm});
    },
    getPracticumHash() {
        return Client.get(`${resource}/practicum`);
    },
    getHeadPrefect(strm, crseId, classNbr) {
        return Client.post(`/General_Head_Prefect/getHeadPrefect`, { Class: classNbr, Course: crseId, Period: strm });
    },
};
