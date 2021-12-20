import {API} from '../../../api/API';
import {UPDATE_CHAT_NAME, CHATS_ERROR} from '../../types';

export const updateChatName = (chatId, name) => async dispatch => {
    try {
        let bodyFormData = new FormData();
        bodyFormData.append('chatId', chatId);
        bodyFormData.append('name', name);
        const res = await API.post('/chat/updateName', bodyFormData)
        dispatch({
            type: UPDATE_CHAT_NAME,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: CHATS_ERROR,
            payload: console.log(e),
        })
    }
}

export default updateChatName();