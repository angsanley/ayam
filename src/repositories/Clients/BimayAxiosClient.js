import axios from "axios";
import { default as store } from '../../store/index';

const proxyDomain = "https://bimayproxy.herokuapp.com/fetch";
const baseDomain = "https://binusmaya.binus.ac.id/services/ci/index.php";
const baseURL = `${proxyDomain}/${baseDomain}`;

export default axios.create({
    baseURL,
    headers: {
        Bisquit: `PHPSESSID=${store.state.phpsessid}`
    }
});
