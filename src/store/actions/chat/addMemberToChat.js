import {API} from '../../../api/API'
import {ADD_MEMBER_TO_CHAT, CHATS_ERROR} from '../../types'

export const addMemberToChat = (userId, chatId) => async dispatch => {
    try {
        const bodyFormData = new FormData()
        bodyFormData.append('chatId', chatId)
        bodyFormData.append('userId', userId)
        const res = await API.post('/chat/addMember', bodyFormData)
        dispatch({
            type: ADD_MEMBER_TO_CHAT,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: CHATS_ERROR,
            payload: console.log(e),
        })
    }
}

export default addMemberToChat();