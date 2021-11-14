import {API} from '../../../api/API';
import {GET_CHATS, CHATS_ERROR} from '../../types';

export const getChats = () => async dispatch => {
    try {
        const res = await API.get('/chat/getAllForUser', { params: { userId: '1' } })
        dispatch({
            type: GET_CHATS,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: CHATS_ERROR,
            payload: console.log(e),
        })
    }
}

export default getChats();