import {API} from '../../../api/API'
import {ADD_MESSAGE, MESSAGES_ERROR} from '../../types'

export const addMessage = (chatId, userId, message) => async dispatch => {
    try {
        let bodyFormData = new FormData();
        bodyFormData.append('chatId', chatId);
        bodyFormData.append('senderId', userId);
        bodyFormData.append('message', message);
        bodyFormData.append('timestamp', new Date().getTime());
        bodyFormData.append('attachments[]', []);
        const res = await API.post('/message/create', bodyFormData);
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
