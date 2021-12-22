export const getCurrentUser = () => {
    let user = JSON.parse(window.localStorage.getItem('authenticated'));
    if (user != null && user != undefined) {
        return user;
    } else {
        return {}
    }
}

export default getCurrentUser();