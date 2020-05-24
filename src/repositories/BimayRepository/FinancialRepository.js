import Client from '../Clients/BimayAxiosClient';

const resource = '/financial';

export default {
    getVirtualAccount() {
        return Client().get(`${resource}/virtualaccount`);
    },
    getVirtualAccountAlt() {
        return Client().get(`${resource}/virtualaccount2`);
    },
    getFinancialSummary() {
        return Client().get(`${resource}/getFinancialSummary`);
    },
};
