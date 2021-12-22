import {API} from '../../../api/API'
import {GET_USER_INFO, USER_ERROR} from '../../types'

export const getUserInfo = (userId) => async dispatch => {
    try {
        const res = await API.get('/user/getById', { params: { userId: userId}})

        let users = JSON.parse(window.localStorage.getItem('users'))
        if (!users) {
            users = {}
        }

        const user = res.data
        users[user.userId] = user.name
        window.localStorage.setItem('users', JSON.stringify(users))

        dispatch({
            type: GET_USER_INFO,
            payload: user
        })

        return user
    } catch (e) {
        dispatch({
            type: USER_ERROR,
            payload: console.log(e),
        })
    }
}
