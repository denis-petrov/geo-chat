import {API} from '../../../api/API'
import {GET_MESSAGES, MESSAGES_ERROR} from '../../types'

export const getMessages = (chatId, numberOfMessages, type = GET_MESSAGES) => async dispatch => {
    try {
        const res = await API.get('/message/getLast', {params: {chatId: chatId, numberOfMessages: numberOfMessages}})
        dispatch({
            type: type,
            payload: res.data
        })

        return res.data
    } catch (e) {
        dispatch({
            type: MESSAGES_ERROR,
            payload: console.log(e),
        })
    }
}