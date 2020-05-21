import Client from '../Clients/BimayAxiosClient';

const resource = '/notification';

export default {
    getUnreadNotificationCount() {
        return Client.get(`${resource}/getUnreadNotificationCount`);
    },
    getUnreadNotificationList() {
        return Client.get(`${resource}/getUnreadNotificationList`);
    },
    getAllNotificationList() {
        return Client.get(`${resource}/getAllNotificationList`);
    }
};
