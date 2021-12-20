import {API} from '../../../api/API';
import {REMOVE_CHAT, CHATS_ERROR} from '../../types';

export const removeChat = (chatId) => async dispatch => {
    try {
        console.log('remove')
        let bodyFormData = new FormData();
        bodyFormData.append('chatId', chatId);
        const res = await API.post('/chat/remove', bodyFormData)
        dispatch({
            type: REMOVE_CHAT,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: CHATS_ERROR,
            payload: console.log(e),
        })
    }
}

export default removeChat();