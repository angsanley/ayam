import Client from './Clients/CookieAxiosClient';

const resource = '/';

export default {
    auth(username, password) {
        return Client().post(`${resource}`, { username, password });
    }
};
