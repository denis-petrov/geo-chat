import {API} from '../../../api/API'
import {ADD_FRIEND, FRIEND_ERROR} from '../../types'

export const addFriend = (userId, friendId) => async dispatch => {
    try {
        console.log(userId, friendId)
        let bodyFormData = new FormData();
        bodyFormData.append('userId', userId);
        bodyFormData.append('friendId', friendId);
        const res = await API.post('/user/addFriend', bodyFormData)
        dispatch({
            type: ADD_FRIEND,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: FRIEND_ERROR,
            payload: console.log(e),
        })
    }
}

export default addFriend();