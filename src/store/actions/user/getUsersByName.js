import {API} from '../../../api/API'
import {GET_USERS_BY_NAME, USER_ERROR} from '../../types'

export const getUsersByName = (userId, name) => async dispatch => {
    try {
        const res = await API.get('/user/getUsersByName', {params: {userId: userId, name: name}})
        dispatch({
            type: GET_USERS_BY_NAME,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: USER_ERROR,
            payload: console.log(e),
        })
    }
}