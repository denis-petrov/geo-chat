import {API} from '../../../api/API';
import {ADD_MESSAGE, MESSAGES_ERROR} from '../../types';

export const addMessage = (chatId, userId, message) => async dispatch => {
    try {
        let data = {
            chat: chatId,
            sender: userId,
            message: message,
            sendDate: new Date()
        };
        const res = await API.post('/message/create', data)
        dispatch({
            type: ADD_MESSAGE,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: MESSAGES_ERROR,
            payload: console.log(e),
        })
    }
}

export default addMessage();