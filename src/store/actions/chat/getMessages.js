import {API} from '../../../api/API';
import {GET_MESSAGES, MESSAGES_ERROR} from '../../types';

export const getMessages = (chatId, numberOfMessages) => async dispatch => {
    try {
        const res = await API.get('/message/getLast', {params: {chatId: chatId, numberOfMessages: numberOfMessages}})
        dispatch({
            type: GET_MESSAGES,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: MESSAGES_ERROR,
            payload: console.log(e),
        })
    }
}

export default getMessages();