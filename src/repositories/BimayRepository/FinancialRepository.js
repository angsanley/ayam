import Client from '../Clients/BimayAxiosClient';

const resource = '/financial';

export default {
    getSummary() {
        return Client.get(`${resource}/virtualaccount`);
    },
    getSummaryAlt() {
        return Client.get(`${resource}/virtualaccount2`);
    },
    getFinancialDetail() {
        return Client.get(`${resource}/getFinancialSummary`);
    },
};
