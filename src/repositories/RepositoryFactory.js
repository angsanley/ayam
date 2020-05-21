import DailyQuoteRepository from './DailyQuoteRepository';
import SessionRepository from "./SessionRepository";

const repositories = {
    'dailyQuotes': DailyQuoteRepository,
    'session': SessionRepository,
}
export default {
    get: name => repositories[name]
};
