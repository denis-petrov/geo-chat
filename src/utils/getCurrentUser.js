export const getCurrentUser = () => {
    const user = JSON.parse(window.localStorage.getItem('authenticated'));
    return user != null && user != undefined ? user : {}
}

export default getCurrentUser()