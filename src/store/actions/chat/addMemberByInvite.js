import {API} from '../../../api/API'
import {CHATS_ERROR, ADD_MEMBER_BY_INVITE} from '../../types'

export const addMemberByInvite = (inviteToken, userId) => async dispatch => {
    try {
        let bodyFormData = new FormData()
        bodyFormData.append('inviteToken', inviteToken)
        bodyFormData.append('userId', userId)
        const res = await API.post('/chat/addMemberByInvite', bodyFormData)
        dispatch({
            type: ADD_MEMBER_BY_INVITE,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: CHATS_ERROR,
            payload: console.log(e),
        })
    }
}
