import {API} from '../../../api/API'
import {FRIEND_ERROR, GET_FRIENDS} from '../../types'

export const getFriends = (userId) => async dispatch => {
    try {
        const res = await API.get('/user/friends', {params: {userId: userId}})
        dispatch({
            type: GET_FRIENDS,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: FRIEND_ERROR,
            payload: console.log(e),
        })
    }
}

export default getFriends();