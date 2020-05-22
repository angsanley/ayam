import Client from '../Clients/BimayAxiosClient';

const resource = '/general';

export default {
    getBinusianData() {
        return Client().get(`${resource}/getBinusianData`);
    },
    getBinusianId() {
        return Client().get(`${resource}/getBinusianIDFromSession`);
    },
    getPhotoType() {
        return Client().get(`${resource}/getphotoType`);
    },
    getPhotoStorage(fileName) {
        return Client().post(`${resource}/getPhotoStorage`, { filename: fileName });
    },
    getPhoto() {
        return Client().get(`${resource}/getphoto`);
    },
    getPopupData() {
        return Client().get(`${resource}/getPopupData`);
    },
    getPeriods() {
        return Client().get(`${resource}/getPeriods`);
    },
    getPhotoPeople(binusianNim) {
        return Client().post(`${resource}/getPhotoPeople`, { binusianId: binusianNim });
    },
    getServerTime() {
        return Client().post(`${resource}/getServerTime`);
    },
    getUserName() {
        return Client().post(`${resource}/getUser`);
    },
};
