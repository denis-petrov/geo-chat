import {API} from '../../../api/API';
import {GET_CHAT_INFO, CHATS_ERROR} from '../../types';

export const getChatInfo = () => async dispatch => {
    try {
        const res = await API.get('/chat/get', { params: { chatId: '1' } })
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

export default getChatInfo();