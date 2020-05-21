import axios from "axios";

const proxyDomain = "https://bimayproxy.herokuapp.com/fetch";
const baseDomain = "https://quotes.rest";
const baseURL = `${proxyDomain}/${baseDomain}`;

export default axios.create({
    baseURL,
    headers: {
        // "Authorization": "Bearer xxxxx"
    }
});
