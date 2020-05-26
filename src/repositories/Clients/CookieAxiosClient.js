import axios from "axios";

const baseDomain = (process.env.NODE_ENV === 'development') ? "https://s3k0gqdo19.execute-api.ap-southeast-1.amazonaws.com/prod/auth" : ".netlify/functions/bimay-cookie";
const baseURL = `${baseDomain}`;

export default () => {
    return axios.create({
        baseURL,
        headers: {
            // "Authorization": "Bearer xxxxx"
        }
    });
}
