import Client from '../Clients/BimayAxiosClient';
import * as HtmlTableToJson from "html-table-to-json";

// cleap up html from link_vc attribute if exist
const cleanUpHtml = html => html.replace(/<span.+vc="/g, "").replace(/">.+>/g, "");

const resource = '/BlendedLearning/VideoConference';

export default {
    getList(courseId, crseId, strm, classNbr) {
        const interceptor = (html) => HtmlTableToJson.parse(`<table>${cleanUpHtml(html)}</table>`).results[0];
        return Client(interceptor).get(`${resource}/getList/${courseId}/${crseId}/${strm}/${classNbr}`);
    }
};
