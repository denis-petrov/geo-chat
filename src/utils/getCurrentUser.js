export const getCurrentUser = () => {
    const user = JSON.parse(window.localStorage.getItem('authenticated'))
    return user != null ? user : {}
}

export default getCurrentUser()