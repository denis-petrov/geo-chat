import {API} from '../../../api/API';
import {CREATE_USER, USER_ERROR} from '../../types';

export const createUser = (name, email, password) => async dispatch => {
    try {
        let bodyFormData = new FormData();
        bodyFormData.append('name', name);
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);
        const res = await API.post('/user/create', bodyFormData)
        dispatch({
            type: CREATE_USER,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: USER_ERROR,
            payload: console.log(e),
        })
    }
}

export default createUser();