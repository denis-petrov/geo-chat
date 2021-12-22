import {API} from '../../../api/API'
import {FRIEND_ERROR, ACCEPT_INVITE} from '../../types'

export const inviteFriend = (userId, friendId) => async dispatch => {
    try {
        console.log(userId, friendId)
        let bodyFormData = new FormData()
        bodyFormData.append('invitingUserId', userId)
        bodyFormData.append('invitedUserId', friendId)
        const res = await API.post('user/inviteToFriends', bodyFormData)
        dispatch({
            type: ACCEPT_INVITE,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: FRIEND_ERROR,
            payload: console.log(e),
        })
    }
}