import Client from '../Clients/BimayAxiosClient';

const resource = '/staff/init/check_session';

// const get = localStorage.getItem("app-data")

export default {
    check() {
        return Client().get(`${resource}`);
    }
};
