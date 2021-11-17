import {API} from '../../../api/API';
import {ADD_CHAT, CHATS_ERROR} from '../../types';

export const addChat = () => async dispatch => {
    try {
        const res = await API.post('/chat/create', { name: 'Test'})
        dispatch({
            type: ADD_CHAT,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: CHATS_ERROR,
            payload: console.log(e),
        })
    }
}

export default addChat();