import axios from "axios";
import {bimayAuthHeader} from "../Helpers/BimayAuthHeader";

const proxyDomain = (process.env.NODE_ENV === 'development') ? "https://bimayproxy.herokuapp.com/fetch" : ".netlify/functions/bimay-proxy/fetch";
const baseDomain = "https://binusmaya.binus.ac.id/services/ci/index.php";
const baseURL = `${proxyDomain}/${baseDomain}`;

export default () => {
    return axios.create({
        baseURL,
        headers: bimayAuthHeader()
    });
}
