import axios from "axios";

const baseDomain = "https://type.fit/api";
const baseURL = `${baseDomain}`;

export default axios.create({
    baseURL,
    headers: {
        // "Authorization": "Bearer xxxxx"
    }
});
