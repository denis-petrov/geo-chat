import {API} from '../../../api/API';
import {REMOVE_USER, USER_ERROR} from '../../types';

export const removeUser = (userId) => async dispatch => {
    try {
        let bodyFormData = new FormData();
        bodyFormData.append('userId', userId);
        const res = await API.post('/user/remove', bodyFormData)
        dispatch({
            type: REMOVE_USER,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: USER_ERROR,
            payload: console.log(e),
        })
    }
}

export default removeUser();