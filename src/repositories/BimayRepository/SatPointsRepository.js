import Client from '../Clients/BimayAxiosClient';

const resource = '/sat';

export default {
    getStudentActivityPoints() {
        return Client().get(`${resource}/studentactivitytranscript/GetStudentActivityPoint`);
    },
    getCommunityServicesHours() {
        return Client().get(`${resource}/studentactivitytranscript/GetCommunityServices`);
    },
    getDevelopmentDetailPending() {
        return Client().get(`${resource}/development/getDevelopmentDetailPending`);
    },
    getDevelopmentDetail() {
        return Client().get(`${resource}/development/getDevelopmentDetail`);
    },
    getOrganizationExperiencePending() {
        return Client().get(`${resource}/development/getOrganizationExperiencePending`);
    },
    getOrganizationExperience() {
        return Client().get(`${resource}/development/getOrganizationExperience`);
    },
    getWorkingExperiencePending() {
        return Client().get(`${resource}/development/getWorkingExperiencePending`);
    },
    getWorkingExperience() {
        return Client().get(`${resource}/development/getWorkingExperience`);
    },

    // for edit and new development program
    getDevelopmentTypes() {
        return Client().get(`${resource}/development/getDevelopmentType`);
    },
    getDevelopmentLevels() {
        return Client().get(`${resource}/development/getDevelopmentLevel`);
    },
    getDevelopmentPositions() {
        return Client().get(`${resource}/development/getDevelopmentPosition`);
    },
    getDevelopmentCategories() {
        return Client().get(`${resource}/development/getDevelopmentCategory`);
    },
    getDevelopmentDetailByID(developmentDetailID) {
        return Client().post(`${resource}/development/getDevelopmentDetailByID`, {DevelopmentDetailID: developmentDetailID});
    },
    addDevelopmentDetail(file, developmentType, developmentLevel, developmentPosition, developmentCategory, title, place, dateFrom, dateUntil, organizerName, address, email, contactNumber, claimSat) {
        let formData = new FormData();
        formData.append("ddlDevelopmentType", developmentType);
        formData.append("ddlDevelopmentLevel", developmentLevel);
        formData.append("ddlDevelopmentPosition", developmentPosition);
        formData.append("ddlDevelopmentCategory", developmentCategory);
        formData.append("title", title);
        formData.append("place", place);
        formData.append("datefrom", dateFrom);
        formData.append("dateto", dateUntil);
        formData.append("organizername", organizerName);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("contactnumber", contactNumber);
        formData.append("developmenttypeid", developmentType);
        formData.append("developmentlevelid", developmentLevel);
        formData.append("developmentpositionid", developmentPosition);
        formData.append("developmentcategoryid", developmentCategory);
        formData.append("IsSAT", (claimSat ? "1" : "0"));
        formData.append("filename", null); //TODO: change this

        return Client().post(`/student/portfolio_development/addDevelopmentDetail`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' //TODO: no cookie
            }
        });
    },
}
