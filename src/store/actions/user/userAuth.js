import {API} from '../../../api/API';
import {AUTH_USER, USER_ERROR} from '../../types';

export const authByName = (formData) => async dispatch => {
    try {
        const res = await API.post('/user/authByName', formData)
        dispatch({
            type: AUTH_USER,
            payload: res.data
        })

        return res.data
    } catch (e) {
        dispatch({
            type: USER_ERROR,
            payload: console.log(e),
        })
    }
}

export const authByEmail = (formData) => async dispatch => {
    try {
        const res = await API.post('/user/authByEmail', formData)
        dispatch({
            type: AUTH_USER,
            payload: res.data
        })

        return res.data
    } catch (e) {
        dispatch({
            type: USER_ERROR,
            payload: console.log(e),
        })
    }
}

export default {authByName, authByEmail};