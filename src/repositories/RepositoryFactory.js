import DailyQuoteRepository from './DailyQuoteRepository';
import SessionRepository from "./BimayRepository/SessionRepository";

const repositories = {
    'dailyQuotes': DailyQuoteRepository,
    'session': SessionRepository,
}
export default {
    get: name => repositories[name]
};
