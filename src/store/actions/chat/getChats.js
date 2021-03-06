import {API} from '../../../api/API'
import {GET_CHATS, CHATS_ERROR} from '../../types'

export const getChats = (userId) => async dispatch => {
    try {
        const res = await API.get('/chat/getAllForUser', {params: {userId: userId}})
        const data = {}
        for (let key in res.data) {
            data[res.data[key].chatId] = res.data[key]
        }
        dispatch({
            type: GET_CHATS,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: CHATS_ERROR,
            payload: console.log(e),
        })
    }
}