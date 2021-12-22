import {API} from '../../../api/API'
import {GET_MESSAGES_BEFORE_DATE, MESSAGES_ERROR} from '../../types'

export const getMessagesBeforeDate = (chatId, numberOfMessages, timestamp) => async dispatch => {
    try {
        const data = {
            chatId: chatId,
            numberOfMessages: numberOfMessages,
            timestamp: timestamp
        }
        const res = await API.get('/message/getBefore', {params: data})
        dispatch({
            type: GET_MESSAGES_BEFORE_DATE,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: MESSAGES_ERROR,
            payload: console.log(e),
        })
    }
}

export default getMessagesBeforeDate();