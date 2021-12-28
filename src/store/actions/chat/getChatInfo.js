import {API} from '../../../api/API'
import {GET_CHAT_INFO, CHATS_ERROR} from '../../types'

export const getChatInfo = (chatId) => async dispatch => {
    try {
        const res = await API.get('/chat/get', { params: { chatId: chatId } })
        dispatch({
            type: GET_CHAT_INFO,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: CHATS_ERROR,
            payload: console.log(e),
        })
    }
}