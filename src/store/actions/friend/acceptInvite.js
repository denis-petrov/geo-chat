import {API} from '../../../api/API'
import {FRIEND_ERROR, INVITE_FRIEND} from '../../types'

export const acceptInvite = (userId, friendId) => async dispatch => {
    try {
        let bodyFormData = new FormData()
        bodyFormData.append('invitingUserId', userId)
        bodyFormData.append('invitedUserId', friendId)
        const res = await API.post('user/acceptInvite', bodyFormData)
        dispatch({
            type: INVITE_FRIEND,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: FRIEND_ERROR,
            payload: console.log(e),
        })
    }
}