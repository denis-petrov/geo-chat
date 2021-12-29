import {API} from '../../../api/API'
import {FRIEND_ERROR, GET_INVITES} from '../../types'

export const getInvites = (userId) => async dispatch => {
    try {
        const res = await API.get('/user/invites', {params: {userId: userId}})
        dispatch({
            type: GET_INVITES,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: FRIEND_ERROR,
            payload: console.log(e),
        })
    }
}