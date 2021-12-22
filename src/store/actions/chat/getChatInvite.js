import {API} from '../../../api/API'
import {CHATS_ERROR, GET_CHAT_INVITE} from '../../types'

export const getChatInvite = (chatId) => async dispatch => {
    try {
        const res = await API.get('/chat/getInvite', {params: {chatId: chatId}})
        dispatch({
            type: GET_CHAT_INVITE,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: CHATS_ERROR,
            payload: console.log(e),
        })
    }
}
