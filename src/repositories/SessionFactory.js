import Client from './Clients/BimayAxiosClient';

const resource = '/staff/init/check_session';

export default {
    check() {
        return Client.get(`${resource}`);
    }
};
