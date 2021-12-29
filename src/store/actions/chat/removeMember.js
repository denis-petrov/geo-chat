import {API} from '../../../api/API'
import {CHATS_ERROR, REMOVE_MEMBER} from '../../types'

export const removeMember = (userId, chatId) => async dispatch => {
    try {
        const bodyFormData = new FormData()
        bodyFormData.append('userId', userId)
        bodyFormData.append('chatId', chatId)
        const res = await API.post('/chat/removeMember', bodyFormData)
        dispatch({
            type: REMOVE_MEMBER,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: CHATS_ERROR,
            payload: console.log(e),
        })
    }
}