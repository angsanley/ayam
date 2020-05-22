import axios from "axios";

const baseDomain = "https://type.fit/api";
const baseURL = `${baseDomain}`;

export default () => {
    return axios.create({
        baseURL,
        headers: {
            // "Authorization": "Bearer xxxxx"
        }
    });
}
