import {API} from '../../../api/API'
import {FRIEND_ERROR, REJECT_INVITE} from '../../types'

export const rejectInvite = (userId, friendId) => async dispatch => {
    try {
        let bodyFormData = new FormData()
        bodyFormData.append('invitingUserId', userId)
        bodyFormData.append('invitedUserId', friendId)
        const res = await API.post('user/rejectInvite', bodyFormData)
        dispatch({
            type: REJECT_INVITE,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: FRIEND_ERROR,
            payload: console.log(e),
        })
    }
}