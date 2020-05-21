import Client from './Clients/QuoteAxiosClient';

const resource = '/qod';

export default {
    get() {
        return Client.get(`${resource}`, {
            params: {
                language: 'en'
            }
        });
    }
};
