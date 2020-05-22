import store from "../../store/index";

export const bimayAuthHeader = () => {
    if (store.state.phpsessid) {
        return { 'Bisquit': `PHPSESSID=${store.state.phpsessid}` };
    } else {
        return {};
    }
}
