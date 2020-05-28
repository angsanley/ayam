import store from "../../store/index";

export const bimayAuthHeader = () => {
    if (store.state.session.isAuthenticated) {
        return { 'Bisquit': `PHPSESSID=${store.state.session.phpsessid}` };
    } else {
        return {};
    }
}
