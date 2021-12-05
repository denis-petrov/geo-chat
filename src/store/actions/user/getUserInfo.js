import {API} from '../../../api/API';
import {GET_USER_INFO, USER_ERROR} from '../../types';

export const getUserInfo = (userId) => async dispatch => {
    try {
        const res = await API.get('/user/getById', { params: { userId: userId}})
        dispatch({
            type: GET_USER_INFO,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: USER_ERROR,
            payload: console.log(e),
        })
    }
}

export default getUserInfo();