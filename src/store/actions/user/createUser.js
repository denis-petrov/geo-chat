import {API} from '../../../api/API'
import {CREATE_USER, USER_ERROR} from '../../types'

export const createUser = (name, email, password) => async dispatch => {
    const bodyFormData = new FormData()
    bodyFormData.append('name', name)
    bodyFormData.append('email', email)
    bodyFormData.append('password', password)
    const res = await API.post('/user/create', bodyFormData)
        .catch((error) => {
            if (error.response) {
                dispatch({
                    type: USER_ERROR,
                    payload: error.response.data.message,
                })
            }
        })
    dispatch({
        type: CREATE_USER,
        payload: res.data
    })

    return res.data
}
