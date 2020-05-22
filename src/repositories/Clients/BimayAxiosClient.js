import _axios from "axios";
import axiosRetry from "axios-retry";
import {bimayAuthHeader} from "../Helpers/BimayAuthHeader";
import store from "../../store";

const proxyDomain = (process.env.NODE_ENV === 'development') ? "https://bimayproxy.herokuapp.com/fetch" : ".netlify/functions/bimay-proxy/fetch";
const baseDomain = "https://binusmaya.binus.ac.id/services/ci/index.php";
const baseURL = `${proxyDomain}/${baseDomain}`;

export default () => {
    const axios = _axios.create({
        baseURL,
        headers: bimayAuthHeader()
    });

    const retryDelay = (retryNumber = 0) => {
        const seconds = Math.pow(2, retryNumber) * 1000;
        const randomMs = 1000 * Math.random();
        return seconds + randomMs;
    };

    axiosRetry(axios, {
        retries: 2,
        retryDelay,
        // retry on Network Error & 5xx responses
        retryCondition: axiosRetry.isRetryableError,
    });

    axios.interceptors.response.use(function(response) {
        return response;
    }, function(error) {
        store.dispatch("addNotifications", { title: "Failed to fetch data", text: `It looks like BINUSMaya server is acting up again. Please check back later. ${error}`, type: 'error' });
        return Promise.reject(error);
    });

    return axios;
}
