import axios from "axios";
import { default as store } from '../../store/index';

const proxyDomain = (process.env.NODE_ENV === 'development') ? "https://bimayproxy.herokuapp.com/fetch" : ".netlify/functions/bimay-proxy/fetch";
const baseDomain = "https://binusmaya.binus.ac.id/services/ci/index.php";
const baseURL = `${proxyDomain}/${baseDomain}`;

export default axios.create({
    baseURL,
    headers: {
        Bisquit: `PHPSESSID=${store.state.phpsessid}`
    }
});
