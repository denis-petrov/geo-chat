import {API} from '../../../api/API'
import {AUTH_USER, USER_ERROR} from '../../types'

export const authByName = (formData) => async dispatch => {
    const res = await API.post('/user/authByName', formData)
        .catch((error) => {
            if (error.response) {
                dispatch({
                    type: USER_ERROR,
                    payload: error.response.data.message,
                })
            }
        })
    dispatch({
        type: AUTH_USER,
        payload: res.data
    })

    return res.data
}

export const authByEmail = (formData) => async dispatch => {
    const res = await API.post('/user/authByEmail', formData)
        .catch((error) => {
            if (error.response) {
                dispatch({
                    type: USER_ERROR,
                    payload: error.response.data.message,
                })
            }
        })
    dispatch({
        type: AUTH_USER,
        payload: res.data
    })

    return res.data
}

export default {authByName, authByEmail}