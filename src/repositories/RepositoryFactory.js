import DailyQuoteRepository from './DailyQuoteRepository';
import SessionFactory from "./SessionFactory";

const repositories = {
    'dailyQuotes': DailyQuoteRepository,
    'session': SessionFactory,
}
export default {
    get: name => repositories[name]
};
