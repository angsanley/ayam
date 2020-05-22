import DailyQuoteRepository from './DailyQuoteRepository';
import SessionRepository from "./BimayRepository/SessionRepository";
import AttendanceRepository from "./BimayRepository/AttendanceRepository";
import CourseRepository from "./BimayRepository/CourseRepository";
import ExamRepository from "./BimayRepository/ExamRepository";
import FinancialRepository from "./BimayRepository/FinancialRepository";
import GeneralRepository from "./BimayRepository/GeneralRepository";
import NotificationRepository from "./BimayRepository/NotificationRepository";
import SatPointsRepository from "./BimayRepository/SatPointsRepository";
import StudentRepository from "./BimayRepository/StudentRepository";
import VideoConferenceRepository from "./BimayRepository/VideoConferenceRepository";

const repositories = {
    'attendance': AttendanceRepository,
    'course': CourseRepository,
    'dailyQuotes': DailyQuoteRepository,
    'exam': ExamRepository,
    'financial': FinancialRepository,
    'general': GeneralRepository,
    'notification': NotificationRepository,
    'satPoints': SatPointsRepository,
    'session': SessionRepository,
    'student': StudentRepository,
    'videoConference': VideoConferenceRepository,
}
export default {
    get: name => repositories[name]
};
