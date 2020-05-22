import Client from './Clients/QuoteAxiosClient';

const resource = '/quotes';

export default {
    get() {
        return Client().get(`${resource}`);
    }
};
