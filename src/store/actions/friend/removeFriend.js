import {API} from '../../../api/API'
import {FRIEND_ERROR, REMOVE_FRIEND} from '../../types'

export const removeFriend = (userId, friendId) => async dispatch => {
    try {
        let bodyFormData = new FormData();
        bodyFormData.append('userId', userId);
        bodyFormData.append('friendId', friendId);
        const res = await API.post('/user/removeFriend', bodyFormData)
        dispatch({
            type: REMOVE_FRIEND,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: FRIEND_ERROR,
            payload: console.log(e),
        })
    }
}

export default removeFriend();