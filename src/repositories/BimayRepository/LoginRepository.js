import Client from '../Clients/BimayAxiosClient';

const resource = '/login';

export default {
    switchRole(roleId, specificRoleId) {
        return Client().get(`${resource}/switchrole/${roleId}/${specificRoleId}`);
    },
    getCurrentRole() {
        return Client().get(`${resource}/getCurrentRole`);
    },
};
